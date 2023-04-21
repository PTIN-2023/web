import Head from 'next/head'
import Layout from "../component/Layout"
import DataTable from 'react-data-table-component'

const columns = [
  {
	  name: 'Title',
	  selector: row => row.title,
  },
  {
	  name: 'Year',
	  selector: row => row.year,
  },
];

const data = [
  {
	  id: 1,
	  title: 'Beetlejuice',
	  year: '1988',
  },
  {
	  id: 2,
	  title: 'Ghostbusters',
	  year: '1984',
  },
]

function MyComponent() {
  return (
	<>
	<Head>
		<title>TransMedWebPTIN</title>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="icon" href="/favicon.ico" />
	</Head>
	<Layout navBarValue={setSearchValue}>
	  <DataTable
		columns={columns}
		data={data}
	  />
	</Layout>
	</>
  );
};

