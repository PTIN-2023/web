import * as utils from "../utils/env_config"
import Head from 'next/head'

// Temporal testing page to make sure the env variables + api requests work as 
// intented

export async function getServerSideProps() {
    const apiEndpoint = String(utils.getApiEndpoint());
    const isLocal = String(utils.isLocal());
    const locationName = String(utils.getLocationName());
    const locationLatitude = String(utils.getLocationLatitude());
    const locationLongitude = String(utils.getLocationLongitude());
    const mapBoxToken = String(utils.getTokenMapBox());
    const googleToken = String(utils.getTokenGoogleSignIn());
  
    return {
      props: { 
        apiEndpoint,
        isLocal,
        locationName,
        locationLatitude,
        locationLongitude,
        mapBoxToken,
        googleToken
      }
    }
  }

export default function Home(props) {
    return (<>
        <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <p>apiEndpoint = {props.apiEndpoint}</p>
            <p>isLocal = {props.isLocal}</p>
            <p>locationName = {props.locationName}</p>
            <p>locationLatitude = {props.locationLatitude}</p>
            <p>locationLongitude = {props.locationLongitude}</p>
            <p>mapBoxToken = {props.mapBoxToken}</p>
            <p>googleToken = {props.googleToken}</p>
        </main>
    </>)
}