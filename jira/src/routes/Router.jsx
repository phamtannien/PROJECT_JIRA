import React from 'react'
import { useRoutes } from 'react-router-dom'
import HomeLayout from '../layouts/HomeLayout/HomeLayout'
import UserLogin from '../layouts/HomeLayout/UserLogin'
import CyberbugsLayout from '../layouts/HomeLayout/CyberbugsLayout'
import CreateProject from '../pages/CreateProject/CreateProject'
import ProjectManagement from '../pages/ProjectManagement/ProjectManagement'
import FormCreateTask from '../components/Form/FormCreateTask'
import UserRegister from '../layouts/HomeLayout/UserRegister'


export default function Router() {
const routing = useRoutes([

    {
    path: '/',
    element: <HomeLayout />,
    children:[
        {
            path: "/",
            element: <ProjectManagement/>,
            
        },
        {
            path: "/projectManagement",
            element: <ProjectManagement/>,
            
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
            path: "/projectDetail/:projectId",
            element: <CyberbugsLayout/>,
            
        },
        {
            path: "/createtask/:id",
            element: <FormCreateTask/>,
            
        },
        
        
    ]
},
{
    path: "/login",
    element: <UserLogin/>
},
{
    path: "/register",
    element: <UserRegister/>
},




])


  return routing 
}
