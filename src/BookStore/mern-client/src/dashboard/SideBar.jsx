import React from 'react'
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineCloudUpload, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import userImg from '../assets/profile.jpg' 

const SideBar = () => {
  return (
    <Sidebar aria-label="Sidebar with content separator example">
    <Sidebar.Logo
    href="#"
    img={userImg}
    imgAlt="Flowbite logo"
    style={{ width: '50px', height: '50px' }} 
    >
    </Sidebar.Logo>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Item 
        href="/admin/dashboard" icon={HiChartPie}>
          Dashboard
        </Sidebar.Item>
        <Sidebar.Item href="/admin/dashboard/upload" 
        icon={HiOutlineCloudUpload}>
          Upload Book
        </Sidebar.Item>
        <Sidebar.Item 
        href="/admin/dashboard/manage" icon={HiInbox}>
          Manage books
        </Sidebar.Item>
        <Sidebar.Item href="#" icon={HiUser}>
          Users
        </Sidebar.Item>
        <Sidebar.Item href="#" icon={HiShoppingBag}>
          Products
        </Sidebar.Item>
        <Sidebar.Item href="/login" icon={HiArrowSmRight}>
          Sign In
        </Sidebar.Item>
        <Sidebar.Item href="/logout" icon={HiTable}>
          Log Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
      <Sidebar.ItemGroup>
        <Sidebar.Item href="#" icon={HiChartPie}>
          Upgrade to Pro
        </Sidebar.Item>
        <Sidebar.Item href="#" icon={HiViewBoards}>
          Documentation
        </Sidebar.Item>
        <Sidebar.Item href="#" icon={BiBuoy}>
          Help
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  )
}

export default SideBar
