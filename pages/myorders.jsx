import Head from 'next/head'
import Layout from "../component/Layout"
import {Table, Checkbox, Pagination} from 'flowbite-react'
import fsPromises from 'fs/promises';
import path from 'path';
import TablaPedidos from "../component/TablaPedidos"

export async function getStaticProps() {
  const filePath = path.join('public/', 'pedidos.json');
  const jsonData = await fsPromises.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: data
  }
}

export default function Home(props) {


 const pedidos = props.pedidos;
 //const [pedidos] = useState([pedidosData]);

  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
        <div className='container mx-auto'>
          <TablaPedidos data={pedidos} rowsPerPage={10} />
        <div className='float-right'>        
  
        </div>     
         {/* <SampleContent/> */}
        </div>
        </Layout>
      </main>
    </>
  )
}

