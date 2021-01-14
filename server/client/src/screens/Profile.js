import React,{useEffect,useState,useContext} from 'react'
import { UserContext } from '../App'

const Profile = ()=>{
    const [posts,setPosts]=useState([])
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/myposts',{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result.myposts)
            setPosts(result.myposts)
            
        })
    },[])
    return(
        <div className='container'>
        <div style={{display:'flex',justifyContent:"space-around",margin:'18px 0px',borderBottom:'1px solid grey'}}>
            <div>
                <img style={{width:'160px',height:'160px',borderRadius:'50%'}} src='https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60' />
            </div>
            <div>
                <h4>{state?state.name:JSON.parse(localStorage.getItem('user')).name}</h4>
                <div style={{display:'flex',justifyContent:"space-between",width:'108%'}}>
                    <h6>
                    <b>{posts.length}</b> Posts
                    </h6>
                    <h6>
                        <b>{state?state.followers.length:0}</b> Followers
                    </h6>
                    <h6>
                        <b>{state?state.following.length:0}</b> Following
                    </h6>
                    </div>
            </div>
        </div>
        <div className='gallery'>
            {posts.map(post=>{
                return(
                    <img className='item' src={post.photo} key={post._id} alt="photo"/>
                )
            })}



            
            
            
        </div>
        </div>
    )
}
export default Profile