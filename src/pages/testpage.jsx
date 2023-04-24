import * as env_config from "../utils/env_config"
import Head from 'next/head'
import {useState, useEffect} from "react";
import {Tabs, Label, TextInput, Button, Toast} from 'flowbite-react'
import { Select } from "flowbite-react";
import useLocalStorageState from 'use-local-storage-state'
import React from "react";

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

function UserDataComponent() {
  const [userFullName, setUserFullName] = useLocalStorageState("userFullName", {
    defaultValue: 'Ibai Llanos Garatea'
  });
  const [userRole, setUserRole] = useLocalStorageState("userRole", {
    defaultValue: 'patient'
  });
  const [userToken, setUserToken] = useLocalStorageState("userToken", {
    defaultValue: '3'
  });
  // TODO: define a more secure way to handle the userToken e.g. encryption

  const [tmpFullName, setTmpFullName] = useState('');
  const [tmpUserRole, setTmpUserRole] = useState('');
  const [tmpUserToken, setTmpUserToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(tmpFullName != '')
      setUserFullName(tmpFullName);

    if(tmpUserRole != '')
      setUserRole(tmpUserRole);

    if(tmpUserToken != '')
      setUserToken(tmpUserToken);
  };

  return(<>
    <div>
      <p>userFullName={userFullName}</p>
      <p>userRole={userRole}</p>
      <p>userToken={userToken}</p>
    </div>
    <br></br>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
    <div>
      <div className="mb-2 block">
        <Label
          htmlFor="name1"
          value="Full name"
        />
      </div>
      <TextInput
        id="name1"
        type="text"
        required={false}
        onChange={(e) => setTmpFullName(e.target.value)}
      />
    </div>
    <div>
      <div className="mb-2 block">
        <Label
          htmlFor="role1"
          value="User role"
        />
      </div>
      <Select 
        id="role1" 
        required={false}
        onChange={(e) => setTmpUserRole(e.target.value)}
      >
        <option> patient </option>
        <option> doctor  </option>
        <option> manager </option>
      </Select>
    </div>
    <div>
      <div className="mb-2 block">
        <Label
          htmlFor="token1"
          value="User token"
        />
      </div>
      <TextInput
        id="token1"
        type="text"
        required={false}
        onChange={(e) => setTmpUserToken(e.target.value)}
      />
    </div>
    <Button type="submit">
      Store
    </Button>
  </form>
  </>)
}

function LoginUserComponent({apiEndpoint}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  async function apiCall(email, password) {
    return fetch(apiEndpoint+"/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(data => data.json())
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    console.log(
      JSON.stringify({
        email,
        password
      })
    )
    setResponse(JSON.stringify(await apiCall(email, password)))
  };

  return(<>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
    <div>
      <div className="mb-2 block">
        <Label
          htmlFor="email1"
          value="Your email"
        />
      </div>
      <TextInput
        id="email1"
        type="email"
        placeholder="name@flowbite.com"
        required={true}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div>
      <div className="mb-2 block">
        <Label
          htmlFor="password1"
          value="Your password"
        />
      </div>
      <TextInput
        id="password1"
        type="password"
        required={true}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <Button type="submit">
      Submit
    </Button>
  </form>
  <br></br>
  {response}
  <br></br>
  </>)
}

function RegisterUserComponent({apiEndpoint}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  async function apiCall(email, password) {
    return fetch(apiEndpoint+"/api/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        password
      })
    }).then(data => data.json())
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    console.log(
      JSON.stringify({
        email,
        password
      })
    )
    setResponse(JSON.stringify(await apiCall(email, password)))
  };

  return(<>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

    <div>
      <div className="mb-2 block">
        <Label
          htmlFor="name1"
          value="Your name"
        />
      </div>
      <TextInput
        id="name1"
        type="text"
        required={true}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div>
      <div className="mb-2 block">
        <Label
          htmlFor="phone1"
          value="Your phone"
        />
      </div>
      <TextInput
        id="phone1"
        type="tel"
        required={true}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>
    <div>
      <div className="mb-2 block">
        <Label
          htmlFor="email1"
          value="Your email"
        />
      </div>
      <TextInput
        id="email1"
        type="email"
        placeholder="name@flowbite.com"
        required={true}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div>
      <div className="mb-2 block">
        <Label
          htmlFor="password1"
          value="Your password"
        />
      </div>
      <TextInput
        id="password1"
        type="password"
        required={true}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <Button type="submit">
      Submit
    </Button>
  </form>
  <br></br>
  {response}
  <br></br>
  </>)
}

function AvailableMedicinesComponent({apiEndpoint}) {
  const [response, setResponse] = useState('');

  async function apiCall(email, password) {
    return fetch(apiEndpoint+"/api/medicines_list", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    }).then(data => data.json())
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Asking for medicine list...`);
    setResponse(JSON.stringify(await apiCall()))
  };

  return(<>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
    <Button type="submit">
      AskForMedicineList
    </Button>
  </form>
  <br></br>
  {response}
  <br></br>
  </>)
}

function CarPositionComponent({apiEndpoint}) {
  const [userToken,] = useLocalStorageState("userToken")
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
    console.log(`Asking for all car position info...`);
    setResponseFull(JSON.stringify(await apiCall("full")))
  };  
  
  const handleSubmitPos = async (e) => {
    e.preventDefault();
    console.log(`Asking for all car position info...`);
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
            <UserDataComponent/>
          </Tabs.Item>
          <Tabs.Item title="Login API test">
            <LoginUserComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Register API test">
            <RegisterUserComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Get available medicines API test">
            <AvailableMedicinesComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Get car pos API test">
            <CarPositionComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
        </Tabs.Group>
        </main>
    </>)
}