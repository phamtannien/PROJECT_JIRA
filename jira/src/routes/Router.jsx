import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import Profile from '../pages/Profile/Profile'
import Demo from '../pages/Demo/Demo'
import HomeLayout from '../layouts/HomeLayout/HomeLayout'
import UserLogin from '../layouts/HomeLayout/UserLogin'
import CyberbugsLayout from '../layouts/HomeLayout/CyberbugsLayout'
import CreateProject from '../pages/CreateProject/CreateProject'
import ProjectManagement from '../pages/ProjectManagement/ProjectManagement'


export default function Router() {
const routing = useRoutes([
{
    path: '/',
    element: <HomeLayout/>,
    children:[
        {
            path: "/home",
            element: <Home/>
        },
        {
            path: "/about",
            element: <About/>
        },
        {
            path: "/contact",
            element: <Contact/>
        },
       
        {
            path: "/profile",
            element: <Profile/>
        },
        {
            path: "/demo",
            element: <Demo/>
        },
    ]
},
{
    path: "/login",
    element: <UserLogin/>
},
{
    path: "/cyberbugs",
    element: <CyberbugsLayout/>,
    
},
{
    path: "/createProject",
    element: <CreateProject/>,
    
},
{
    path: "/projectManagement",
    element: <ProjectManagement/>,
    
},
])


  return routing 
}
