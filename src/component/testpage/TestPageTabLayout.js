import {Button} from 'flowbite-react'

export default function TestPageTabLayout({ children, title, onSubmit, stringRequest, stringResponse, cookiesToShow }) { 
  return (<>
    <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      {children}
      {onSubmit && <>
        <Button type="submit">
        Submit
        </Button>
      </>
      }
    </form>
    <br/>
  
    {stringRequest && <>
      <h1 className="text-3xl font-bold mb-6 text-center">Request</h1>
      {stringRequest}
      <br/><br/>
    </>}

    {stringResponse && <>
      <h1 className="text-3xl font-bold mb-6 text-center">Response received</h1>
      {stringResponse}
      <br/>
    </>}

    {cookiesToShow && <>
      <h1 className="text-3xl font-bold mb-6 text-center">Cookies values</h1>
      {Object.entries(cookiesToShow).map(([key, value]) => (
        <p key={key}>
          <strong>{key}: </strong>
          {value}
        </p>
      ))}
    </>}
  </>)
}