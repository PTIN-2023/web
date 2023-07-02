import React, { useState, useRef } from "react";
import useTable from "../../hooks/useTable.js";
import TableFooter from "../TableFooter.jsx";
import {Table, Button } from 'flowbite-react'
import myordersStyles from "../../styles/Myorders.module.css"
import {HiPlus, HiMinus} from "react-icons/hi"
import CustomTableNavigation from "../common/CustomTableNavigation.jsx";

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

const TablaMedicinas = ({ data, medicamentos, handlesetMedicamentos, numPages, page, setPage}) => {    

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
          {data && data.map((entry) =>
            <>
                <Table.Row className={myordersStyles.tableRow}>
                  <Table.Cell className={myordersStyles.tableCell}> 
                    {entry.medicine_identifier}
                  </Table.Cell>
                  <Table.Cell className={myordersStyles.tableCell}> 
                    {entry.medicine_name}
                  </Table.Cell>
                  <Table.Cell className={myordersStyles.tableCell}>
                    <Añadir medicamentos={medicamentos} handlesetMedicamentos={handlesetMedicamentos} idMedicamento={entry.medicine_identifier} />
                  </Table.Cell>
                </Table.Row>
            </>
          )}

          </Table.Body>
        </Table> 
        <br/>           
        <CustomTableNavigation 
          numPages={numPages} 
          currentPage={page} 
          setPage={setPage} 
        />
    </div>
  );
};

export default TablaMedicinas;