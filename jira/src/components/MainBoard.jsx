import React from 'react'
import "../styles/style.css"
import HeaderMain from './HeaderMain'
import InfoMain from './InfoMain'
import ContentMain from './ContentMain'



export default function MainBoard() {
  return  <div className="main">
 <HeaderMain/>
  <h3>Cyber Board</h3>
  <InfoMain/>
  <ContentMain/>
</div>
}
