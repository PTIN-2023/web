import layoutStyles from "../styles/Layout.module.css";
import {HiChartPie, HiGlobeAlt, HiHome, HiTable, HiUser, HiInboxIn, HiUserAdd, HiUserGroup, HiTruck, HiArchive, HiMap, HiDocumentText, HiDocumentDuplicate } from 'react-icons/hi';
import useCookie from "../hooks/useCookie";
import { Sidebar } from "flowbite-react";
import { getText } from "../utils/getTextCurrentLocale";
import { RiPagesFill } from 'react-icons/ri'

const sidebarItemGroups = [
  {
    role: "manager",
    items: [
      { name: "profile", icon: HiUser, localize: false },
      { name: "map", icon: HiMap, localize: true, icon_global: HiGlobeAlt, icon_local: HiHome },
      { name: "inventory", icon: HiArchive, localize: false, hide_in_local: true},
      { name: "orders", icon: HiTruck, localize: false },
      { name: "assigns", icon: HiDocumentDuplicate, localize: false },
      { name: "stats", icon: HiChartPie, localize: false },
      { name: "createuser", icon: HiUserAdd, localize: false}
    ]
  },
  {
    role: "doctor",
    items: [
      { name: "profile", icon: HiUser, localize: false },
      { name: "patients", icon: HiUserGroup, localize: false },
      { name: "prescriptions", icon: RiPagesFill, localize: false }
    ]
  },
  {
    role: "patient",
    items: [
      { name: "profile", icon: HiUser, localize: false },
      { name: "myorders", icon: HiTable, localize: false },
      { name: "makeorder", icon: HiInboxIn, localize: false },
      { name: "prescripciones_paciente", icon: HiDocumentText, localize: false }
    ]
  }
];

const sidebarItemClassName = (currentPage, itemHref) => {  
  return currentPage === itemHref ? layoutStyles.sideBarCurrentItem : layoutStyles.sideBarItem;
};

const SideBarPagesNavigation = ({ currentPage, isLocal }) => {
  const [userRole,] = useCookie("user_role");
  const [localeCookie,] = useCookie('locale')
  userRole == "none" && alert("El usuario no está registrado! deberá completar su perfil!");
  return(<>
    {sidebarItemGroups.map(group => {
    if (group.role === userRole) {

      return (
      <Sidebar.ItemGroup key={group.role}>
        {group.items.map((item) => {
          if (item.localize) {
            return (  
              <Sidebar.Collapse
                key={item.name}
                icon={item.icon}             
                label={getText(item.name, localeCookie) }
                className={sidebarItemClassName(currentPage, '/' + item.name)}
              >                
                <Sidebar.Item 
                  key={item.name + '_global'}
                  className={sidebarItemClassName(currentPage, '/' + item.name + '_global')}
                  href={'/' + item.name + '_global'}
                  icon={item.icon_global}                  
                >  
                  { getText('global', localeCookie) }                
                </Sidebar.Item>
                {isLocal && 
                  <Sidebar.Item 
                      key={item.name + '_local'}
                      className={sidebarItemClassName(currentPage, '/' + item.name + '_local')}
                      href={'/' + item.name + '_local'}
                      icon={item.icon_local}                    
                    
                    >
                    { getText('local', localeCookie) }
                  </Sidebar.Item>    
                }
              </Sidebar.Collapse>                        
            );
          } else if (!isLocal || !item.hide_in_local) {
            return (
              <Sidebar.Item
                key={item.name}
                className={sidebarItemClassName(currentPage, '/' + item.name)}
                href={'/' + item.name}
                icon={item.icon}
              >
                { getText(item.name, localeCookie) }
              </Sidebar.Item>
            );
          }
        })}        
      </Sidebar.ItemGroup>
      );
    }
    return null;
    })}
  </>)
}

export default SideBarPagesNavigation;
