import React from 'react';
import { Sidebar, Navbar } from "flowbite-react";
import { HiMenuAlt1, HiChartPie, GiDeliveryDrone} from 'react-icons/hi';

export default function Layout({ children }) {
  const [sidebarVisible, setSidebarVisible] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div  className="flex h-screen w-full flex-col overflow-hidden">
      <Navbar fluid>
        <div className="flex items-center">
        <HiMenuAlt1
            className="mr-6 h-6 w-6 cursor-pointer text-gray-600 dark:text-gray-400"
            onClick={toggleSidebar}
        />
        <span className="text-xl font-semibold dark:text-white">TransMed</span>
        </div>
      </Navbar>
      <div className="flex h-full overflow-hidden">
        <Sidebar collapsed={sidebarVisible} >
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiChartPie}>test</Sidebar.Item>
              <Sidebar.Item href="#" icon={HiChartPie}>test</Sidebar.Item>
              <Sidebar.Item href="#" icon={HiChartPie}>test</Sidebar.Item>
              <Sidebar.Item href="#" icon={HiChartPie}>test</Sidebar.Item>
              <Sidebar.Item href="#" icon={HiChartPie}>test</Sidebar.Item>
              <Sidebar.Item href="#" icon={HiChartPie}>test</Sidebar.Item>
              <Sidebar.Item href="#" icon={HiChartPie}>test</Sidebar.Item>
              <Sidebar.Item href="#" icon={HiChartPie}>test</Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <main className="flex-1 overflow-auto p-4 bg-gray-300">
          {children}
        </main>
      </div>
    </div>
  )
}