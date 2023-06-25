import statsStyles from "../styles/stats.module.css"
import {Card} from "flowbite-react";
import { PieChart, LineChart, Pie, Legend, Tooltip, BarChart, ResponsiveContainer, Line, Area, Bar, XAxis, YAxis, CartesianGrid, } from 'recharts';
import useCookie from "../hooks/useCookie.js";
import { getText } from "../utils/getTextCurrentLocale.js";

const StatsContainer = ({data}) => {
  const [localeCookie, ] = useCookie('local');

  console.log(data)
  console.log(data.accounts_stat)
  // return(
  //     <div className={statsStyles.mainContainer}>
  //     <div className={statsStyles.gridItem}>
  //       <Card>
  //         <p className={statsStyles.gridHeader}>{getText("stats_accountTypes_header",localeCookie)}: </p>
  //         <p className={statsStyles.gridHead}>{getText("stats_accountTypes_patient",localeCookie)} : {data.accounts_stat.accounts_stat_query[0].value}</p>
  //         <p className={statsStyles.gridHead}>{getText("stats_accountTypes_doctor", localeCookie)}: {data.accounts_stat.accounts_stat_query[1].value}</p>
  //         <p className={statsStyles.gridHead}>{getText("stats_accountTypes_manager",localeCookie)}: {data.accounts_stat.accounts_stat_query[2].value}</p>
  //         <ResponsiveContainer width={200} height={200}>
  //           <PieChart width={200} height={200} >
  //             <Pie dataKey="value" data={data.accounts_stat.accounts_stat_query} cx={100} cy={100} innerRadius={40} outerRadius={80} fill="#3F83F8" />
  //             <Tooltip />
  //           </PieChart>
  //         </ResponsiveContainer>
  //       </Card>
  //     </div>
  //     <div className={statsStyles.gridItemExtend}>
  //       <Card className={statsStyles.cardInside}>
  //         <p className={statsStyles.gridHeader}>{getText("stats_yearOrders_header",localeCookie)}</p>
  //         <ResponsiveContainer width={500} height={300}>
  //           <BarChart
  //             width={500}
  //             height={300}
  //             data={data.year_orders.year_orders_query}
  //             margin={{
  //               top: 5,
  //               right: 30,
  //               left: 20,
  //               bottom: 5,
  //             }}
  //           >
  //             <CartesianGrid strokeDasharray="3 3" />
  //             <XAxis dataKey="name" />
  //             <YAxis />
  //             <Tooltip />
  //             <Legend />
  //             <Bar dataKey="maximo" fill="#3F83F8" />

  //           </BarChart>
  //         </ResponsiveContainer>
  //       </Card>
  //     </div>
  //     <div className={statsStyles.gridItem}>
  //       <Card className={statsStyles.cardInside}>
  //         <p className={statsStyles.gridHeader}>{getText("stats_topSeller_header",localeCookie)}</p>
  //         <p className={statsStyles.gridHead}>{data.topSeller_cities.topSeller_cities_query[0].name}: {data.topSeller_cities.topSeller_cities_query[0].value}</p>
  //         <p className={statsStyles.gridHead}>{data.topSeller_cities.topSeller_cities_query[1].name}: {data.topSeller_cities.topSeller_cities_query[1].value}</p>
  //         <p className={statsStyles.gridHead}>{data.topSeller_cities.topSeller_cities_query[2].name}: {data.topSeller_cities.topSeller_cities_query[2].value}</p>
  //         <ResponsiveContainer  width={200} height={150}>
  //           <PieChart width={200} height={200}>
  //             <Pie dataKey="value" data={data.topSeller_cities.topSeller_cities_query} cx={110} cy={70} fill="#42389D" />
  //             <Tooltip />
  //           </PieChart>
  //         </ResponsiveContainer>
  //       </Card>
  //     </div>
  //     <div className={statsStyles.gridItemExtend}>
  //       <Card className={statsStyles.cardInside}>
  //         <p className={statsStyles.gridHeader}>{getText("stats_topSellerMeds_header", localeCookie)}</p>
  //         <ResponsiveContainer width={500} height={300}>
  //           <BarChart
  //             width={500}
  //             height={300}
  //             data={data.topSeller_meds.topSeller_meds_query}
  //             margin={{
  //               top: 5,
  //               right: 30,
  //               left: 20,
  //               bottom: 5,
  //             }}
  //           >
  //             <CartesianGrid strokeDasharray="3 3" />
  //             <XAxis dataKey="name" />
  //             <YAxis />
  //             <Tooltip />
  //             <Legend />
  //             <Bar dataKey="cantidad" fill="#FACA15" />
  //           </BarChart>
  //         </ResponsiveContainer>
  //       </Card>
  //     </div>
  //     <div className={statsStyles.gridItemExtend}>
  //       <Card className={statsStyles.cardInside}>
  //         <p className={statsStyles.gridHeader}>{getText("stats_sellsComparation_header",localeCookie)}</p>
  //         <ResponsiveContainer width={500} height={300}>
  //           <LineChart
  //             width={500}
  //             height={300}
  //             data={data.sells_comparation.sells_comparation_query}
  //             margin={{
  //               top: 5,
  //               right: 30,
  //               left: 20,
  //               bottom: 5,
  //             }}
  //           >
  //             <CartesianGrid strokeDasharray="3 3" />
  //             <XAxis dataKey="name" />
  //             <YAxis />
  //             <Tooltip />
  //             <Legend />
  //             <Line type="monotone" dataKey="anterior" stroke="#FACA15" activeDot={{ r: 8 }} />
  //             <Line type="monotone" dataKey="actual" stroke="#3F83F8" />
  //           </LineChart>
  //         </ResponsiveContainer>
  //       </Card>
  //     </div>
  //   </div>
      
  // )

    
}

export default StatsContainer;