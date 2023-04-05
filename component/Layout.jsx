import layoutStyles from "../styles/Layout.module.css";
import React from 'react';
import { Sidebar, Navbar } from "flowbite-react";
import { HiMenuAlt1, HiChartPie } from 'react-icons/hi';

export default function Layout({ children }) {
  const [sidebarVisible, setSidebarVisible] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={layoutStyles.layoutContainer}>
      <Navbar fluid className={layoutStyles.navBar}>
        <div className={layoutStyles.navBarContents}>
          <HiMenuAlt1 className={layoutStyles.navBarIcon} onClick={toggleSidebar}/>
          <a href='/'><span className={layoutStyles.navBarTitle}>TransMed</span></a>
        </div>
      </Navbar>
      <div className={layoutStyles.sideBarAndMainContainer}>
        <Sidebar collapsed={sidebarVisible} className={layoutStyles.sideBar}>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/profile" icon={HiChartPie}>perfil</Sidebar.Item>
              <Sidebar.Item href="/inventory" icon={HiChartPie}>inventario(gestor)</Sidebar.Item>
              <Sidebar.Item href="/map" icon={HiChartPie}>mapa(gestor)</Sidebar.Item>
              <Sidebar.Item href="/orders" icon={HiChartPie}>peticiones(gestor)</Sidebar.Item>
              <Sidebar.Item href="/stats" icon={HiChartPie}>estadisticas(gestor)</Sidebar.Item>
              <Sidebar.Item href="/patients" icon={HiChartPie}>pacientes(medico)</Sidebar.Item>
              <Sidebar.Item href="/notifications" icon={HiChartPie}>notificaciones(medico)</Sidebar.Item>
              <Sidebar.Item href="/myorders" icon={HiChartPie}>mis pedidos (paciente)</Sidebar.Item>
              <Sidebar.Item href="/makeorder" icon={HiChartPie}>solicitar (paciente)</Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <main className={layoutStyles.mainContainer}>
          {children}
        </main>
      </div>
    </div>
  )
}