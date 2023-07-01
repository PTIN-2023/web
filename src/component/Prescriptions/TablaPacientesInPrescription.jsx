import React, { useState, useRef, useEffect } from "react";
import {Table, Button } from 'flowbite-react'
import myordersStyles from "../../styles/Myorders.module.css"
import { HiPlusCircle } from "react-icons/hi"
import useCookie from "../../hooks/useCookie.js";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";

const TablaPacientes = ({ props, nombrePaciente, handleSetNombrePaciente }) => {
    //componente que renderiza la tabla con los pedidos
    //recibe data -> json de pedidos

    const [userTokenCookie, ] = useCookie('user_token')
    const [responsePatients, setResponsePatients] = useState("none")
    //var { slice, range } = useTable(data.medicines, page, rowsPerPage);
    const stringRequest = usePrepareBodyRequest({
      "session_token" : userTokenCookie,
    })
  
    var [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
      stringRequest,
      props.apiEndpoint+"/api/manager_list_doctors"
    )

    useEffect(() => {
      if(userTokenCookie != null){
        sumbitAndFetch()
      }
    }, [stringRequest]);

    useEffect(() => {
      if(stringResponse != "none"){
          setResponsePatients(JSON.parse(stringResponse))
      }
    }, [stringResponse]);
    


  return (
    <>

        <div className="overflow-auto h-96">
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>
                Nombre Paciente
              </Table.HeadCell>
              <Table.HeadCell>
                Teléfono
              </Table.HeadCell>
              <Table.HeadCell>
                Correo
              </Table.HeadCell>
              <Table.HeadCell>
                Añadir
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {responsePatients != "none" ? (responsePatients.patients.map((patient) => 
              <>
                  <Table.Row className={myordersStyles.tableRow}>
                    <Table.Cell className={myordersStyles.tableCell}> 
                      {patient.user_full_name}
                    </Table.Cell>
                    <Table.Cell className={myordersStyles.tableCell}>
                      {patient.user_phone}
                    </Table.Cell>
                    <Table.Cell className={myordersStyles.tableCell}>
                      {patient.user_email}
                    </Table.Cell>  
                    <Table.Cell className={myordersStyles.tableCell}>
                    <Button onClick={() => handleSetNombrePaciente(patient.user_full_name)} color='success' pill ><HiPlusCircle/></Button>
                    </Table.Cell>                 
                  </Table.Row>
              </>))
              : <></>  
            }

            </Table.Body>
          </Table> 
        </div>
        {/*<TableFooter range={range} slice={slice} setPage={setPage} page={page} />*/}
    </>
  );
};

export default TablaPacientes;