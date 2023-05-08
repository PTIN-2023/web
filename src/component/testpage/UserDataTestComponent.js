import {Label, TextInput, Button} from 'flowbite-react'
import { Select } from "flowbite-react";
import useCookie from "../../hooks/useCookie";
import React from "react";
import getTextCurrentLocale from '../../utils/getTextCurrentLocale'

export default function UserDataTestComponent() {
  // Cookies
  const [userGivenNameCookie, setUserGivenNameCookie] = useCookie('user_given_name')
  const [userRoleCookie, setUserRoleCookie] = useCookie('user_role')
  const [userTokenCookie, setUserTokenCookie] = useCookie('user_token')

  return(<>
    <h1 className="text-3xl font-bold mb-6 text-center">Cookies</h1>
    <div>
      <p>userGivenName={userGivenNameCookie}</p>
      <p>userRole={userRoleCookie}</p>
      <p>userToken={userTokenCookie}</p>
    </div>

    <br></br>

    <h1 className="text-3xl font-bold mb-6 text-center">Form</h1>
    <form className="flex flex-col gap-4">
    <div>
      <div className="mb-2 block">
          <Label
          htmlFor="user_given_name"
          value={getTextCurrentLocale('user_given_name')}
          />
      </div>
      <TextInput
          id="user_given_name"
          type="text"
          required={true}
          onChange={(e) => setUserGivenNameCookie(e.target.value)}
      />
    </div>
    <div>
      <div className="mb-2 block">
        <Label
          htmlFor="user_role"
          value={getTextCurrentLocale('user_role')}
        />
      </div>
      <Select 
        id="user_role" 
        required={false}
        onChange={(e) => setUserRoleCookie(e.target.value)}
      >
        <option>         </option>
        <option> patient </option>
        <option> doctor  </option>
        <option> manager </option>
      </Select>
    </div>
    <div>
      <div className="mb-2 block">
        <Label
          htmlFor="token1"
          value={getTextCurrentLocale('user_token')}
        />
      </div>
      <TextInput
        id="token1"
        type="text"
        required={false}
        onChange={(e) => setUserTokenCookie(e.target.value)}
      />
    </div>
  </form>
  </>)
}