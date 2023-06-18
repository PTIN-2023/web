import {Button} from 'flowbite-react'
import getTextCurrentLocale from '../../utils/getTextCurrentLocale'

export default function TestPageTabLayout({ children, title, onSubmit, stringRequest, stringResponse, cookiesToShow }) { 
  return (<>
    <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      {children}
      {onSubmit && <>
        <Button type="submit">
        {getTextCurrentLocale('sumbit_button')}
        </Button>
      </>
      }
    </form>
    <br/>
  
    {stringRequest && <>
      <h2 className="text-3xl font-bold mb-6 text-center">Request</h2>
      <pre>{stringRequest}</pre>
      <br/><br/>
    </>}

    {stringResponse && <>
      <h2 className="text-3xl font-bold mb-6 text-center">Response received</h2>
      <pre>{stringResponse}</pre>
      <br/>
    </>}

    {cookiesToShow && <>
      <h2 className="text-3xl font-bold mb-6 text-center">Cookies values</h2>
      {Object.entries(cookiesToShow).map(([key, value]) => (
        <p key={key}>
          <strong>{key}: </strong>
          {value}
        </p>
      ))}
    </>}
  </>)
}