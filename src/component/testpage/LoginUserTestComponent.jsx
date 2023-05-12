import {useState} from "react";
import useCookie from "../../hooks/useCookie";
import React from "react";
import getTextCurrentLocale from "../../utils/getTextCurrentLocale";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "./LabeledTextInput";

export default function LoginUserTestComponent({apiEndpoint}) {
  // Cookies
  const [userGivenNameCookie, setUserGivenNameCookie] = useCookie('user_given_name')
  const [userRoleCookie, setUserRoleCookie] = useCookie('user_role')
  const [userTokenCookie, setUserTokenCookie] = useCookie('user_token')
  const [userPictureCookie, setUserPictureCookie] = useCookie('user_picture')

  // Form values
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Request
  const stringRequest = usePrepareBodyRequest({
    "user_email" : userEmail,
    "user_password" : userPassword
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/login",
    (res) => {
      if (res.result === "ok") {
        setUserGivenNameCookie(res.user_given_name)
        setUserRoleCookie(res.user_role)
        setUserTokenCookie(res.user_token)
        setUserPictureCookie(res.user_picture)
      }
    }
  )
  
  // Define the HTML/React code
  return(
    <TestPageTabLayout 
      title="Login API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
      cookiesToShow={{
        'user_given_name' : userGivenNameCookie,
        'user_role' : userRoleCookie,
        'user_token' : userTokenCookie,
        'user_picture' : userPictureCookie
      }}
    >
      <LabeledTextInputComponent
        id="user_email"
        label_text={getTextCurrentLocale('user_email')}
        input_type="email"
        required={true}
        on_change={(e) => setUserEmail(e.target.value)}
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