
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Notes } from './pages/Notes'
import { Signup } from './pages/Signup';

function App() {
  return <div>
      <h1>Totally safe note app</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
        <Route path ="/signup" element={<Signup />} />
      </Routes>
    </div>
}

export default App;
