// import { Cards } from '@mui/material';
import './App.css';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Cards from './components/Cards';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './state/reducers/userReducer';
function App() {
  const userToken = localStorage.getItem('token');
  const dispatch = useDispatch();
  useEffect(()=>{
    if(userToken){
      dispatch(getUser(userToken))
    }
  },[])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Cards />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/signup' element={<SignUp />}/> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
