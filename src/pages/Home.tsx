import { Link } from "react-router-dom";

export function Home() {
  const userJSON = window.localStorage.getItem('user') 

  if (!userJSON) {
    return <div>
      <Link to='/login'>Log in</Link>
      <br />
      <Link to='/signup'>Sign up</Link>
    </div>
  }

  const user = JSON.parse(userJSON)

  return (
    <div>
      <p>hi {user.username}!</p>
      <Link to={`/notes?user=${user.id}`}>View your notes</Link>
    </div>
  )

}


