import React, { useState, useRef } from "react";
import useTable from "../../hooks/useTable.js";
import TableFooter from "../TableFooter.jsx";
import {Table, Button } from 'flowbite-react'
import myordersStyles from "../../styles/Myorders.module.css"
import {HiPlusCircle, HiCheckCircle} from "react-icons/hi"
import useCookie from "../../hooks/useCookie.js";

const TablaMedicinas = ({ data, rowsPerPage }) => {
    //componente que renderiza la tabla con los pedidos
    //recibe data -> json de pedidos

    const [page, setPage] = useState(1);
    
    //var { slice, range } = useTable(data.medicines, page, rowsPerPage);
    

  return (
    <>

        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>
              Nombre Paciente
            </Table.HeadCell>
            <Table.HeadCell>
              Fecha
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {/*
          {slice.map((order) =>
            <>
                <Table.Row className={myordersStyles.tableRow}>
                  <Table.Cell className={myordersStyles.tableCell}> 
                  </Table.Cell>
                  <Table.Cell className={myordersStyles.tableCell}>
                  </Table.Cell>
                </Table.Row>
            </>
          )}*/}

          </Table.Body>
        </Table> 
        {/*<TableFooter range={range} slice={slice} setPage={setPage} page={page} />*/}
    </>
  );
};

export default TablaMedicinas;