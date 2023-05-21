import React from "react";
import { Table } from 'flowbite-react';
import useTable from "../../hooks/useTable.js";
import TableFooter from "../TableFooter.jsx";
import style from "../../styles/Makeorder.module.css";
import { useState, useEffect } from "react";
import * as env_config from "../../utils/env_config"
import useCookie from '../../hooks/useCookie';
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest.js";
import useSumbitAndFetchObject from "../../hooks/useSumbitAndFetchObject.js";

export async function getServerSideProps() {
    const isLocal           = env_config.isLocal();
    const apiEndpoint       = String(          env_config.getApiEndpoint());
    const locationName      = String(isLocal ? env_config.getLocationName()      : "N/A");
    const locationLatitude  = String(isLocal ? env_config.getLocationLatitude()  : "N/A");
    const locationLongitude = String(isLocal ? env_config.getLocationLongitude() : "N/A");
    const mapBoxToken       = String(          env_config.getTokenMapBox());
    const googleToken       = String(          env_config.getTokenGoogleSignIn());
  
    return {
      props: { 
        isLocal,
        apiEndpoint,
        locationName,
        locationLatitude,
        locationLongitude,
        mapBoxToken,
        googleToken
      }
    }
}

function NotificationsPending (props) {

    const [userTokenCookie, ] = useCookie('user_token')
    const [rowsPerPage, setrowsPerPage] = useState('10');
    const [page, setPage] = useState('1');
    
    const stringRequest = usePrepareBodyRequest({
        "session_token" : 'jondoe2@example.com',
        "confirmations_per_page" : rowsPerPage,
        "page" : page
    })

    const [sumbitAndFetch, stringResponse] = useSumbitAndFetchObject(
        stringRequest,
        "http://localhost:3000/api/list_doctor_approved_confirmations"
    )

    useEffect(() => {
        sumbitAndFetch();
    }, [stringResponse])

    


    return (
        <div>
            <>
                <TableFooter range={stringResponse.orders.length} slice={stringResponse.orders} setPage={setPage} page={page} />
                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell>Paciente</Table.HeadCell>
                        <Table.HeadCell>Medicamentos</Table.HeadCell>
                        <Table.HeadCell>Cantidad</Table.HeadCell>
                        <Table.HeadCell>ID orden</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                    {stringResponse.orders.map((notification) =>
                        <>
                            <Table.Row className={style.tableRow}>
                                <Table.Cell className={style.tableCell}>{notification.paciente}</Table.Cell>
                                <Table.Cell className={style.tableCell}>{notification.medicamento}</Table.Cell>
                                <Table.Cell className={style.tableCell}>{notification.cantidad}</Table.Cell>
                                <Table.Cell className={style.tableCell}>{notification.id_orden}</Table.Cell>
                            </Table.Row>
                        </>
                    )}
                    </Table.Body>
                </Table>
                <br></br>
            </>
            
        </div>
        
    );  
}

export default NotificationsPending;