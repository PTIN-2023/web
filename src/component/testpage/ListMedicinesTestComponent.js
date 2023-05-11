import {useState} from "react";
import React from "react";
import useCookie from "../../hooks/useCookie";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "./LabeledTextInput";

export default function ListMedicinesTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [medsPerPage, setMedsPerPage] = useState('');
  const [page, setPage] = useState('');
  const [medName, setMedName] = useState('');
  const [pvpMin, setPvpMin] = useState('');
  const [pvpMax, setPvpMax] = useState('');
  const [prescriptionNeeded, setPrescriptionNeeded] = useState([true, false]);
  const [medForm, setMedForm] = useState(['pill', 'cream', 'powder', 'liquid']);
  const [typeOfAdminst, setTypeOfAdminst] = useState(['oral', 'topical', 'inhalation', 'ophthalmic']);
  
  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "filter" : {
        "meds_per_page" : medsPerPage,
        "page" : page,
        "med_name" : medName,
        "pvp_min" : pvpMin,
        "pvp_max" : pvpMax,
        "prescription_needed" : prescriptionNeeded,
        "form" : medForm,
        "type_of_administration" : typeOfAdminst
    }
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/list_available_medicines"
  )

  // Define the HTML/React code
  return(
  <TestPageTabLayout 
      title="List available medicines API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
      cookiesToShow={{'user_token' : userTokenCookie}}
  >
    <LabeledTextInputComponent
      id="meds_per_page"
      label_text="Meds per page"
      input_type="text"
      required={true}
      on_change={(e) => setMedsPerPage(e.target.value)}
      value={medsPerPage}
    />
    <LabeledTextInputComponent
      id="page"
      label_text="Page"
      input_type="text"
      required={true}
      on_change={(e) => setPage(e.target.value)}
      value={page}
    />
    <LabeledTextInputComponent
      id="med_name"
      label_text="Medicine Name"
      input_type="text"
      required={true}
      on_change={(e) => setMedName(e.target.value)}
      value={medName}
    />
    <LabeledTextInputComponent
      id="pvp_min"
      label_text="pvp_min"
      input_type="text"
      required={true}
      on_change={(e) => setPvpMin(e.target.value)}
      value={pvpMin}
    />
    <LabeledTextInputComponent
      id="pvp_max"
      label_text="pvp_max"
      input_type="text"
      required={true}
      on_change={(e) => setPvpMax(e.target.value)}
      value={pvpMax}
    />
    <LabeledTextInputComponent
      id="prescription_needed"
      label_text="prescription_needed"
      input_type="text"
      required={true}
      on_change={(e) => setPrescriptionNeeded(e.target.value.split(','))}
      value={prescriptionNeeded}
    />
    <LabeledTextInputComponent
      id="type_of_administration"
      label_text="type_of_administration"
      input_type="text"
      required={true}
      on_change={(e) => setTypeOfAdminst(e.target.value.split(','))}
      value={typeOfAdminst}
    />
  </TestPageTabLayout>
  )
}