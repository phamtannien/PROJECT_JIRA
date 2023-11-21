import React from 'react'
import "../styles/style.css"
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { userLocalStorage } from '../constants/api'
export default function Menu() {
  const location = useLocation()
  const user = userLocalStorage.get();
 console.log(user);
  return  <div className="menu">
  <div className="account">
    <div className="avatar">
      <img style={{width: "60px", height:"60px"}} src={user.avatar}  />
    </div>
    <div className="account-info">
      <p className='font-weight-bold text-primary h4'>{user.name}</p>
      <p>Jira clone</p>
    </div>
  </div>
  <div className="control">
    <div >
      <i className="fa fa-credit-card mr-2" />
      <NavLink  className={location.pathname === "/cyberbugs" ? 'active' : 'text-dark'}  to="/cyberbugs" activeClassName="active" >Cyber Board</NavLink>
    </div>
    <div>
      <i className="fa fa-credit-card mr-2" />
      <NavLink  className={location.pathname === "/projectManagement" ? 'active' : 'text-dark'}   activeStyle="blue"  to="/projectManagement" activeClassName="active font-weight-bold text-primary">Project Management</NavLink>
    </div>
    <div>
      <i className="fa fa-cog mr-2" />
      <NavLink  className={location.pathname === "/createProject" ? 'active' : 'text-dark'}  to="/createProject" activeClassName="active font-weight-bold text-primary">Create Project</NavLink>
    </div>
    <div>
    <i class="fa-solid fa-user mr-2"></i>
      <NavLink  className={location.pathname === "/usermanagement" ? 'active' : 'text-dark'}  to="/usermanagement" activeClassName="active font-weight-bold text-primary">User Management</NavLink>
    </div>
  </div>
  <div className="feature">
    <div>
      <i className="fa fa-truck mr-2" />
      <span>Releases</span>
    </div>
    <div>
      <i className="fa fa-equals  mr-2" />
      <span>Issues and filters</span>
    </div>
    <div>
      <i className="fa fa-paste mr-2" />
      <span>Pages</span>
    </div>
    <div>
      <i className="fa fa-location-arrow mr-2" />
      <span>Reports</span>
    </div>
    <div>
      <i className="fa fa-box mr-2" />
      <span>Components</span>
    </div>
  </div>
</div>
}
