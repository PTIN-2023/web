import Head from 'next/head'
import Layout from "../component/Layout"
import useCookie from "../hooks/useCookie";
import useAutoSumbitAndFetchObject from "../hooks/useAutoSumbitAndFetchObject";
import { HiDownload } from "react-icons/hi"
import commonGetServerSideProps from '../utils/gen_common_props';
import getTextCurrentLocale from '../utils/getTextCurrentLocale';
import createPDF from '../utils/createPDF';
import download from 'downloadjs';
import inventoryStyles from "../styles/Inventory.module.css"
import { Table } from 'flowbite-react'

export async function getServerSideProps() {
  return await commonGetServerSideProps()
}

const handleDownloadRecipie = (response, entry, props) => {
  const medicineList = response.medicine_list.map((med) => ({
    idMedicamento: med.medicine_identifier,
    cantidad: med.quantitat,
    medicineName: med.medicine_name
  }));

  console.log("LISTA MEDICINAS: ");
  console.log(medicineList);

  createPDF("NombrePaciente", medicineList, entry.duration, entry.notes, entry.renewal, entry.prescription_identifier, props)
    .then((pdfBytes) => {
      download(pdfBytes, "Receta.pdf", "application/pdf");
    });
}

const CustomTableRow = ({ entry, props }) => {
  const [userTokenCookie,] = useCookie('user_token')

  const [_, response] = useAutoSumbitAndFetchObject(
    // request values
    {
      "session_token": userTokenCookie,
      "prescription_identifier": entry.prescription_identifier
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
            <li>{med.medicine_name} ({med.quantitat})</li>
          )}
        </ul>
      </Table.Cell>
      <Table.Cell className={inventoryStyles.tableCell}>{entry.duration}</Table.Cell>
      <Table.Cell className={inventoryStyles.tableCell}>{entry.renewal}</Table.Cell>
      <Table.Cell className={inventoryStyles.tableCell}>{entry.last_used}</Table.Cell>
      <Table.Cell className={inventoryStyles.tableCell}>
        <HiDownload
          size={20}
          style={{ cursor: 'pointer' }}
          onClick={() => handleDownloadRecipie(response, entry, props)}
        />
      </Table.Cell>
    </Table.Row>
  )
}

const CustomTable = ({ data, props }) => {
  return (
    <>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell> {getTextCurrentLocale('identifier')} </Table.HeadCell>
          <Table.HeadCell> {getTextCurrentLocale('medicines')} </Table.HeadCell>
          <Table.HeadCell> {getTextCurrentLocale('duration')} </Table.HeadCell>
          <Table.HeadCell> {getTextCurrentLocale('renewal')} </Table.HeadCell>
          <Table.HeadCell> {getTextCurrentLocale('last_used')} </Table.HeadCell>
          <Table.HeadCell> {getTextCurrentLocale('check_recipie')} </Table.HeadCell>
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
      "session_token": userTokenCookie,
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