import React, { useState } from "react";
import {Table } from 'flowbite-react'
import myordersStyles from "../../styles/Myorders.module.css"
import useCookie from "../../hooks/useCookie.js";

const TablaMedicinas = ({ props }) => {
    
  const [patientName, setPatientName] = useState('');
  const [userTokenCookie, ] = useCookie('user_token');
  const [responseRecord, setResponseRecord] = useState('');

  const stringRequestRecipe = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "user_full_name"  : patientName,
  }) 

  const [sumbitAndFetch_record, response_record] = useSumbitAndFetchObject(
    stringRequestRecipe,
    props.apiEndpoint+"/api/get_patient_prescription_history",
  )

  useEffect(() => {
      if(userTokenCookie != null && patientName != '' )
        sumbitAndFetch_record();
  }, [patientName, stringRequestRecipe])

  useEffect(() => {
    if(response_record != "none"){
      setResponseRecord(JSON.parse(response_record))
    }
  }, [response_record])
   
  
  return (
    <>
        <input type="text" id="patientName" name="patientName" className={styles.inputNombre} onChange={(event) => setPatientName(event.target.value)}/>
        {patientName != '' ? (<h2>Recetas del paciente {patientName}: </h2>):<></>}
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
            
          {responseRecord != "none" ? (responseRecord.prescriptions.map((prescriptions, index) =>
            <>
                <Table.Row className={myordersStyles.tableRow}>
                  <Table.Cell className={myordersStyles.tableCell}> 
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell className={myordersStyles.tableCell}>
                    {prescriptions.medicine_list.map((medicines) =>
                      {medicines.identifier}
                    )}
                  </Table.Cell>
                  <Table.Cell className={myordersStyles.tableCell}> 
                    {prescriptions.duration}
                  </Table.Cell>
                  <Table.Cell className={myordersStyles.tableCell}> 
                    {prescriptions.notes}
                  </Table.Cell>
                  <Table.Cell className={myordersStyles.tableCell}> 
                    {prescriptions.uses}
                  </Table.Cell>
                </Table.Row>
            </>
          ))
          :
          <p>Intorduzca el nombre de un paciente</p> 
          }

          </Table.Body>
        </Table> 
    </>
  );
};

export default TablaMedicinas;