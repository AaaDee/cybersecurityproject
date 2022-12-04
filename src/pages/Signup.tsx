import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createImportSpecifier } from "typescript";
// const bcrypt = require('bcrypt')

export function Signup() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  async function handleSignup(event: any) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    if (await isBadPassword(password)) {
      setMessage('weak password');
      return
    }
    
    const user = {
      username,
      password,
      notes: []
    }

    // const saltRounds = 12
    // const passwordHash = await bcrypt.hash(password, saltRounds)
    // const user = {
    //   username,
    //   password: passwordHash,
    //   notes: []
    // }

    try {
      const response = await axios.post('http://localhost:3001/users', user);
      window.localStorage.setItem('user', JSON.stringify(response.data)) 
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }


  return <div>
          <form onSubmit={handleSignup}>
            <label htmlFor="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" required/>

            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required/>

            <button type="submit">Create account</button>
          </form>
          <div>{message}</div>
        </div>
}

async function isBadPassword(password: string) {
  return false;
  // if (password.length < 8) return true;
  // const response = await fetch('/resources/commonPasswords.txt');
  // const openedText = await response.text(); // <-- changed
  // const commonPasswords = openedText.split(/\r\n|\n/)
  // console.log(commonPasswords)
  // return commonPasswords.includes(password)
}


