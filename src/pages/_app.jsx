import '../styles/globals.css'
import {makeServer} from  '../utils/mirage_server'
import * as env_config from '../utils/env_config'

if(env_config.getNodeEnv() == "development") {
  makeServer()
}

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
