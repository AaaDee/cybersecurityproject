import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  async function handleLogin(event: any) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    
    const users = await axios.get('http://localhost:3001/users');
    
    const user = users.data.find((u: any) => u.username === username && u.password === password)

    // const saltRounds = 12
    // const passwordHash = await bcrypt.hash(password, saltRounds)
    // const user = users.data.find((u: any) => u.username === username && u.password === hashedPassword)
  
    if (!user) {
      setMessage('login failed')
    } else {
      window.localStorage.setItem('user', JSON.stringify(user)) 
      navigate('/')
    }
  }


  return <div>
          <form onSubmit={handleLogin}>
            <label htmlFor="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" required/>

            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required/>

            <button type="submit">Login</button>
          </form>
          <div>{message}</div>
        </div>
}


