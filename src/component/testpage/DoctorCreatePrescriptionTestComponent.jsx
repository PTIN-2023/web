import {useState} from "react";
import React from "react";
import useCookie from "../../hooks/useCookie";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "../common/LabeledTextInput";

export default function DoctorCreatePrescriptionTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [userFullName, setUserFullName] = useState('John Doe')
  const [medicineList, setMedicineList] = useState(['0fghdfh', '1fgdhgfd', '2fdghj', '3hgffgdh']);
  const [duration, setDuration] = useState('2 weeks')
  const [notes, setNotes] = useState('')

  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "user_full_name" : userFullName,
    "medicine_list" : medicineList,
    "duration" : duration,
    "notes": notes
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/doctor_create_prescription"
  )

  // Define the HTML/React code
  return(
  <TestPageTabLayout 
      title="Make order API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
      cookiesToShow={{'user_token' : userTokenCookie}}
  >
    <LabeledTextInputComponent
      id="userFullName"
      label_text="userFullName"
      input_type="text"
      required={true}
      on_change={(e) => setUserFullName(e.target.value)}
    />
    <LabeledTextInputComponent
      id="medicineList"
      label_text="medicineList"
      input_type="text"
      required={true}
      on_change={(e) => setMedicineList(e.target.value.split(','))}
      value={medicineList}
    />
    <LabeledTextInputComponent
      id="duration"
      label_text="duration"
      input_type="text"
      required={true}
      on_change={(e) => setDuration(e.target.value)}
    />
    <LabeledTextInputComponent
      id="notes"
      label_text="notes"
      input_type="text"
      required={true}
      on_change={(e) => setNotes(e.target.value)}
    />
  </TestPageTabLayout>
  )
}