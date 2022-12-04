import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Logout } from "../components/Logout";
import { Note } from "../types/types";

export function Notes() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const parameters = new URLSearchParams(search);
  const userId = parameters.get('user');
  const [notes, setNotes] = useState<Note[]>([]);

  // const userJSON = window.localStorage.getItem('user') ?? ''
  // const loggedUserId = JSON.parse(userJSON)
  // if (!userId || !loggedUserId || userId !== loggedUserId) {
  //   return <Navigate replace to="/" />
  // }


  async function addNote(event: any) {
    event.preventDefault();
    const content = event.target.note.value;
    const updatedNotes = [...notes, { content }]

    try {
      const response  = await axios.get(`http://localhost:3001/users/${userId}`)
      const user = response.data;

      const updatedUser = {
        ...user,
        notes: updatedNotes,
      }

      await axios.put(`http://localhost:3001/users/${userId}`, updatedUser)
      setNotes(updatedNotes)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get(`http://localhost:3001/users/${userId}`)
        setNotes(response.data.notes)
      } catch {
        navigate('/')
      }
    }
    
    if (userId) {
      fetchNotes()
    }

  }, [navigate, userId])

  if (!userId) {
    return <Navigate replace to="/" />
  }

  

  return <div>
    <p>notes for userID {userId}</p>
    <ul>
      {notes.map(note => <li key={note.content}>{note.content}</li>)}
    </ul>
    <form onSubmit={addNote}>
      <label htmlFor="username"><b>Note</b></label>
      <input type="text" placeholder="note" name="note" required/>

      <button type="submit">Add note</button>
    </form>
    <Logout />
  </div>
}


