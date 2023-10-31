import React from 'react'
import { useRoutes } from 'react-router-dom'
import HomeLayout from '../layouts/HomeLayout/HomeLayout'
import UserLogin from '../layouts/HomeLayout/UserLogin'
import CyberbugsLayout from '../layouts/HomeLayout/CyberbugsLayout'
import CreateProject from '../pages/CreateProject/CreateProject'
import ProjectManagement from '../pages/ProjectManagement/ProjectManagement'
import FormCreateTask from '../components/Form/FormCreateTask'


export default function Router() {
const routing = useRoutes([
{
    path: "/login",
    element: <UserLogin/>
},
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
            path: "/",
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


])


  return routing 
}
