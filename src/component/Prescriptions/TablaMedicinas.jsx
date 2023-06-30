import React, { useState, useRef } from "react";
import useTable from "../../hooks/useTable.js";
import TableFooter from "../TableFooter.jsx";
import {Table, Button } from 'flowbite-react'
import myordersStyles from "../../styles/Myorders.module.css"
import {HiPlus, HiMinus} from "react-icons/hi"

const Añadir = ({ medicamentos, handlesetMedicamentos, idMedicamento }) => {
    
    const buscarYActualizarMedicamentoAñadir = (idMedicamento) => {
      const medicamentoEncontrado = medicamentos.find((medicamento) => medicamento.idMedicamento === idMedicamento);
    
      if (medicamentoEncontrado) {
        const medicamentosActualizados = medicamentos.map((medicamento) => {
          if (medicamento === medicamentoEncontrado) {
            return {
              ...medicamento,
              cantidad: medicamento.cantidad + 1,
            };
          }
          return medicamento;
        });
    
        handlesetMedicamentos(medicamentosActualizados);
      } else {
        const nuevoMedicamento = {
          idMedicamento: idMedicamento,
          cantidad: 1,
        };
    
        handlesetMedicamentos([...medicamentos, nuevoMedicamento]);
      }
    };
    
    const buscarYActualizarMedicamentoBorrar = (idMedicamento) => {
      const medicamentoEncontrado = medicamentos.find((medicamento) => medicamento.idMedicamento === idMedicamento);
    
      if (medicamentoEncontrado) {
        const medicamentosActualizados = medicamentos.map((medicamento) => {
          if (medicamento === medicamentoEncontrado) {
            const nuevaCantidad = medicamento.cantidad - 1;
            if (nuevaCantidad === 0) {
              return null; // Eliminar el medicamento del array
            }
            return {
              ...medicamento,
              cantidad: nuevaCantidad,
            };
          }
          return medicamento;
        }).filter(Boolean); // Filtrar elementos nulos (medicamentos eliminados)
    
        handlesetMedicamentos(medicamentosActualizados);
      }
    };

    const handleButtonClickAñadir = () => {
        buscarYActualizarMedicamentoAñadir(idMedicamento);
    };

    const handleButtonClickBorrar = () => {
      buscarYActualizarMedicamentoBorrar(idMedicamento);
    };
    
    return (
      <div style={{ display: 'flex' }}>
        <Button 
          onClick={handleButtonClickAñadir}
          color="success"
          style={{ marginRight: '10px' }}
          pill
          size="sm"
        >
          <HiPlus/>
        </Button>
        <Button 
          onClick={handleButtonClickBorrar}
          color="failure"
          pill
          size="sm"
        >
           <HiMinus/>
        </Button>
      </div>
        
    );
};

const TablaMedicinas = ({ data, rowsPerPage, medicamentos, handlesetMedicamentos }) => {
    //componente que renderiza la tabla con los pedidos
    //recibe data -> json de pedidos

    const [page, setPage] = useState(1);
    data = data.medicines;
    
    var { slice, range } = useTable(data, page, rowsPerPage);
    

  return (
    <div>

        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>
              Id Medicamento
            </Table.HeadCell>
            <Table.HeadCell>
              Nombre Medicamento
            </Table.HeadCell>
            <Table.HeadCell>
              Accion
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          {data && slice.map((order) =>
            <>
                <Table.Row className={myordersStyles.tableRow}>
                  <Table.Cell className={myordersStyles.tableCell}> 
                    {order.medicine_identifier}
                  </Table.Cell>
                  <Table.Cell className={myordersStyles.tableCell}> 
                    {order.medicine_name}
                  </Table.Cell>
                  <Table.Cell className={myordersStyles.tableCell}>
                    <Añadir medicamentos={medicamentos} handlesetMedicamentos={handlesetMedicamentos} idMedicamento={order.medicine_identifier} />
                  </Table.Cell>
                </Table.Row>
            </>
          )}

          </Table.Body>
        </Table> 
        <br/>
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </div>
  );
};

export default TablaMedicinas;