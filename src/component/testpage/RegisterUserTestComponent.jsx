import {useEffect, useState} from "react";
import {Label, TextInput, Button} from 'flowbite-react'
import useCookie from "../../hooks/useCookie";
import React from "react";
import getTextCurrentLocale from '../../utils/getTextCurrentLocale'
import fetchAndExtractBody from "../../utils/fetchAndExtractBody";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "./LabeledTextInput";
import LabeledSelect from "./LabeledSelect";

export default function  RegisterUserTestComponent({apiEndpoint}) {
  // Cookies
  const [userGivenNameCookie, setUserGivenNameCookie] = useCookie('user_given_name')
  const [userRoleCookie, setUserRoleCookie] = useCookie('user_role')
  const [userTokenCookie, setUserTokenCookie] = useCookie('user_token')

  // Form values
  const [userFullName, setUserFullName] = useState('');
  const [userGivenName, setUserGivenName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Request
  const stringRequest = usePrepareBodyRequest({
    "user_full_name" : userFullName,
    "user_given_name" : userGivenName,
    "user_email" : userEmail,
    "user_phone" : userPhone,
    "user_city" : userCity,
    "user_address" : userAddress,
    "user_password" : userPassword
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/register",
    (res) => {
      if (res.result === "ok") {
        setUserGivenNameCookie(userGivenName)
        setUserRoleCookie("patient")
        setUserTokenCookie(res.session_token)
      }
    } 
  )

  // Define the HTML/React code
  return(
    <TestPageTabLayout 
      title="Register API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
      cookiesToShow={{
        'user_given_name' : userGivenNameCookie,
        'user_role' : userRoleCookie,
        'user_token' : userTokenCookie
      }}
    >
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
    </TestPageTabLayout>
  )
}