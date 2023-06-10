import layoutStyles from "../styles/Layout.module.css";
import { HiChartPie, HiGlobeAlt, HiHome, HiTable, HiUser, HiInboxIn, HiBell, HiUserGroup, HiTruck, HiArchive, HiMap } from 'react-icons/hi';
import useCookie from "../hooks/useCookie";
import { Sidebar } from "flowbite-react";
import { getText } from "../utils/getTextCurrentLocale";

//TODO: ver si getServerSideProps() se puede poner en un sólo archivo y no repetir
export async function getServerSideProps() {
  const isLocal           = env_config.isLocal();
  const apiEndpoint       = String(          env_config.getApiEndpoint());
  const locationName      = String(isLocal ? env_config.getLocationName()      : "N/A");
  const locationLatitude  = String(isLocal ? env_config.getLocationLatitude()  : "N/A");
  const locationLongitude = String(isLocal ? env_config.getLocationLongitude() : "N/A");
  const mapBoxToken       = String(          env_config.getTokenMapBox());
  const googleToken       = String(          env_config.getTokenGoogleSignIn());

  return {
    props: { 
      isLocal,
      apiEndpoint,
      locationName,
      locationLatitude,
      locationLongitude,
      mapBoxToken,
      googleToken
    }
  }
}

const sidebarItemGroups = [
  {
    role: "manager",
    items: [
      { name: "profile", icon: HiUser },
      { name: "map", icon: HiMap, global: "map_global", icon_global: HiGlobeAlt, local: "map_local", icon_local: HiHome },
      { name: "inventory", icon: HiArchive },
      { name: "orders", icon: HiTruck },
      { name: "stats", icon: HiChartPie }
    ]
  },
  {
    role: "doctor",
    items: [
      { name: "profile", icon: HiUser },
      { name: "patients", icon: HiUserGroup },
      { name: "prescriptions", icon: HiBell }
    ]
  },
  {
    role: "patient",
    items: [
      { name: "profile", icon: HiUser },
      { name: "myorders", icon: HiTable },
      { name: "makeorder", icon: HiInboxIn }
    ]
  }
];

const sidebarItemClassName = (currentPage, itemHref) => {  
  return currentPage === itemHref ? layoutStyles.sideBarCurrentItem : layoutStyles.sideBarItem;
};

const SideBarPagesNavigation = ({ currentPage }, props) => {
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
                {!props.isLocal && 
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