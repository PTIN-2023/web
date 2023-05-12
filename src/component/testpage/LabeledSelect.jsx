import {Label, Select} from 'flowbite-react'

export default function LabeledSelect({id, label_text, required, options, on_change}) {
  return(<div>
    <div className="mb-2 block">
      <Label
      htmlFor={id}
      value={label_text}
    />
    </div>
    <Select 
      id={id} 
      required={true}
      onChange={on_change}
    >
      {options.map((v) => (
          <option key={v}>{v}</option>
      ))}
    </Select>
  </div>
  )
}