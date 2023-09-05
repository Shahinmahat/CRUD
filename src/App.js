import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Taskcreate from './Components/Taskcreate.jsx';
import TaskList from './Components/TaskList.jsx';
import EditTask from './Components/EditTask';
import VideoContainer from './Components/VideoContainer';
import appVideo from './assets/vPBh92a90tRiLf41Gj.mp4'; 
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';

//to get the data from localstorage
const getLocalTasks = () => {
  let list = localStorage.getItem('lists');
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState(getLocalTasks());
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') === 'true');
  


  const handleLogin = (user) => {
    // Perform validation here (e.g., check username and password)
    // For simplicity, let's assume the login is successful
   setIsLogin(true)
   localStorage.setItem('isLogin', 'true');
   
  };
 
  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    setIsLogin(false);
    
  };

  const handleRegister = (newUser) => {
    // Store the new user data in local storage
    let usersData = localStorage.getItem('usersData');
    if (!usersData) {
      usersData = [];
    } else {
      usersData = JSON.parse(usersData);
    }

    usersData.push(newUser);
    localStorage.setItem('usersData', JSON.stringify(usersData));

    
  }
  
  useEffect(() => {
    const storedTasks = localStorage.getItem('lists');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);


  const addTask = (task) => {
    setTasks([...tasks, task]);
    console.log(task);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  //add data to localtstorage
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Router>
    <div className="app-container">
      <nav className="nav-container">
        <h2 className='app-title'>Welcome to Task Management App</h2>
        <ul>
          {isLogin ? (
            <>
              <li>
                <Link to="/create">Create Task</Link>
              </li>
              <li>
                <Link to="/list">Task List</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="content-container">
        <Routes>
          <Route path="/" element={isLogin ? <VideoContainer appVideo={appVideo} /> : <LoginPage handleLogin={handleLogin}/>} />

          <Route
            path="/create"
            element={isLogin ? <Taskcreate addTask={addTask} /> : <Navigate to="/login"/>}
          />

          <Route
            path="/list"
            element={isLogin ? <TaskList tasks={tasks} updateTask={updateTask} setTasks={setTasks} /> : <Navigate to="/login" />}
          />

          <Route
            path="/list/:taskId"
            element={<EditTask tasks={tasks} updateTask={updateTask} />}
          />
          <Route
            path="/login"
            element={<LoginPage handleLogin={handleLogin} />}
          />

          <Route
            path='/register'
            element={<RegisterPage handleRegister={handleRegister}/>}
          />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
