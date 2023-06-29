import Head from 'next/head'
import Layout from "../component/Layout"
import getTextCurrentLocale from '../utils/getTextCurrentLocale'
import {useState} from "react";
import useCookie from '../hooks/useCookie';
import useAutoSumbitAndFetchObject from "../hooks/useAutoSumbitAndFetchObject";
import useSumbitAndFetch from "../hooks/useSumbitAndFetchObject";
import commonGetServerSideProps from '../utils/gen_common_props';
import inventoryStyles from "../styles/Inventory.module.css"
import myordersStyles from "../styles/Myorders.module.css"
import { Table, Button, Modal, Dropdown } from 'flowbite-react'
import usePrepareBodyRequest from '../hooks/usePrepareBodyRequest';

export async function getServerSideProps() {
  return await commonGetServerSideProps()
}


function DropdownCommand({onSelectedItem}) {
  const hehes = [
    "set_battery_10",
    "set_battery_5",
    "make_rain",
    "make_thunder",
    "make_high_temp",
    "make_low_temp",
    "make_unkown_climate",
    "explode_drone",
    "break_engine",
    "break_helix",
    "break_sensor",
    "unncomunicate",
    "put_obstacle",
    "lose_parcel",
    "cancel_betrayal",
    "noshow_betrayal",
    "impostor_betrayal"
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

function SendCommandModal ({ show, setShow, selectedDrone, selectedDroneHehe, sumbit}) {
  return (
    <Modal show={show} size="md" popup>
      <Modal.Header  onClose={() => setShow(false)}>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Send {selectedDroneHehe} to drone nº{selectedDrone}?
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

const CustomTable = ({ data, setShowModal, setSelectedDrone, setSelectedDroneHehe }) => {  
  return (
    <>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell> Drone id </Table.HeadCell>
            <Table.HeadCell> Status </Table.HeadCell>
            <Table.HeadCell> Minutes of autonomy </Table.HeadCell>
            <Table.HeadCell> Last maintenance date </Table.HeadCell>
            <Table.HeadCell>  </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          {data.map((entry) =>
            <Table.Row key={entry.medicine_identifier} className={inventoryStyles.tableRow}>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.id_dron}</Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.status_text}</Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.autonomy}</Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}>{entry.last_maintenance_date}</Table.Cell>
              <Table.Cell className={inventoryStyles.tableCell}>
                <DropdownCommand
                  onSelectedItem={(hehe) => {
                    setSelectedDrone(entry.id_dron)
                    setSelectedDroneHehe(hehe)
                    setShowModal(true)
                  }}
                />
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
  const [selectedDrone, setSelectedDrone] = useState(-1)
  const [selectedDroneHehe, setSelectedDroneHehe] = useState(-1)

  const [_, droneResponse] = useAutoSumbitAndFetchObject(
    // request values
    {
      "session_token" : userTokenCookie
    },
    // url
    props.apiEndpoint + "/api/drones_full_info",
    // precheck
    (values) => {
      return values.session_token != null
    }
  )

  const heheRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "id_dron" : selectedDrone,
    "hehe" : selectedDroneHehe
  })
  const [sumbitAndFetch,] = useSumbitAndFetch(
    heheRequest,
    props.apiEndpoint+"/api/send_drone_hehe"
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
      {droneResponse != 'none' && droneResponse.result == 'ok' &&
        <CustomTable 
          data={droneResponse.drones}
          setShowModal={setShowModal}
          setSelectedDrone={setSelectedDrone}
          setSelectedDroneHehe={setSelectedDroneHehe}
        />
      }
      <SendCommandModal
        show = {showModal}
        setShow = {setShowModal}
        selectedDrone = {selectedDrone}
        selectedDroneHehe = {selectedDroneHehe}
        sumbit = {() => {sumbitAndFetch()}}
      />
      </Layout>
    </main>
  </>)
}

