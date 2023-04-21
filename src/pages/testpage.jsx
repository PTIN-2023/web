import * as env_config from "../utils/env_config"
import Head from 'next/head'
import {useState, useEffect} from "react";
import {Tabs, Label, TextInput, Button, Toast} from 'flowbite-react'
import {FaTelegramPlane} from 'react-icons/fa'

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

function EnviromentVarsComponent({props}) {
  return(<>
    <p>apiEndpoint = {props.apiEndpoint}</p>
    <p>isLocal = {props.isLocal}</p>
    <p>locationName = {props.locationName}</p>
    <p>locationLatitude = {props.locationLatitude}</p>
    <p>locationLongitude = {props.locationLongitude}</p>
    <p>mapBoxToken = {props.mapBoxToken}</p>
    <p>googleToken = {props.googleToken}</p>
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
          <Tabs.Item title="Login API test">
            <LoginUserComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Register API test">
            <RegisterUserComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Get available medicines API test">
            <AvailableMedicinesComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
        </Tabs.Group>
        </main>
    </>)
}