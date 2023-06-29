import '../styles/globals.css'
import {makeServer} from  '../utils/mirage_server'
import * as env_config from '../utils/env_config'
import { useRouter, useEffect } from 'next/router'
import useAutoSumbitAndFetchObject from '../hooks/useAutoSumbitAndFetchObject'
import { getCookie, setCookie } from 'cookies-next';

if(env_config.getNodeEnv() == "development") {
  const server = makeServer()
  if(server.pretender != undefined) {
    // https://stackoverflow.com/questions/67526264/using-the-localstorage-api-to-persist-the-miragejs-db
    const mirageRequestHandler = server.pretender.handledRequest;
    server.pretender.handledRequest = (verb, path, request) => {
      if (!['get', 'head'].includes(verb.toLowerCase())) {
        localStorage.setItem('db', JSON.stringify(server.db.dump()));
      }
      mirageRequestHandler(verb, path, request);
    };
  }
}

async function checkLogin() {
  const session_token = getCookie('user_token');

  if(!session_token || JSON.parse(session_token) == '')
    return

  const res = await fetch('/api/checktoken', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"session_token": JSON.parse(session_token)})
  }).then(data => {try {return data.json()} catch (e) {return 'none';}})

  if(!res || res.valid == 'ok')
    return

  if(window.pathname != '/') {
    window.location.href = '/'
    setCookie('user_token', JSON.stringify(''))
  }
}
if(typeof window !== 'undefined') {
  checkLogin()
  setInterval(checkLogin, 60*1000)
}

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
