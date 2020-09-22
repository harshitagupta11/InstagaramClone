import React from 'react';
import NavBar from './components/Navbar'
import './App.css'
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './screens/Home';
import Profile from './screens/Profile';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import CreatePost from './screens/CreatePost';
function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Route path='/' exact>
    <Home/>
    </Route>
    <Route path='/signin'>
    <Signin/>
    </Route>
    <Route path='/signup'>
    <Signup/>
    </Route>

    <Route path='/profile'>
    <Profile/>
    </Route>
    <Route path='/create'>
    <CreatePost/>
    </Route>
    
    </BrowserRouter>
    
  );
}

export default App;
