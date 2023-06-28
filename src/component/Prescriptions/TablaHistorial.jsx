import React, { useState, useEffect, useDeferredValue } from "react";
import {Table } from 'flowbite-react'
import myordersStyles from "../../styles/Myorders.module.css"
import useCookie from "../../hooks/useCookie.js";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest.js";
import useSumbitAndFetchObject from "../../hooks/useSumbitAndFetchObject.js";

const TablaMedicinas = ({ props }) => {
    
  const [patientName, setPatientName] = useState('');
  const [userTokenCookie, ] = useCookie('user_token');
  const [responseRecord, setResponseRecord] = useState("none");
  const [noRecetas, setNoRecetas] = useState(false);

  const stringRequestRecipe = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "user_full_name"  : patientName,
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

    timeoutId = setTimeout(() => {
      setPatientName(event.target.value);
    }, 2000); // Tiempo en milisegundos (2 segundos en este caso)
  };
  
  return (
    <>
        <label htmlFor="patientName">Nombre Paciente:</label> <br/>
        <input type="text" id="patientName" name="patientName" onChange={handlePatientInput}/>        
        {patientName != '' ? (<h2><br></br>Recetas del paciente {patientName}: </h2>):<br></br>}
        <br></br>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>
              Numero receta
            </Table.HeadCell>
            <Table.HeadCell>
              Lista de medicamentos
            </Table.HeadCell>
            <Table.HeadCell>
              Tratamiento
            </Table.HeadCell>
            <Table.HeadCell>
              Notas
            </Table.HeadCell>
            <Table.HeadCell>
              Usos
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            
            {responseRecord !== "none" ? (
              responseRecord.prescriptions !== null ? (
                responseRecord.prescriptions.map((prescriptions, index) => (
                  <>
                    <Table.Row className={myordersStyles.tableRow}>
                      <Table.Cell className={myordersStyles.tableCell}>{index + 1}</Table.Cell>
                      <Table.Cell className={myordersStyles.tableCell}>
                        {prescriptions.medicine_list.map((medicines) =>
                          {medicines.identifier}
                        )}
                      </Table.Cell>
                      <Table.Cell className={myordersStyles.tableCell}>{prescriptions.duration}</Table.Cell>
                      <Table.Cell className={myordersStyles.tableCell}>{prescriptions.notes}</Table.Cell>
                      <Table.Cell className={myordersStyles.tableCell}>{prescriptions.uses}</Table.Cell>
                    </Table.Row>
                  </>
                ))
              ) : (
                <></>
              )
            ) : (
              <></>
            )}

          </Table.Body>
        </Table> 
        {patientName === '' ? (
          responseRecord.prescriptions !== null ? (
            <div></div>
          ) : (
            <div>Introduce el nombre de un paciente</div>
          )
        ) : (
          <div>{patientName} no tiene recetas o no existe</div>
        )}
    </>
  );
};

export default TablaMedicinas;