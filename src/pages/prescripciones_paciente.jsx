import Head from 'next/head'
import Layout from "../component/Layout"
import useCookie from "../hooks/useCookie";
import useAutoSumbitAndFetchObject from "../hooks/useAutoSumbitAndFetchObject";
import commonGetServerSideProps from '../utils/gen_common_props';
import inventoryStyles from "../styles/Inventory.module.css"
import { Table } from 'flowbite-react'

export async function getServerSideProps() {
  return await commonGetServerSideProps()
}

const CustomTableRow = ({ entry, props }) => {
  const [userTokenCookie,] = useCookie('user_token')

  const [_, response] = useAutoSumbitAndFetchObject(
    // request values
    {
      "session_token" : userTokenCookie,
    },
    // url
    props.apiEndpoint + "/api/get_meds_prescription",
    // precheck
    (values) => {
      return values.session_token != null
    }
  )

  return (
  <Table.Row className={inventoryStyles.tableRow}>
    <Table.Cell className={inventoryStyles.tableCell}>{entry.prescription_identifier}</Table.Cell>
    <Table.Cell className={inventoryStyles.tableCell}>
      <ul>
      {response != "none" && response.medicine_list && response.medicine_list.map((med) => 
        <li>{med.medicine_name} (med.quantitat)</li>
      )}
      </ul>
    </Table.Cell>
    <Table.Cell className={inventoryStyles.tableCell}>{entry.duration}</Table.Cell>
    <Table.Cell className={inventoryStyles.tableCell}>{entry.renewal}</Table.Cell>
    <Table.Cell className={inventoryStyles.tableCell}>{entry.last_used}</Table.Cell>
    <Table.Cell className={inventoryStyles.tableCell}>{entry.notes}</Table.Cell>
  </Table.Row>
  )
}

const CustomTable = ({ data, props }) => { 
  return (
    <>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell> Identifier </Table.HeadCell>
            <Table.HeadCell> Medicines </Table.HeadCell>
            <Table.HeadCell> Duration (days) </Table.HeadCell>
            <Table.HeadCell> Renewal (days) </Table.HeadCell>
            <Table.HeadCell> Last used </Table.HeadCell>
            <Table.HeadCell> Notes </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          {data.map((entry) =>
            <CustomTableRow
              key={entry.prescription_identifier}
              entry={entry}
              props={props}
            />
          )}
          </Table.Body>
        </Table>
    </>
  );
};

export default function Home(props) {
  const [userTokenCookie,] = useCookie('user_token')

  const [_, response] = useAutoSumbitAndFetchObject(
    // request values
    {
      "session_token" : userTokenCookie,
    },
    // url
    props.apiEndpoint + "/api/get_patient_prescription_history",
    // precheck
    (values) => {
      return values.session_token != null
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
        {response != 'none' && response.result == 'ok' &&
          <CustomTable 
            data={response.prescriptions}
            props={props}
          />
        }
      </Layout>
    </main>
  </>)
}