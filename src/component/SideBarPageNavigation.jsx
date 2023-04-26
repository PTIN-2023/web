import layoutStyles from "../styles/Layout.module.css";
import { HiChartPie, HiTable, HiUser, HiInboxIn, HiBell, HiUserGroup, HiTruck, HiArchive, HiMap } from 'react-icons/hi';
import useCookie from "../hooks/useCookie";
import { Sidebar } from "flowbite-react";
import { getText } from "../utils/getTextCurrentLocale";

const sidebarItemGroups = [
  {
    role: "manager",
    items: [
      { name: "profile", icon: HiUser },
      { name: "map", icon: HiMap },
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
      { name: "notifications", icon: HiBell }
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

const SideBarPagesNavigation = ({ currentPage }) => {
  const [userRole,] = useCookie("user_role");
  const [localeCookie,] = useCookie('locale')

  return(<>
    {sidebarItemGroups.map(group => {
    if (group.role === userRole) {
      return (
      <Sidebar.ItemGroup key={group.role}>
        {group.items.map(item => (
          <Sidebar.Item
            key={item.name}
            className={sidebarItemClassName(currentPage, '/' + item.name)}
            href={'/' + item.name}
            icon={item.icon}
          >
            { getText(item.name, localeCookie) }
          </Sidebar.Item>
        ))}
      </Sidebar.ItemGroup>
      );
    }
    return null;
    })}
  </>)
}

export default SideBarPagesNavigation;