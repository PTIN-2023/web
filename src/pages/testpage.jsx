import * as env_config from "../utils/env_config"
import Head from 'next/head'
import {useState, useEffect} from "react";

// Temporal testing page to make sure the env variables + api requests work as 
// intented

export async function getServerSideProps() {
    const apiEndpoint = String(env_config.getApiEndpoint());
    const isLocal = String(env_config.isLocal());
    const locationName = String(env_config.getLocationName());
    const locationLatitude = String(env_config.getLocationLatitude());
    const locationLongitude = String(env_config.getLocationLongitude());
    const mapBoxToken = String(env_config.getTokenMapBox());
    const googleToken = String(env_config.getTokenGoogleSignIn());
  
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
    let [users, setUsers] = useState([])

    console.log(props.apiEndpoint+"/api/users")

    useEffect(() => {
      fetch(props.apiEndpoint+"/api/users")
        .then((response) => response.json())
        .then((json) => setUsers(json))
    }, [])

    return (<>
        <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            {users.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}
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