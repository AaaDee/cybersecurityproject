import React from "react";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate()
  
  function handleLogout() {
    window.localStorage.removeItem('user');
    navigate('/', { replace: true }) 
  }

  return <button onClick={handleLogout}>Logout</button>
}