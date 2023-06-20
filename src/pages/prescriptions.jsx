import Head from 'next/head'
import Layout from "../component/Layout"
import MakePrescriptions from "../component/Prescriptions/Prescription"
import {useState} from 'react'

export default function Home() {

  const [searchValue, setSearchValue] = useState({value:"",isCompleted:false});

  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout navBarValue={setSearchValue}>
            <MakePrescriptions searchValue={searchValue} setSearchValue={setSearchValue}/>
        </Layout>
      </main>
    </>
  )
}