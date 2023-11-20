import React from 'react'
import {Outlet} from "react-router-dom"
import Search from '../../components/Search'
import Sidebar from '../../components/Sidebar'
import Menu from '../../components/Menu'
import Info from '../../components/Info'

export default function HomeLayout() {
  return (
    <div>
  
    {/* BODY */}
    <div className="jira">
     <Sidebar/>
     <Menu/>
     <Outlet/>
    </div>
    <Search/>
   <Info/>
  </div>
  )
}
