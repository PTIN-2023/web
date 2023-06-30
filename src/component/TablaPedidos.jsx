import React, { useState, useRef } from "react";
import useTable from "../hooks/useTable.js";
import TableFooter from "./TableFooter.jsx";
import {Table, Button, Modal, Dropdown, Card, Tooltip} from 'flowbite-react'
import myordersStyles from "../styles/Myorders.module.css"
import {HiOutlineArrowRight, HiOutlineRocketLauncher, HiTrash, HiOutlineExclamationCircle,HiOutlineInformationCircle} from "react-icons/hi"
import useCookie from "../hooks/useCookie.js";
import { getText } from "../utils/getTextCurrentLocale.js";
import TablaCompPaciente from "../component/TablaCompPaciente.jsx"



const TablaPedidos = ({ props, data, rowsPerPage, searchValue, setSearchValue }) => {
  //componente que renderiza la tabla con los pedidos
  //recibe data -> json de pedidos
  //rowsPerPage -> cuantas filas va a renderizar
  //searchValue -> el filtro en caso de que se active el componente MyOrdersSearch

  console.log(data.result)
  const [localeCookie, ] = useCookie('locale')
  const [modalContactarState, setModalContactarState] = useState(false);
  const [modalCancelarPedidoState, setModalCancelarPedidoState] = useState(false);
  const [modalDetallesState, setModalDetallesState] = useState(false);

  const [page, setPage] = useState(1);

  let slice, range
  //si la longitud del searchValue es > 0 y se hizo click en buscar, filtra el json de datos
  if(data.result == "success"){
    if(searchValue.value.length > 0 && searchValue.isCompleted){
      data.orders = data.orders.filter((pedido) => pedido.order_identifier.toLowerCase().includes(searchValue.value));  

    }
    
  }
  
  return (
    <>
        {data.result == "success" && <TablaCompPaciente props={props} data={data} slice={slice} rowsPerPage={rowsPerPage} range= {range} setPage={setPage} page={page}/>}
    </>
  );
};

export default TablaPedidos;