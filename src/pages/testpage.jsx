import * as env_config from "../utils/env_config"
import Head from 'next/head'
import {Tabs, Button} from 'flowbite-react'
import React from "react";
import UserDataTestComponent from "../component/testpage/UserDataTestComponent";
import RegisterUserTestComponent from "../component/testpage/RegisterUserTestComponent";
import LoginUserTestComponent from "../component/testpage/LoginUserTestComponent";
import TokenCheckTestComponent from "../component/testpage/TokenCheckTestComponent";
import GoogleOAuthTestComponent from "../component/testpage/GoogleOAuthTestComponent"
import ListMedicinesTestComponent from "../component/testpage/ListMedicinesTestComponent"
import HasPrescriptionTestComponent from "../component/testpage/HasPrescriptionTestComponent";
import ListPatientOrders from "../component/testpage/ListPatientOrders";
import ManagerListDoctors from "../component/testpage/ManagerListDoctors";
import ManagerAssignDoctors from "../component/testpage/ManagerAssignDoctors"
import ListAssignedDoctors from "../component/testpage/ListAssignedDoctors";
import GetPrecriptionMedsTestComponent from "../component/testpage/GetPrescriptionMedsTestComponent";
import CancelConfirmOrderTestComponent from "../component/testpage/CancelConfirmOrderTestComponent";
import CarInfoTestComponent from "../component/testpage/CarInfoTestComponent";
import DronesInfoTestComponent from "../component/testpage/DronesInfoTestComponent";
import BeehivesInfoTestComponent from "../component/testpage/BeehivesInfoTestComponent";
import ListDoctorPendingConfirmations from "../component/testpage/ListDoctorPendingConfirmations";
import ListDoctorApprovedConfirmations from "../component/testpage/ListDoctorApprovedConfirmations";
import DoctorConfirmOrder from "../component/testpage/DoctorConfirmOrder";
import GenerateRouteTestComponent from "../component/testpage/GenerateRouteTestComponent";
import MakeOrderTestComponent from "../component/testpage/MakeOrderTestComponent";
import {GoogleOAuthProvider} from '@react-oauth/google';
import NumPagesMedicinesTestComponent from "../component/testpage/NumPagesMedicinesTestComponent";
import NumPagesPatientOrdersTestComponent from "../component/testpage/NumPagesPatientOrdersTestComponent";
import NumPagesDoctorPendingConfirmations from "../component/testpage/NumPagesDoctorPendingConfirmations";
import NumPagesDoctorApprovedConfirmations from "../component/testpage/NumPagesDoctorApprovedConfirmations";
import StoreRouteTestComponent from "../component/testpage/StoreRouteTestComponent";
import GetRouteTestComponent from "../component/testpage/GetRouteTestComponent";
import GeneralStorePosTestComponent from "../component/testpage/GeneralStorePosTestComponent";
import UpdateCarsTestComponent from "../component/testpage/UpdateCarsTestComponent";
import UpdateDronesTestComponent from "../component/testpage/UpdateDronesTestComponent";
import CreatePaymentTestComponent from "../component/testpage/CreatePaymentTestComponent";
import DoctorCreatePrescriptionTestComponent from "../component/testpage/DoctorCreatePrescriptionTestComponent";
import DoctorGetPatientPrescriptionHistory from "../component/testpage/DoctorGetPatientPrescriptionHistory";
import ListStats from "../component/testpage/ListStats";

// Temporal testing page to make sure the env variables + api requests work as 
// intented

export async function getServerSideProps() {
  const isLocal           = env_config.isLocal();
  const apiEndpoint       = String(          env_config.getApiEndpoint());
  const apiInternalEndpoint = String(          env_config.getApiInternalEndpoint());
  const locationName      = String(isLocal ? env_config.getLocationName()      : "N/A");
  const locationLatitude  = String(isLocal ? env_config.getLocationLatitude()  : "N/A");
  const locationLongitude = String(isLocal ? env_config.getLocationLongitude() : "N/A");
  const mapBoxToken       = String(          env_config.getTokenMapBox());
  const googleToken       = String(          env_config.getTokenGoogleSignIn());

  return {
    props: { 
      isLocal,
      apiEndpoint,
      apiInternalEndpoint,
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
    <p>apiInternalEndpoint = {props.apiInternalEndpoint}</p>
    <p>isLocal = {String(props.isLocal)}</p>
    <p>locationName = {props.locationName}</p>
    <p>locationLatitude = {props.locationLatitude}</p>
    <p>locationLongitude = {props.locationLongitude}</p>
    <p>mapBoxToken = {props.mapBoxToken}</p>
    <p>googleToken = {props.googleToken}</p>
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
          <Tabs.Item title="User Data test">
            <UserDataTestComponent/>
          </Tabs.Item>
          <Tabs.Item title="Register API test">
            <RegisterUserTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Login API test">
            <LoginUserTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Token check API test">
            <TokenCheckTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Google Ouath API test">
            <GoogleOAuthProvider clientId="692056364291-m1m2edfdtmjt69q2qrh1eshejauo900j.apps.googleusercontent.com">
              <GoogleOAuthTestComponent apiEndpoint={props.apiEndpoint}/>
            </GoogleOAuthProvider>
          </Tabs.Item>
          <Tabs.Item title="Num pages available medicines API test">
            <NumPagesMedicinesTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="List available medicines API test">
            <ListMedicinesTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Has prescription API test">
            <HasPrescriptionTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Make order API test">
            <MakeOrderTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Create payment API test">
            <CreatePaymentTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Get prescription meds API test">
            <GetPrecriptionMedsTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Num pages patient Orders API test">
            <NumPagesPatientOrdersTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="List Patient Orders API test">
            <ListPatientOrders apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Cancel/confirm Order API test">
            <CancelConfirmOrderTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Get car info API test">
            <CarInfoTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Get drone info API test">
            <DronesInfoTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Beehives info API test">
            <BeehivesInfoTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="General Store Pos API test">
            <GeneralStorePosTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Num pages doctor pending confirmations API test">
            <NumPagesDoctorPendingConfirmations apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Num pages doctor approved confirmations API test">
            <NumPagesDoctorApprovedConfirmations apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="List doctor pending confirmations API test">
            <ListDoctorPendingConfirmations apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="List doctor approved confirmations API test">
            <ListDoctorApprovedConfirmations apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Doctor confirm order API test">
            <DoctorConfirmOrder apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Generate route API test">
            <GenerateRouteTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Store route API test">
            <StoreRouteTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Get route API test">
            <GetRouteTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Update cars API test">
            <UpdateCarsTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Update drones API test">
            <UpdateDronesTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Create prescriptions API test">
            <DoctorCreatePrescriptionTestComponent apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="List prescriptions API test">
            <DoctorGetPatientPrescriptionHistory apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Manager List Doctors API test">
            <ManagerListDoctors apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="List Assigned Doctors API test">
            <ListAssignedDoctors apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Manager Assign Doctors API test">
            <ManagerAssignDoctors apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
          <Tabs.Item title="Stats API test">
            <ListStats apiEndpoint={props.apiEndpoint}/>
          </Tabs.Item>
        </Tabs.Group>
        </main>
    </>)
}