import Head from 'next/head'
import Layout from "../component/Layout"
import getTextCurrentLocale, { getText } from '../utils/getTextCurrentLocale'
import Tablainventarios from '../component/TablaInventario'
import {useState, useEffect} from "react";
import * as env_config from "../utils/env_config"
import useCookie from '../hooks/useCookie';
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest.js";
import useSumbitAndFetch from "../hooks/useSumbitAndFetchObject.js";
import {Button, TextInput} from 'flowbite-react'
import createUserStyles from '../styles/CreateUser.module.css'
import LabeledSelect from '../component/testpage/LabeledSelect';
import LabeledTextInputComponent from '../component/testpage/LabeledTextInput';
import ErrorModal from '../component/common/ModalOkButton';
import ModalOkButton from '../component/common/ModalOkButton';

export async function getServerSideProps() {
  const apiEndpoint = String(env_config.getApiEndpoint());

  return {
    props: { 
      apiEndpoint,
    }
  }
}

export default function Home({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [userFullName, setUserFullName] = useState('');
  const [userGivenName, setUserGivenName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [userRole, setUserRole] = useState('');

  // Modal state
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoModalText, setInfoModalText] = useState(false);

  // Request
  const onSumbit = async (e) => {
    e.preventDefault()
    // Check password
    if(userPassword != userConfirmPassword) {
      setInfoModalText("Passwords don't match")
      setShowInfoModal(true)
      return
    }

    // Send request
    await sumbitAndFetch()
  }

  const stringRequest = usePrepareBodyRequest({
    "user_full_name" : userFullName,
    "user_given_name" : userGivenName,
    "user_email" : userEmail,
    "user_phone" : userPhone,
    "user_city" : userCity,
    "user_address" : userAddress,
    "user_password" : userPassword,
    "user_role" : userRole
  })

  const [sumbitAndFetch,] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/manager_create_account",
    (res) => {
      if (res.result === "ok") {
        setInfoModalText("Account created")
        setShowInfoModal(true)
      } else {
        setInfoModalText("Error creating account: " + res.description)
        setShowInfoModal(true)
      }
    } 
  )
  // HTML
  return (<>
  <Head>
    <title>TransMedWebPTIN</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <main><Layout>
    <ModalOkButton
      show={showInfoModal}
      setShow={(v) => setShowInfoModal(v)}
      contentText={infoModalText}
      buttonText="Ok"
    />
    <form className={createUserStyles.mainContainer} onSubmit={onSumbit}>
    <LabeledTextInputComponent
        id="user_full_name"
        label_text={getTextCurrentLocale('user_full_name')}
        input_type="text"
        required={true}
        on_change={(e) => setUserFullName(e.target.value)}
      />
      <LabeledTextInputComponent
        id="user_given_name"
        label_text={getTextCurrentLocale('user_given_name')}
        input_type="text"
        required={true}
        on_change={(e) => setUserGivenName(e.target.value)}
      />
      <LabeledTextInputComponent
        id="user_email"
        label_text={getTextCurrentLocale('user_email')}
        input_type="email"
        required={true}
        on_change={(e) => setUserEmail(e.target.value)}
      />
      <LabeledTextInputComponent
        id="user_phone"
        label_text={getTextCurrentLocale('user_phone')}
        input_type="tel"
        required={true}
        on_change={(e) => setUserPhone(e.target.value)}
      />
      <LabeledTextInputComponent
        id="user_city"
        label_text={getTextCurrentLocale('user_city')}
        input_type="text"
        required={true}
        on_change={(e) => setUserCity(e.target.value)}
      />
      <LabeledTextInputComponent
        id="user_address"
        label_text={getTextCurrentLocale('user_address')}
        input_type="text"
        required={true}
        on_change={(e) => setUserAddress(e.target.value)}
      />
      <LabeledTextInputComponent
        id="user_password"
        label_text={getTextCurrentLocale('user_password')}
        input_type="password"
        required={true}
        on_change={(e) => setUserPassword(e.target.value)}
      />
      <LabeledTextInputComponent
        id="user_password_confirm"
        label_text={getTextCurrentLocale('user_confirm_password')}
        input_type="password"
        required={true}
        on_change={(e) => setUserConfirmPassword(e.target.value)}
      />
      <LabeledSelect
        className={createUserStyles.input} 
        id="user_role"
        label_text={getTextCurrentLocale('user_role')}
        required={true}
        options={['patient', 'doctor', 'manager']}
        on_change={(e) => setUserRole(e.target.value)}
      />
      <Button
      className={createUserStyles.button}
      type="submit"
      >
      {getTextCurrentLocale('sumbit_button')}
      </Button>
    </form>
    </Layout></main>
  </>)
}
