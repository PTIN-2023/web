import { useState, useEffect } from "react";

// Hook to automatically prepare a JSON API request based on a object composed 
// of useState() values.
//
// Usage example:
//   const [userToken, ] = useState('user_token')
//   const request = usePrepareBodyRequest({
//     "session_token" : userToken
//   }) 

export default function usePrepareBodyRequest(values) {
    const [bodyRequest, setBodyRequest] = useState('none');
    useEffect(() => {setBodyRequest(JSON.stringify(values, null, 2))}, Object.values(values));
    return bodyRequest;
};