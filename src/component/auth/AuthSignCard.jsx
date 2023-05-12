import Link from "next/link"
import AuthStyles from "../../styles/Auth.module.css";
import { useState } from "react";
import AuthSignInCardContent from "./AuthSignInCardContent";
import AuthSignUpCardContent from "./AuthSignUpCardContent";
import {GoogleOAuthProvider} from '@react-oauth/google';

export default function AuthSignCard() {
  const [page, setPage] = useState('sign_in')

  return (
  <div className="container mx-auto p-4 bg-white rounded-md shadow-md w-1/2">
    <div className="relative">
      <div className="absolute right-0 top-0 mr-0 mt-4 space-x-0 border bg-gray-100 border-gray-300 rounded-md">
        <button 
          className={page=='sign_in' ? AuthStyles.button_selected : AuthStyles.button_unselected} 
          onClick={() => setPage('sign_in')}
        >
          Sign In
        </button>
        <button
          className={page=='sign_up' ? AuthStyles.button_selected : AuthStyles.button_unselected}
          onClick={() => setPage('sign_up')}
        >
          Sign Up
        </button>
      </div>
      {page=='sign_in' &&
        <GoogleOAuthProvider clientId="692056364291-m1m2edfdtmjt69q2qrh1eshejauo900j.apps.googleusercontent.com">
          <AuthSignInCardContent/>
        </GoogleOAuthProvider>
      }
      {page=='sign_up' &&
          <AuthSignUpCardContent/>
      }
    </div>
  </div>
  )
}