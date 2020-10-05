import React,{useEffect,createContext,useReducer,UseContext, useContext} from 'react';
import NavBar from './components/Navbar'
import './App.css'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './screens/Home';
import Profile from './screens/Profile';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import CreatePost from './screens/CreatePost';
import {reducer,intialState} from './reducers/userReducer';
import UserProfile from './screens/UserProfile';

export const UserContext = createContext();
const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    //console.log(user)
    if(user)
    {
      dispatch({type:'USER',payload:user})
    
    }
    else 
    history.push('/signin')
  },[])
  return(
    <Switch>
      <Route path='/' exact>
    <Home/>
    </Route>
    <Route path='/signin'>
    <Signin/>
    </Route>
    <Route path='/signup'>
    <Signup/>
    </Route>

    <Route exact path='/profile'>
    <Profile/>
    </Route>
    <Route path='/create'>
    <CreatePost/>
    </Route>
    <Route path='/profile/:userid'>
    <UserProfile/>
    </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,intialState)
  return (
    <UserContext.Provider value ={{state,dispatch}}>
    <BrowserRouter>
    <NavBar/>
    <Routing />
    
    </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
