import Head from 'next/head'
import Layout from "../component/Layout"
import getTextCurrentLocale from '../utils/getTextCurrentLocale'
import {useEffect, useState} from "react";
import useCookie from '../hooks/useCookie';
import useAutoSumbitAndFetchObject from "../hooks/useAutoSumbitAndFetchObject";
import useSumbitAndFetch from "../hooks/useSumbitAndFetchObject";
import commonGetServerSideProps from '../utils/gen_common_props';
import inventoryStyles from "../styles/Inventory.module.css"
import { Table, Button, Modal, Dropdown } from 'flowbite-react'
import usePrepareBodyRequest from '../hooks/usePrepareBodyRequest';
import { useRouter } from 'next/router';

export async function getServerSideProps() {
  return await commonGetServerSideProps()
}


function DropdownCommand({onSelectedItem}) {
  const hehes = [
    "set_battery_10",
    "set_battery_5",
    "breakdown",
    "uncommunicate"
  ]

  return (
    <Dropdown label="Send command">
      { hehes.map((hehe) =>
        <Dropdown.Item key={hehe} onClick={()=>onSelectedItem(hehe)}>
          {hehe}
        </Dropdown.Item>
      )}
    </Dropdown>
  )
}

function SendCommandModal ({ show, setShow, selectedCar, selectedCarHehe, sumbit}) {
  return (
    <Modal show={show} size="md" popup>
      <Modal.Header  onClose={() => setShow(false)}>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Send {selectedCarHehe} to car nº{selectedCar}?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => {sumbit(); setShow(false);}}>
              Send command
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
};

const CustomTable = ({ data, setShowModal, setSelectedCar, setSelectedCarHehe }) => {  
  const router = useRouter()

  return (
    <>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell> Car id </Table.HeadCell>
            <Table.HeadCell> Status </Table.HeadCell>
            <Table.HeadCell> Minutes of autonomy </Table.HeadCell>
            <Table.HeadCell> Last maintenance date </Table.HeadCell>
            {/*<Table.HeadCell>  </Table.HeadCell>*/}
            <Table.HeadCell>  </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          {data.map((entry) =>
            <Table.Row key={entry.medicine_identifier} className={inventoryStyles.tableRow}>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.id_car}</Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.status_text}</Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.autonomy}</Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.last_maintenance_date}</Table.Cell>
              {/*<Table.Cell className={inventoryStyles.tableCell}>
                <DropdownCommand
                  onSelectedItem={(hehe) => {
                    setSelectedCar(entry.id_car)
                    setSelectedCarHehe(hehe)
                    setShowModal(true)
                  }}
                />
              </Table.Cell>*/}
              <Table.Cell className={inventoryStyles.tableCell}>
                <Button
                  onClick={() => {
                    window.location.href = '/map_global?locationLatitude='+entry.location_act.latitude+'&locationLongitude='+entry.location_act.longitude
                  }}
                >
                  See on map
                </Button>
              </Table.Cell>
            </Table.Row>
          )}
          </Table.Body>
        </Table>
    </>
  );
};

export default function Home(props) {
  // State
  const [userTokenCookie, ] = useCookie('user_token')
  const [showModal, setShowModal] = useState(false)
  const [selectedCar, setSelectedCar] = useState(-1)
  const [selectedCarHehe, setSelectedCarHehe] = useState(-1)

  const [sumbitStatusFullInfo, carResponse] = useAutoSumbitAndFetchObject(
    // request values
    {
      "session_token" : userTokenCookie
    },
    // url
    props.apiEndpoint + "/api/cars_full_info",
    // precheck
    (values) => {
      return values.session_token != null
    }
  )

  useEffect(() => {
    const interval = setInterval(sumbitStatusFullInfo, 5*1000)
    return () => { clearInterval(interval); };
  })

  const heheRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "id_car" : selectedCar,
    "hehe" : selectedCarHehe
  })
  const [sumbitAndFetch,] = useSumbitAndFetch(
    heheRequest,
    props.apiEndpoint+"/api/send_car_hehe"
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
      {carResponse != 'none' && carResponse.result == 'ok' &&
        <CustomTable 
          data={carResponse.cars}
          setShowModal={setShowModal}
          setSelectedCar={setSelectedCar}
          setSelectedCarHehe={setSelectedCarHehe}
        />
      }
      <SendCommandModal
        show = {showModal}
        setShow = {setShowModal}
        selectedCar = {selectedCar}
        selectedCarHehe = {selectedCarHehe}
        sumbit = {() => {sumbitAndFetch()}}
      />
      </Layout>
    </main>
  </>)
}

