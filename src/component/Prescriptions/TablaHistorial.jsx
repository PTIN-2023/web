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
        <label htmlFor="patientName">Patient mail:</label> <br/>
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
              <Tooltip content="Formato - ID : Cantidad">
                <HiOutlineInformationCircle/>
              </Tooltip>
            </Table.HeadCell>
            <Table.HeadCell>
              Duracion
            </Table.HeadCell>
            <Table.HeadCell>
              Renovacion
            </Table.HeadCell>
            <Table.HeadCell>
              Notas
            </Table.HeadCell>
            <Table.HeadCell>
              Ultimo uso
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {responseRecord !== "none" && responseRecord.result === "ok" && 
                responseRecord.prescriptions.map((prescriptions, index) => (
                  <React.Fragment key={index}>
                    <Table.Row className={myordersStyles.tableRow}>
                      <Table.Cell className={myordersStyles.tableCell}>{index + 1}</Table.Cell>
                      <Table.Cell className={myordersStyles.tableCell}>
                        {prescriptions.medicine_list.map((medicines, index) => (
                          <span key={index}>
                            {medicines[0]} : {medicines[1]}
                            {index !== prescriptions.medicine_list.length - 1 && <br />}
                          </span>
                        ))}
                      </Table.Cell>
                      <Table.Cell className={myordersStyles.tableCell}>{prescriptions.duration} dias</Table.Cell>
                      <Table.Cell className={myordersStyles.tableCell}>{prescriptions.renewal} dias</Table.Cell>
                      <Table.Cell className={myordersStyles.tableCell}>
                        <Dropdown label="Notas" inline>
                            <Dropdown.Item>
                              {prescriptions.notes}
                            </Dropdown.Item>
                        </Dropdown>
                      </Table.Cell>
                      <Table.Cell className={myordersStyles.tableCell}>{prescriptions.last_used}</Table.Cell>
                    </Table.Row>
                  </React.Fragment>
                ))
            }
          </Table.Body>
        </Table> 
        {patientEmail === '' ? (
          responseRecord.result !== "ok" ? (
            <div></div>
          ) : (
            <div>Introduce el nombre de un paciente</div>
          )
        ) : (
          <div>{patientEmail} no tiene recetas o no existe</div>
        )}
    </>
  );
};

export default TablaMedicinas;