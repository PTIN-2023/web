import React, { Component } from 'react'
import '../styles/MakeOrder.module.css'
import Head from 'next/head'
import Layout from "../component/Layout"
import data from "../public/medicamentos.json"
import Table from "../component/TablaMakeorder"
import myordersStyles from "../styles/Myorders.module.css"


function Home() {
	const getHeadings = () => {
		return Object.keys(data[0]);
	}

	return (
		<>
			<Head>
				<title>TransMedWebPTIN</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Layout>
				<div className="Tabla">
					<Table theadData={getHeadings()} tbodyData={data} />
				</div>
				</Layout>
			</main>
		</>
	);
}

export default Home;

