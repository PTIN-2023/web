import {Label, TextInput} from 'flowbite-react'

export default function LabeledTextInputComponent({id, label_text, input_type, required, on_change, value}) {
  return(<div>
    <div className="mb-2 block">
        <Label
        htmlFor={id}
        value={label_text}
        />
    </div>
    <TextInput
        id={id}
        type={input_type}
        required={required}
        onChange={on_change}
        value={value}
    />
  </div>
  )
}