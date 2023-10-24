import React from 'react'
import "../../styles/style.css"
import Sidebar from '../../components/Sidebar'
import Menu from '../../components/Menu'
import MainBoard from '../../components/MainBoard'
import Search from '../../components/Search'
import Info from '../../components/Info'
export default function CyberbugsLayout() {
  return (
    
   <div>
  
  {/* BODY */}
  <div className="jira">
    {/* Sider Bar  */}
   <Sidebar/>
    {/* Menu */}
   <Menu/>
    {/* {/* {/* Main Board * /} * /} */}
   <MainBoard/>
  </div>
  {/* Search Modal */}
  <Search/>
  {/* Info Modal */}
 <Info/>
</div>

    
  )
}
