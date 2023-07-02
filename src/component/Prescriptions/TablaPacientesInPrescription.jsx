import React from "react";
import {Table, Button } from 'flowbite-react'
import myordersStyles from "../../styles/Myorders.module.css"
import { HiPlusCircle } from "react-icons/hi"
import useCookie from "../../hooks/useCookie.js";
import useAutoSumbitAndFetchObject from "../../hooks/useAutoSumbitAndFetchObject";
import getTextCurrentLocale from "../../utils/getTextCurrentLocale";

const TablaPacientes = ({ props, handleSetNombrePaciente }) => {
  const [userTokenCookie, ] = useCookie('user_token')
  const [userEmailCookie, ] = useCookie('user_email')

  const [_, responsePatients] = useAutoSumbitAndFetchObject(
    // request values
    {
    "session_token" : userTokenCookie,
    "doctor_email"  : userEmailCookie,
    },
    // url
    props.apiEndpoint + "/api/list_assigned_doctors",
    // precheck
    (values) => {
      return values.session_token != null && values.doctor_email != null
    }
  )
  
  return (
    <div className="overflow-auto h-96">
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell> {getTextCurrentLocale("user_full_name")} </Table.HeadCell>
          <Table.HeadCell> {getTextCurrentLocale("user_phone")} </Table.HeadCell>
          <Table.HeadCell> {getTextCurrentLocale("user_email")} </Table.HeadCell>
          <Table.HeadCell> {getTextCurrentLocale("add")} </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {responsePatients != "none" && responsePatients.result == "ok" && responsePatients.patients.map((patient) =>
            <Table.Row className={myordersStyles.tableRow}>
              <Table.Cell className={myordersStyles.tableCell}>{patient.user_full_name}</Table.Cell>
              <Table.Cell className={myordersStyles.tableCell}>{patient.user_phone}</Table.Cell>
              <Table.Cell className={myordersStyles.tableCell}>{patient.user_email}</Table.Cell>  
              <Table.Cell className={myordersStyles.tableCell}>
                <Button onClick={() => handleSetNombrePaciente(patient.user_full_name)} color='success' pill ><HiPlusCircle/></Button>
              </Table.Cell>                 
            </Table.Row>
          )}
        </Table.Body>
      </Table> 
    </div>
  );
};

export default TablaPacientes;