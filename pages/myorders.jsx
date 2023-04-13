import Head from 'next/head'
import Layout from "../component/Layout"
import {Table, Checkbox, Pagination} from 'flowbite-react'
import fsPromises from 'fs/promises';
import path from 'path';
import TablaPedidos from "../component/TablaPedidos"
import myordersStyles from "../styles/Myorders.module.css"
import {useState} from "react";

export async function getStaticProps() {
  const filePath = path.join('public/', 'pedidos.json');
  const jsonData = await fsPromises.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: data
  }
}

export default function Home(props) {

 const [searchValue, setSearchValue] = useState({value:"",isCompleted:false});
 const pedidos = props.pedidos;

  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout navBarValue={setSearchValue}>
        <div className={myordersStyles.mainContainer}>
          <TablaPedidos data={pedidos} rowsPerPage={10} searchValue={searchValue} setSearchValue={setSearchValue}/>
        </div>
        </Layout> 
      </main>
    </>
  )
}

