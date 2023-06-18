import {Label, TextInput, Button} from 'flowbite-react'
import { Select } from "flowbite-react";
import useCookie from "../../hooks/useCookie";
import React from "react";
import getTextCurrentLocale from '../../utils/getTextCurrentLocale'
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "../common/LabeledTextInput";
import LabeledSelect from "../common/LabeledSelect"

export default function UserDataTestComponent() {
  // Cookies
  const [userGivenNameCookie, setUserGivenNameCookie] = useCookie('user_given_name')
  const [userRoleCookie, setUserRoleCookie] = useCookie('user_role')
  const [userTokenCookie, setUserTokenCookie] = useCookie('user_token')

  // Define the HTML/React code
  return(
    <TestPageTabLayout 
      title="User data API test"
      cookiesToShow={{
        'user_given_name' : userGivenNameCookie,
        'user_role' : userRoleCookie,
        'user_token' : userTokenCookie
      }}
    >
      <LabeledTextInputComponent
        id="user_given_name"
        label_text={getTextCurrentLocale('user_given_name')}
        input_type="text"
        required={true}
        on_change={(e) => setUserGivenNameCookie(e.target.value)}
      />
      <LabeledSelect
        id="user_role"
        label_text={getTextCurrentLocale('user_role')}
        required={true}
        options={['', 'patient', 'doctor', 'manager']}
        on_change={(e) => setUserRoleCookie(e.target.value)}
      />
      <LabeledTextInputComponent
        id="user_token"
        label_text={getTextCurrentLocale('user_token')}
        input_type="text"
        required={true}
        on_change={(e) => setUserTokenCookie(e.target.value)}
      />
    </TestPageTabLayout>
  )
}