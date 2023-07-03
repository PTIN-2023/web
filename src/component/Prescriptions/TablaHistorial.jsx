import React, { useState, useEffect } from "react";
import {Table, Spinner, Dropdown, Tooltip } from 'flowbite-react'
import myordersStyles from "../../styles/Myorders.module.css"
import useCookie from "../../hooks/useCookie.js";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest.js";
import useSumbitAndFetchObject from "../../hooks/useSumbitAndFetchObject.js";
import { HiOutlineInformationCircle } from "react-icons/hi";

//Text
import getTextCurrentLocale from "../../utils/getTextCurrentLocale";

const TablaMedicinas = ({ props }) => {
    
  const [patientEmail, setPatientEmail] = useState('');
  const [userTokenCookie, ] = useCookie('user_token');
  const [responseRecord, setResponseRecord] = useState("none");
  const [spin, setSpin] = useState(false);

  const stringRequestRecipe = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "patient_email" : patientEmail,
  }) 

  const [sumbitAndFetch_record, response_record] = useSumbitAndFetchObject(
    stringRequestRecipe,
    props.apiEndpoint+"/api/get_patient_prescription_history",
  )

  useEffect(() => {
      if(userTokenCookie != null)
        sumbitAndFetch_record();
  }, [stringRequestRecipe])

  useEffect(() => {
    if(response_record != "none" && response_record != null){
      setResponseRecord(response_record)
    }
  }, [response_record])

  let timeoutId = null;

  const handlePatientInput = (event) => {
    clearTimeout(timeoutId);
    setSpin(true);
    timeoutId = setTimeout(() => {
      setPatientEmail(event.target.value);
      setSpin(false);
    }, 2000); // Tiempo en milisegundos (2 segundos en este caso)
  };
  
  return (
    <>
        <label htmlFor="patientName">{getTextCurrentLocale("user_email")}:</label> <br/>
        <input type="text" id="patientName" name="patientName" onChange={handlePatientInput} style={{ borderRadius: '10px' }}/>  
        {spin && <Spinner aria-label="Default status example" style={{ marginLeft: '10px' }}/>}      
        {patientEmail != '' ? (<h2><br></br>{getTextCurrentLocale("patient_prescriptions")} {patientEmail}: </h2>):<br></br>}
        <br></br>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>
              {getTextCurrentLocale("prescriptions_number")}
            </Table.HeadCell>
            <Table.HeadCell>
              {getTextCurrentLocale("medicine_list")}
              <Tooltip content={getTextCurrentLocale("format_medicines_prescriptions")}>
                <HiOutlineInformationCircle/>
              </Tooltip>
            </Table.HeadCell>
            <Table.HeadCell>
              {getTextCurrentLocale("duration")}
            </Table.HeadCell>
            <Table.HeadCell>
              {getTextCurrentLocale("renewal")}
            </Table.HeadCell>
            <Table.HeadCell>
              {getTextCurrentLocale("notes")}
            </Table.HeadCell>
            <Table.HeadCell>
              {getTextCurrentLocale("last_used")}
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {responseRecord !== "none" && responseRecord.result === "ok" && 
                responseRecord.prescriptions.map((prescriptions, index) => (
                    <Table.Row className={myordersStyles.tableRow} key={index} >
                      <Table.Cell className={myordersStyles.tableCell}>{index + 1}</Table.Cell>
                      <Table.Cell className={myordersStyles.tableCell}>
                        {prescriptions.medicine_list.map((medicines, index) => (
                          <span key={index}>
                            {medicines[0]} : {medicines[1]}
                            {index !== prescriptions.medicine_list.length - 1 && <br />}
                          </span>
                        ))}
                      </Table.Cell>
                      <Table.Cell className={myordersStyles.tableCell}>{prescriptions.duration} </Table.Cell>
                      <Table.Cell className={myordersStyles.tableCell}>{prescriptions.renewal} </Table.Cell>
                      <Table.Cell className={myordersStyles.tableCell}>
                        <Dropdown inline>
                            <Dropdown.Item>
                              {prescriptions.notes}
                            </Dropdown.Item>
                        </Dropdown>
                      </Table.Cell>
                      <Table.Cell className={myordersStyles.tableCell}>{prescriptions.last_used}</Table.Cell>
                    </Table.Row>
                ))
            }
          </Table.Body>
        </Table> 
    </>
  );
};

export default TablaMedicinas;