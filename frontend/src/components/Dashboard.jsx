import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
const Dashboard = () => {
    const getDataFromStor = useSelector((data) => data.userReducer)
    const token = localStorage.getItem('token') || undefined;
    const navigate = useNavigate();
    useEffect(() => {
        if(token === undefined && getDataFromStor.message === null){
            navigate('/');
        }
    },[])
    return(
        <>
            <Navbar />
            <h1>
                {
                    getDataFromStor.value !== null ? `Hello ${getDataFromStor.value.name}` : 'Dashboard' 
                }
                
            
            </h1>   
        </>
    )
}

export default Dashboard