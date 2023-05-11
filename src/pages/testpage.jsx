import * as env_config from "../utils/env_config"
import Head from 'next/head'
import {useState} from "react";
import {Tabs, Button} from 'flowbite-react'
import useCookie from "../hooks/useCookie";
import React from "react";
import UserDataTestComponent from "../component/testpage/UserDataTestComponent";
import RegisterUserTestComponent from "../component/testpage/RegisterUserTestComponent";
import LoginUserTestComponent from "../component/testpage/LoginUserTestComponent";
import TokenCheckTestComponent from "../component/testpage/TokenCheckTestComponent";
import GoogleOAuthTestComponent from "../component/testpage/GoogleOAuthTestComponent"
import ListMedicinesTestComponent from "../component/testpage/ListMedicinesTestComponent"
import HasPrescriptionTestComponent from "../component/testpage/HasPrescriptionTestComponent";
import {GoogleOAuthProvider} from '@react-oauth/google';

// Temporal testing page to make sure the env variables + api requests work as 
// intented

export async function getServerSideProps() {
  const isLocal           = env_config.isLocal();
  const apiEndpoint       = String(          env_config.getApiEndpoint());
  const locationName      = String(isLocal ? env_config.getLocationName()      : "N/A");
  const locationLatitude  = String(isLocal ? env_config.getLocationLatitude()  : "N/A");
  const locationLongitude = String(isLocal ? env_config.getLocationLongitude() : "N/A");
  const mapBoxToken       = String(          env_config.getTokenMapBox());
  const googleToken       = String(          env_config.getTokenGoogleSignIn());

  return {
    props: { 
      isLocal,
      apiEndpoint,
      locationName,
      locationLatitude,
      locationLongitude,
      mapBoxToken,
      googleToken
    }
  }
}

function EnviromentVarsComponent({props}) {
  return(<>
    <p>apiEndpoint = {props.apiEndpoint}</p>
    <p>isLocal = {String(props.isLocal)}</p>
    <p>locationName = {props.locationName}</p>
    <p>locationLatitude = {props.locationLatitude}</p>
    <p>locationLongitude = {props.locationLongitude}</p>
    <p>mapBoxToken = {props.mapBoxToken}</p>
    <p>googleToken = {props.googleToken}</p>
  </>)
}



function CarPositionComponent({apiEndpoint}) {
  const [userToken,] = useCookie("user_token")
  const [responseFull, setResponseFull] = useState('');
  const [responseOnlyPos, setResponseOnlyPos] = useState('');

  async function apiCall(kind) {
    return fetch(apiEndpoint+"/api/cars_" + kind + "_info", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userToken})
    }).then(data => data.json())
  }

  const handleSubmitFull = async (e) => {
    e.preventDefault();
    setResponseFull(JSON.stringify(await apiCall("full")))
  };  
  
  const handleSubmitPos = async (e) => {
    e.preventDefault();
    setResponseOnlyPos(JSON.stringify(await apiCall("pos")))
  };

  return(<>
    <form className="flex flex-col gap-4" onSubmit={handleSubmitFull}>
      <Button type="submit"> AskForAllCarInfo </Button>
    </form>
    <br></br> {responseFull} <br></br>
    <form className="flex flex-col gap-4" onSubmit={handleSubmitPos}>
      <Button type="submit"> AskForPosCarInfo </Button>
    </form>
    <br></br> {responseOnlyPos} <br></br>
    </>
  )
}

function DronePositionComponent({apiEndpoint}) {
  const [userToken,] = useCookie("user_token")
  const [responseFull, setResponseFull] = useState('');
  const [responseOnlyPos, setResponseOnlyPos] = useState('');

  async function apiCall(kind) {
    return fetch(apiEndpoint+"/api/drones_" + kind + "_info", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userToken})
    }).then(data => data.json())
  }

  const handleSubmitFull = async (e) => {
    e.preventDefault();
    setResponseFull(JSON.stringify(await apiCall("full")))
  };  
  
  const handleSubmitPos = async (e) => {
    e.preventDefault();
    setResponseOnlyPos(JSON.stringify(await apiCall("pos")))
  };

  return(<>
    <form className="flex flex-col gap-4" onSubmit={handleSubmitFull}>
      <Button type="submit"> AskForAllDroneInfo </Button>
    </form>
    <br></br> {responseFull} <br></br>
    <form className="flex flex-col gap-4" onSubmit={handleSubmitPos}>
      <Button type="submit"> AskForPosDroneInfo </Button>
    </form>
    <br></br> {responseOnlyPos} <br></br>
    </>
  )
}

export default function Home(props) {
    return (<>
      <Head>
      <title>TransMedWebPTIN</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Tabs.Group aria-label="Full width tabs" style="pills">
          <Tabs.Item title="Enviroment vars">
            <EnviromentVarsComponent props={props}/>
          </Tabs.Item>
          <Tabs.Item title="User Data test">
            <UserDataTestComponent/>
          </Tabs.Item>
          <Tabs.Item title="Register API test">
            <RegisterUserTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Login API test">
            <LoginUserTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Token check test">
            <TokenCheckTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Google Ouath test">
            <GoogleOAuthProvider clientId="692056364291-m1m2edfdtmjt69q2qrh1eshejauo900j.apps.googleusercontent.com">
              <GoogleOAuthTestComponent apiEndpoint={props.apiEndpoint}/>
            </GoogleOAuthProvider>
          </Tabs.Item>
          <Tabs.Item title="Get available medicines API test">
            <ListMedicinesTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Check has prescription API test">
            <HasPrescriptionTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Get car pos API test">
            <CarPositionComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Get drone pos API test">
            <DronePositionComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
        </Tabs.Group>
        </main>
    </>)
}