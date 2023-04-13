import layoutStyles from "../styles/Layout.module.css";
import {useState} from 'react';
import { Sidebar, Navbar, Label, TextInput, Button } from "flowbite-react";
import { useRouter } from 'next/router';
import { HiMenuAlt1, HiChartPie, HiTable, HiUser, HiInboxIn, HiBell, HiUserGroup, HiTruck, HiArchive, HiMap, HiLockClosed } from 'react-icons/hi';
import SideBarProfileInfo from "./SideBarProfileInfo";
import UserData from "./UserData";
import MyOrdersSearch from "./MyOrdersSearch"


export default function Layout({ children, navBarValue}) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { asPath } = useRouter();
  const currentPage = asPath;
  const userData = UserData;

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={layoutStyles.layoutContainer}>
      <Navbar fluid className={layoutStyles.navBar}>
        <div className={layoutStyles.navBarContents}>
          <HiMenuAlt1 className={layoutStyles.navBarIcon} onClick={toggleSidebar}/>
          <a href='/'><span className={layoutStyles.navBarTitle}>TransMed</span></a>
          {/**estoy en Mis pedidos? carga la barra de busqueda */}
          {currentPage == "/myorders" && <MyOrdersSearch setSearchValue={navBarValue}/>}
        </div>
      </Navbar>
      <div className={layoutStyles.sideBarAndMainContainer}>
        <Sidebar collapsed={sidebarVisible} className={layoutStyles.sideBar}>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <SideBarProfileInfo isCollapsed={sidebarVisible}/>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              {userData.role == "Gestor" &&
                <Sidebar.ItemGroup>
                  <Sidebar.Item className={`${currentPage == "/profile" ? layoutStyles.sideBarCurrentItem: layoutStyles.sideBarItem}`} href="/profile" icon={HiUser}>Perfil</Sidebar.Item>
                  <Sidebar.Item className={`${currentPage == "/map" ? layoutStyles.sideBarCurrentItem: layoutStyles.sideBarItem}`} href="/map" icon={HiMap}>Mapa</Sidebar.Item>
                  <Sidebar.Item className={`${currentPage == "/inventory" ? layoutStyles.sideBarCurrentItem: layoutStyles.sideBarItem}`} href="/inventory" icon={HiArchive}>Inventario</Sidebar.Item>
                  <Sidebar.Item className={`${currentPage == "/orders" ? layoutStyles.sideBarCurrentItem: layoutStyles.sideBarItem}`} href="/orders" icon={HiTruck}>Pedidos</Sidebar.Item>
                  <Sidebar.Item className={`${currentPage == "/status" ? layoutStyles.sideBarCurrentItem: layoutStyles.sideBarItem}`} href="/stats" icon={HiChartPie}>Estadísticas</Sidebar.Item>
                </Sidebar.ItemGroup>
              }
              
              {userData.role == "Medico" &&
                <Sidebar.ItemGroup>
                  <Sidebar.Item className={`${currentPage == "/profile" ? layoutStyles.sideBarCurrentItem: layoutStyles.sideBarItem}`} href="/profile" icon={HiUser}>Perfil</Sidebar.Item>
                  <Sidebar.Item className={`${currentPage == "/patients" ? layoutStyles.sideBarCurrentItem: layoutStyles.sideBarItem}`} href="/patients" icon={HiUserGroup}>Pacientes</Sidebar.Item>
                  <Sidebar.Item className={`${currentPage == "/notifications" ? layoutStyles.sideBarCurrentItem: layoutStyles.sideBarItem}`} href="/notifications" icon={HiBell}>Notificaciones</Sidebar.Item>
                </Sidebar.ItemGroup>
              }
              

              {userData.role == "Paciente" &&
                <Sidebar.ItemGroup>
                  <Sidebar.Item className={`${currentPage == "/profile" ? layoutStyles.sideBarCurrentItem: layoutStyles.sideBarItem}`} href="/profile" icon={HiUser}>Perfil</Sidebar.Item>
                  <Sidebar.Item className={`${currentPage == "/myorders" ? layoutStyles.sideBarCurrentItem: layoutStyles.sideBarItem}`} href="/myorders" icon={HiTable}>Mis pedidos</Sidebar.Item>
                  <Sidebar.Item className={`${currentPage == "/makeorder" ? layoutStyles.sideBarCurrentItem: layoutStyles.sideBarItem}`} href="/makeorder" icon={HiInboxIn}>Solicitar</Sidebar.Item>
                </Sidebar.ItemGroup>
              }
              
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              {/**TODO: hacer el cerrar sesión!! (onClick(handler??))*/}
              <Sidebar.Item className={layoutStyles.sideBarItem} href="/" icon={HiLockClosed}>Cerrar Sesión</Sidebar.Item>

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