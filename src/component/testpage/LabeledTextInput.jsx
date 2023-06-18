import {Label, TextInput} from 'flowbite-react'
import getTextCurrentLocale from '../../utils/getTextCurrentLocale'

const passwordValidator = 
  "(?=.*[a-z])"        + // has one lowercase
  "(?=.*[A-Z])"        + // has one uppercase
  "(?=.*\\d)"          + // has a digit
  "(?=.*[@$!%*?&])"    + // has a special character
  "[A-Za-z\\d@$!%*?&]" + // valid password characters
  "{8,}"                 // at least 8 chars

export default function LabeledTextInputComponent({id, label_text, input_type, required, on_change, value}) {
  return(<div>
    <div className="mb-2 block">
        <Label
        htmlFor={id}
        value={label_text}
        />
    </div>
    { input_type=="password" && 
      <TextInput
        id={id}
        type={input_type}
        required={required}
        onChange={on_change}
        value={value}
        pattern={passwordValidator}
        title={getTextCurrentLocale("user_password_req_message")}
      />
    }
    { input_type!="password" &&
      <TextInput
        id={id}
        type={input_type}
        required={required}
        onChange={on_change}
        value={value}
      />
    }
  </div>)
}