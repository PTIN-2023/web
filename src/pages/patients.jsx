import Head from 'next/head'
import Layout from "../component/Layout"
import getTextCurrentLocale from '../utils/getTextCurrentLocale'
import {useState} from "react";
import useCookie from '../hooks/useCookie';
import useAutoSumbitAndFetchObject from "../hooks/useAutoSumbitAndFetchObject";
import commonGetServerSideProps from '../utils/gen_common_props';
import inventoryStyles from "../styles/Inventory.module.css"
import CustomTableNavigation from '../component/common/CustomTableNavigation';
import { Table } from 'flowbite-react'

export async function getServerSideProps() {
  return await commonGetServerSideProps()
}
const CustomTable = ({ data }) => {  
  return (
    <>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell> {getTextCurrentLocale("user_full_name")} </Table.HeadCell>
            <Table.HeadCell> {getTextCurrentLocale("user_email")} </Table.HeadCell>
            <Table.HeadCell> {getTextCurrentLocale("user_phone")} </Table.HeadCell>
            <Table.HeadCell> {getTextCurrentLocale("user_city")} </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          {data.map((entry) =>
            <Table.Row key={entry.medicine_identifier} className={inventoryStyles.tableRow}>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.user_full_name}</Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.user_email}</Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.user_phone}</Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.user_city}</Table.Cell>
            </Table.Row>
          )}
          </Table.Body>
        </Table>
    </>
  );
};

export default function Home(props) {
  const [userTokenCookie, ] = useCookie('user_token')
  const [userEmailCookie, ] = useCookie('user_email')

  const [_, patientsResponse] = useAutoSumbitAndFetchObject(
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


  // Html
  return (<>
    <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <Layout props={props}>
        {patientsResponse != 'none' && patientsResponse.result == 'ok' &&
          <CustomTable 
            data={patientsResponse.patients}
          />
        }
      </Layout>
    </main>
  </>)
}
