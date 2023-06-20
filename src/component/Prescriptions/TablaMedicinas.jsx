import React, { useState, useRef } from "react";
import useTable from "../../hooks/useTable.js";
import TableFooter from "../TableFooter.jsx";
import {Table, Button } from 'flowbite-react'
import myordersStyles from "../../styles/Myorders.module.css"
import {HiPlusCircle, HiCheckCircle} from "react-icons/hi"
import useCookie from "../../hooks/useCookie.js";

const Añadir = ({ onClick }) => {
    const [rotate, setRotate] = useState(false);
    const [showCheck, setShowCheck] = useState(false);

    const handleButtonClick = () => {
        setRotate(true);
        setTimeout(() => {
            setShowCheck(true);
        }, 300);
        onClick();
    };

    const iconContainerStyles = {
        transition: 'transform 0.3s ease-in-out',
        transform: rotate ? 'rotate(90deg)' : 'rotate(0)',
    };

    const checkCircleStyles = {
        transform: 'rotate(0)',
    };


    return (
      
        <Button onClick={handleButtonClick}>
            <div style={iconContainerStyles}>
                {!showCheck && <HiPlusCircle />}
            </div>
            <div>
                {showCheck && <HiCheckCircle style={checkCircleStyles} />}
            </div>
        </Button>
        
    );
};

const TablaMedicinas = ({ data, rowsPerPage, searchValue, setSearchValue, onClick }) => {
    //componente que renderiza la tabla con los pedidos
    //recibe data -> json de pedidos

    const [page, setPage] = useState(1);

    //si la longitud del searchValue es > 0 y se hizo click en buscar, filtra el json de datos
    if(searchValue.value.length > 0 && searchValue.isCompleted){
        data = data.medicines.filter((pedido) => pedido.id.toLowerCase().includes(searchValue.value));  

    }else data = data.medicines;
    
    var { slice, range } = useTable(data, page, rowsPerPage);
    

  return (
    <>

        <Table hoverable={true}>
          <Table.Head>
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
                    {order.medicine_name}
                  </Table.Cell>
                  <Table.Cell className={myordersStyles.tableCell}>
                    <Añadir onClick={() => onClick(order.medicine_name)}/>
                  </Table.Cell>
                </Table.Row>
            </>
          )}

          </Table.Body>
        </Table> 
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default TablaMedicinas;