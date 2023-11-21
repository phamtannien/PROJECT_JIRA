import React from 'react'
import "../styles/style.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { USER_LOGIN, userLocalStorage } from '../constants/api'
import { Button, Popover, ConfigProvider } from 'antd';
import { useDispatch } from 'react-redux'
import { signinAction } from '../store/actions/cyberBugsAction'



export default function Menu() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem(USER_LOGIN);
    dispatch(signinAction(null))
    navigate("/login")
  }
const content1 = (
 <button className='btn btn-primary' onClick={()=>navigate("/login")}>Login</button>
);
const content2 = (
 <button className='btn btn-danger' onClick={handleLogout} >Logout</button>
);


  const location = useLocation()
  const user = userLocalStorage.get();

  const rederContent = ()=>{
    if(!user){
      return <div className="account">
      <div className="avatar">
      <Popover placement="bottom"  content={content1}>
      <img style={{width: "60px", height:"60px"}} src='https://cdn-icons-png.flaticon.com/512/3177/3177440.png'  />
        </Popover>
        
      </div>
      <div className="account-info">
        <p className='font-weight-bold text-primary '>Chưa đăng nhập</p>
        <p>Jira clone</p>
      </div>
    </div>
    }else{
      return <div className="account">
      <div className="avatar">
      <Popover placement="bottom"  content={content2}>
      <img style={{width: "60px", height:"60px"}} src={user.avatar}  />
        </Popover>
        
      </div>
      <div className="account-info">
        <p className='font-weight-bold text-primary '>{user.name}</p>
        <p>Jira clone</p>
      </div>
    </div>
    }
  }
  return  <div className="menu">
      
  {rederContent()}
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
