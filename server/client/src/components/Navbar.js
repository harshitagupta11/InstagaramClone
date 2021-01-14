import React, { useContext } from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
const NavBar=()=>{
  const {state,dispatch}=useContext(UserContext)
  const history = useHistory()
  const renderList= ()=>{
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/followingposts">My following</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li> 
          <button onClick={()=>{
            localStorage.clear()
            dispatch({type:'CLEAR'})
            history.push('/signin')
          }

          } className="btn waves-effect waves-light #c62828 red darken-3" >LogOut
    
    </button>
        </li>

      ]
    }
    else{
      return [
        <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
      ]
    }
  }
    return(
    <nav style={{background:'white'}}>
    <div className="nav-wrapper white container" style={{color:'black'}}>
      <Link to={state?'/':'/signin'} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
       {renderList()}
        
      </ul>
    </div>
  </nav>
    )
        
}
export default NavBar;