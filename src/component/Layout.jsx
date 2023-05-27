import layoutStyles from "../styles/Layout.module.css";
import {useState} from 'react';
import { Sidebar, Navbar, Dropdown } from "flowbite-react";
import { useRouter } from 'next/router';
import { HiMenuAlt1, HiLockClosed } from 'react-icons/hi';
import SideBarProfileInfo from "./SideBarProfileInfo";
import MyOrdersSearch from "./MyOrdersSearch"
import useCookie from "../hooks/useCookie";
import SideBarPagesNavigation from "../component/SideBarPageNavigation"
import getTextCurrentLocale from "../utils/getTextCurrentLocale";
import { googleLogout } from '@react-oauth/google';
import Image from 'next/image';
import ShoppingCart from "./shoppingCart";

// Main Component

export default function Layout({ children, navBarValue}) {
  //recibe props: children y navBarValue
  //navBarValue es el setter del useState del componente que irá en la navbar para poder actualizarlo y mandarlo de vuelta al hijo padre

  // Sidebar settings
  const [sidebarVisible, setSidebarVisible] = useState(false);
  //asPath es un hook de nextjs que guarda la ruta del navegador en la que estamos y así detectamos la pagina
  const { asPath } = useRouter();
  //const currentPage = asPath;  
  const [userRole,] = useCookie("user_role");

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Routing info
  const router = useRouter();
  const currentPage = asPath;  

  // Locale settings
  const [, setLocaleCookie] = useCookie("locale");
  const setLocale = (locale) => {setLocaleCookie(locale); router.reload()}

  const [, setUserTokenCookie]  = useCookie('user_token', '')
  const [, setFullNameCookie] = useCookie('user_full_name', '')
  const [, setGivenNameCookie] = useCookie('user_given_name', '')
  const [, setUserEmailCookie] = useCookie('user_email', '')
  const [, setUserRoleCookie] = useCookie('user_role', '')
  const [, setUserAvatarCookie] = useCookie('user_picture', '')

  //logOutHandler
  const logOutHandler = () => {
    googleLogout();
    setFullNameCookie("");
    setGivenNameCookie("");
    setUserRoleCookie("");
    setUserEmailCookie("");
    setUserTokenCookie("");
    setUserAvatarCookie("");
    router.push("/");
  }

  return (
    <div className={layoutStyles.layoutContainer}>
      <Navbar fluid className={layoutStyles.navBar}>
        <div className={layoutStyles.navBarContents}>
          <HiMenuAlt1 className={layoutStyles.navBarIcon} onClick={toggleSidebar}/>
          <Image
            src="/media/logo/Blanco-layout.png"
            width={150}
            height={150}
            alt="TransMed-logo"
          />
          
          {/**estoy en Mis pedidos? carga la barra de busqueda */}
          {(currentPage == "/myorders" || currentPage == "/makeorder" || currentPage == "/orders") && <MyOrdersSearch setSearchValue={navBarValue}/>}
          {/**aqui hay que añadir el componente que corresponde a cada página si asi se requiere */}
          
          { currentPage == "/makeorder" &&
            <div style={{ marginLeft: '700px' }}>
              <ShoppingCart />
            </div>
          }
        </div>
        <Dropdown label={getTextCurrentLocale('language')} inline={true}>
          <Dropdown.Item onClick={() => { setLocale('es')}}>{getTextCurrentLocale('spanish')}</Dropdown.Item>
          <Dropdown.Item onClick={() => { setLocale('ca')}}>{getTextCurrentLocale('catalan')}</Dropdown.Item>
          <Dropdown.Item onClick={() => { setLocale('en')}}>{getTextCurrentLocale('english')}</Dropdown.Item>
        </Dropdown>
      </Navbar>
      <div className={layoutStyles.sideBarAndMainContainer}>
        <Sidebar collapsed={sidebarVisible} className={layoutStyles.sideBar}>
          <Sidebar.Items>
            <Sidebar.ItemGroup/>
            <Sidebar.ItemGroup>
              <SideBarProfileInfo isCollapsed={sidebarVisible}/>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <SideBarPagesNavigation currentPage={currentPage}/>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              {/**TODO: hacer el cerrar sesión!! (onClick(handler??))*/}
              <Sidebar.Item className={layoutStyles.sideBarItem} onClick={logOutHandler} icon={HiLockClosed}>Cerrar Sesión</Sidebar.Item>
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