import logo from './logo.svg';
import './App.css';
import Router from './routes/Router';
import { useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ModalCyberbugs from './HOC/CyberbugsHOC/ModalCyberbugs';

function App(){
 const navigate = useNavigate()
 const dispatch = useDispatch()
 useEffect(()=>{
  dispatch({type: "ADD_NAVIGATE", navigate:navigate})
 },[])
  return (
   < >
   <ModalCyberbugs/>
   <Router  />
   </>
  );
}

export default App;
