import React, { useState } from "react";
import useTable from "../src/hooks/useTable.js";
import TableFooter from "./TableFooter.jsx";
import {Table, Checkbox, Pagination} from 'flowbite-react'


const TablaPedidos = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
            <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell className="!p-4">
              <Checkbox />
            </Table.HeadCell>
            <Table.HeadCell>
              Medicamento
            </Table.HeadCell>
            <Table.HeadCell>
              Fecha de compra
            </Table.HeadCell>
            <Table.HeadCell>
              Estado
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          {slice.map((pedido) =>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="!p-4">
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {pedido.nombre}
                  </Table.Cell>
                  <Table.Cell>
                    {pedido.fecha_compra}
                  </Table.Cell>
                  <Table.Cell>
                    {pedido.estado}
                  </Table.Cell>
                  </Table.Row>
          )}

          </Table.Body>
        </Table> 

        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default TablaPedidos;