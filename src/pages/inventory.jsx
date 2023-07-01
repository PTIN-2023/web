import Head from 'next/head'
import Layout from "../component/Layout"
import getTextCurrentLocale from '../utils/getTextCurrentLocale'
import {useState} from "react";
import useCookie from '../hooks/useCookie';
import useAutoSumbitAndFetchObject from "../hooks/useAutoSumbitAndFetchObject";
import commonGetServerSideProps from '../utils/gen_common_props';
import inventoryStyles from "../styles/Inventory.module.css"
import myordersStyles from "../styles/Myorders.module.css"
import { Table } from 'flowbite-react'

export async function getServerSideProps() {
  return await commonGetServerSideProps()
}

const CustomTableNavigation = ({ numPages, currentPage, setPage }) => {
  const updatePage = (currentPage, action) => {
    if(0 < currentPage + action && currentPage + action <= numPages)
      setPage(currentPage + action)
  }

  const classPageNum = (page) => {
    if(page == currentPage)
      return myordersStyles.tablePaginationNumberCurrent
    else
      return myordersStyles.tablePaginationNumber
  }

  return(
    <nav>
      <ul className={myordersStyles.tablePaginationContainer}>
        <li>
          <button onClick={() => updatePage(currentPage, -1)} className={myordersStyles.tablePaginationPrevious}>{getTextCurrentLocale('previous')}</button>
        </li>
        {[...Array(numPages).keys()].map((page) => (
          <li key={page}>
            <button 
              onClick={() => setPage(page+1)} 
              className={classPageNum(page+1)}>{page+1}
            </button>
          </li>
        ))}
        <li>
          <button onClick={() => updatePage(currentPage, 1)} className={myordersStyles.tablePaginationNext}>{getTextCurrentLocale('next')}</button>
        </li>
      </ul>
    </nav>
  )
}

const CustomTable = ({ data }) => {
  const getCellClass = (cantidad) => {
    if (cantidad < 1000) {
      return "cantidadSoldOut";
    } 
    if (cantidad < 5000) {
      return "cantidadWarning";
    }
    return "cantidadAcceptable";
  };
  
  return (
    <>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell> Image </Table.HeadCell>
            <Table.HeadCell> Name </Table.HeadCell>
            <Table.HeadCell> Excipient(s) </Table.HeadCell>
            <Table.HeadCell> Form </Table.HeadCell>
            <Table.HeadCell> Type of administration </Table.HeadCell>
            <Table.HeadCell> Quantity available </Table.HeadCell>
            <Table.HeadCell> Amount sold </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          {data.map((entry) =>
            <Table.Row key={entry.medicine_identifier} className={inventoryStyles.tableRow}>
              <Table.Cell className={inventoryStyles.tableCell}><img src={entry.medicine_image_url} width="500" height="600"></img></Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.medicine_name}</Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}>
                <ul>
                {entry.excipients.map((excipient) => 
                  <li>{excipient}</li>
                )}
                </ul>
              </Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.form}</Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.type_of_administration}</Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}><span className={inventoryStyles[getCellClass(entry.quantity_available)]}>{entry.quantity_available}</span></Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.amount_sold}</Table.Cell>
            </Table.Row>
          )}
          </Table.Body>
        </Table>
    </>
  );
};

export default function Home(props) {
  // State
  const rowsPerPage = 6;
  const [userTokenCookie, ] = useCookie('user_token')
  const [page, setPage] = useState('1');  
  const [numPages, setNumPages] = useState(1);  

  // Requests
  useAutoSumbitAndFetchObject(
    // request values
    {
      "session_token" : userTokenCookie,
      "orders_per_page" : rowsPerPage
    },
    // url
    props.apiEndpoint + "/api/list_inventory_meds_num",
    // precheck
    (values) => {
      return values.session_token != null
    },
    // Evaluate response
    (res) => {
      if(res && res.result == 'ok') {
        setNumPages(res.num_pages)
      }
    }
  )

  const [_, inventoryResponse] = useAutoSumbitAndFetchObject(
    // request values
    {
      "session_token" : userTokenCookie,
      "meds_per_page" : rowsPerPage,
      "page" : page
    },
    // url
    props.apiEndpoint + "/api/list_inventory_meds",
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
        {inventoryResponse != 'none' && inventoryResponse.result == 'ok' &&
          <CustomTable 
            data={inventoryResponse.medicines}
          />
        }
        <CustomTableNavigation 
          numPages={numPages} 
          currentPage={page} 
          setPage={setPage} 
        />
      </Layout>
    </main>
  </>)
}

