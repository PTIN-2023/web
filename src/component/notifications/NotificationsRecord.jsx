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
    const apiEndpoint = String(env_config.getApiEndpoint());
  
    return {
      props: { 
        apiEndpoint,
      }
    }
}

const calculateRange = (orders, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(orders.length / rowsPerPage);
    let i = 1;
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
};

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

    
    const orders = stringResponse.orders ? stringResponse.orders.map(order => {
        const { order_identifier, date, patient_fullname, approved } = order;
        return {
          orderIdentifier: order_identifier,
          date,
          patientFullName: patient_fullname,
          approved
        };
    }) : [];

    const range = calculateRange(orders, rowsPerPage);

    return (
        <div>
            <>
                <TableFooter range={range} slice={orders} setPage={setPage} page={page} />
                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell>Id orden</Table.HeadCell>
                        <Table.HeadCell>Paciente</Table.HeadCell>
                        <Table.HeadCell>Fecha</Table.HeadCell>
                        <Table.HeadCell>Accion</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                    
                    {orders.map(notification =>
                        <>
                            <Table.Row className={style.tableRow}>
                                <Table.Cell className={style.tableCell}>{notification.orderIdentifier}</Table.Cell>
                                <Table.Cell className={style.tableCell}>{notification.patientFullName}</Table.Cell>
                                <Table.Cell className={style.tableCell}>{notification.date}</Table.Cell>
                                <Table.Cell className={style.tableCell}>{notification.approved}</Table.Cell>
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