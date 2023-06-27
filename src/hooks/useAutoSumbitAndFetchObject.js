import { useState, useEffect } from "react";

// Hook that returns a function to use in a sumbit form that automatically
// sends a post request to the provided API endpoint with "request" as the body
// Optionally, a function to evaluate the response can be provided. The given 
// response is an object
//
// Usage example:
//   const [userToken, ] = useState('user_token')
//   const request = usePrepareBodyRequest({
//     "session_token" : userToken
//   })
//   [sumbitAndFetch, response] = useSumbitAndFetch(request, '/api/check', (res) => console.log(res))

export default function useAutoSumbitAndFetch(values, url, precheck, evaluateResponse) {
    // Fetch definition
    const [response, setResponse] = useState('none');
    async function fetchAndProcess(url, body) {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: body
        }).then(data => {try {return data.json()} catch (e) {return 'none';}})

        if(res)
            setResponse(res)
        else
            setResponse('none')

        if(evaluateResponse)
            evaluateResponse(res)
    }

    // Sumbit and fetch
    const sumbitAndFetch = async (e) => {
        if(!precheck || precheck(values)) {
            const body = JSON.stringify(values, null, 2)
            await fetchAndProcess(url, body)
        }
    };

    // Trigger
    useEffect(() => {
        sumbitAndFetch()
    }, Object.values(values));

    return [sumbitAndFetch, response];
};