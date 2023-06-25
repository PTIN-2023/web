import layoutStyles from "../styles/Layout.module.css";
import { HiChartPie, HiGlobeAlt, HiHome, HiTable, HiUser, HiInboxIn, HiUserAdd, HiUserGroup, HiTruck, HiArchive, HiMap, HiDocumentText } from 'react-icons/hi';
import useCookie from "../hooks/useCookie";
import { Sidebar } from "flowbite-react";
import { getText } from "../utils/getTextCurrentLocale";
import { RiPagesFill } from 'react-icons/ri'

const sidebarItemGroups = [
  {
    role: "manager",
    items: [
      { name: "profile", icon: HiUser },
      { name: "map", icon: HiMap, global: "map_global", icon_global: HiGlobeAlt, local: "map_local", icon_local: HiHome },
      { name: "inventory", icon: HiArchive },
      { name: "orders", icon: HiTruck },
      { name: "stats", icon: HiChartPie },
      { name: "createuser", icon: HiUserAdd}
    ]
  },
  {
    role: "doctor",
    items: [
      { name: "profile", icon: HiUser },
      { name: "patients", icon: HiUserGroup },
      { name: "prescriptions", icon: RiPagesFill }
    ]
  },
  {
    role: "patient",
    items: [
      { name: "profile", icon: HiUser },
      { name: "myorders", icon: HiTable },
      { name: "makeorder", icon: HiInboxIn },
      { name: "prescription", icon: HiDocumentText }
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
          if (item.name === "map") {
            return (  
              <Sidebar.Collapse
                key={item.name}
                icon={item.icon}             
                label={getText(item.name, localeCookie) }
                className={sidebarItemClassName(currentPage, '/' + item.name)}
              >                
                <Sidebar.Item 
                  key={item.global}
                  className={sidebarItemClassName(currentPage, '/' + item.global)}
                  href={'/' + item.global}
                  icon={item.icon_global}                  
                >  
                { getText(item.global, localeCookie) }                
                </Sidebar.Item>
                {isLocal && 
                  <>
                    <Sidebar.Item 
                      key={item.local}
                      className={sidebarItemClassName(currentPage, '/' + item.local)}
                      href={'/' + item.local}
                      icon={item.icon_local}                    
                    
                    >
                    { getText(item.local, localeCookie) }
                    </Sidebar.Item>                                   
                  </>
                }

              </Sidebar.Collapse>                        
            );
          }
        if (item.name === "prescription" && group.role === "patient") {
            return (
              <Sidebar.Item
                key={"prescripciones_paciente"}
                className={sidebarItemClassName(currentPage, '/' + "prescripciones_paciente")}
                href={'/' + "prescripciones_paciente"}
                icon={item.icon}
              >
                { getText(item.name, localeCookie) }
              </Sidebar.Item>
            );
          }
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
        })}        
      </Sidebar.ItemGroup>
      );
    }
    return null;
    })}
  </>)
}

export default SideBarPagesNavigation;
