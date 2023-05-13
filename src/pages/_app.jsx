import '../styles/globals.css'
import {makeServer} from  '../utils/mirage_server'
import * as env_config from '../utils/env_config'

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

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
