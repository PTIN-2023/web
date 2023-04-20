import Head from 'next/head'
import Layout from "../component/Layout"
import Table from "../component/Tabla_makeOrder"

export async function getStaticProps() {
  //función de nextjs que se encarga de cargar los datos pedidos.json (placeholder que después se cambiará por la API)
  const filePath = path.join('public/', 'medicamentos.json');
  const jsonData = await fsPromises.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: data
  }
}

export default function Home(props) {
 //recibe props: pedidos
 //searchValue es un estado que guarda el texto de busqueda del componente MyOrdersSearch
 //se declara aqui arriba para pasarlo a los hijos, actualizar el State y pasarlo a TablaPedidos
 const [searchValue, setSearchValue] = useState({value:"",isCompleted:false});
 const medicamentos = props.medicamentos;

  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/**le pasamos a Layout el valor del componente de la página que está renderizando (Layout se encarga de detectar en que pagina está) */}
        <Layout navBarValue={setSearchValue}>
        <div className={myordersStyles.mainContainer}>
          {/**TablaPedidos recibe cuantas filas va a renderizar, los datos y el valor para filtrar en caso d eque haya */}
          <Table data={medicamentos} rowsPerPage={10} searchValue={searchValue} setSearchValue={setSearchValue}/>
        </div>
        </Layout> 
      </main>
    </>
  )
}

