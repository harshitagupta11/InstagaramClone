import React,{useEffect,useState,useContext} from 'react'
import { UserContext } from '../App'
import {useParams} from 'react-router-dom'

const UserProfile = ()=>{
    const [UserProfile,setUserProfile]=useState(null)
    const {state,dispatch}=useContext(UserContext)
    const {userid} = useParams()
    const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(res=>res.json())
        .then(result=>{
            //console.log(result)
            setUserProfile(result)
            console.log(result)
            
        })
    },[])

const Follow=()=>{

    fetch('/follow',
        {method:'put',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('jwt')}`
        },
            body:JSON.stringify({followId:userid})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:'UPDATE',payload:{followers:data.followers,following:data.following}})
            localStorage.setItem("user",JSON.stringify(data))
            setUserProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                       }
                }
            })
            setShowFollow(false)
            
        }).catch(err=>console.log(err))
    }

    const UnFollow=()=>{

        fetch('/unfollow',
            {method:'put',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('jwt')}`
            },
                body:JSON.stringify({unfollowId:userid})
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                dispatch({type:'UPDATE',payload:{followers:data.followers,following:data.following}})
                localStorage.setItem("user",JSON.stringify(data))
                setUserProfile((prevState)=>{
                    const updatefollowers= prevState.user.followers.filter(newfollower=>newfollower!=data._id)
                    return {
                        ...prevState,
                        user:{
                            ...prevState.user,
                            followers:updatefollowers
                           }
                    }
                })
                
            }).catch(err=>console.log(err))
            setShowFollow(true)
        }
    


    return(
        <>
        {UserProfile ? <div className='container'>
        <div style={{display:'flex',justifyContent:"space-around",margin:'18px 0px',borderBottom:'1px solid grey'}}>
            <div>
                <img style={{width:'160px',height:'160px',borderRadius:'50%'}} src='https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60' />
            </div>
            <div>
                <h4>{UserProfile.user.name}</h4>
                <h5>{UserProfile.user.email}</h5>
                <div style={{display:'flex',justifyContent:"space-between",width:'108%'}}>
                    <h6>
                        <b>{UserProfile.posts.length}</b> Posts
                    </h6>
                    <h6>
                        <b>{UserProfile.user.followers.length}</b> Followers
                    </h6>
                    <h6>
                        <b>{UserProfile.user.following.length}</b> Following
                    </h6>
                    </div>

                {showfollow?
                <button style={{margin:'10px'}}onClick={()=>Follow()} className="btn waves-effect waves-light #64b5f6 blue darken-1" >Follow
    
                </button> :
                <button style={{margin:'10px'}} onClick={()=>UnFollow()} className="btn waves-effect waves-light #64b5f6 blue darken-1" >Unfollow
    
            </button>

            
                }

                    
                    
            </div>

        </div>
        <div className='gallery'>
            {UserProfile.posts.map(post=>{
                return(
                    <img className='item' src={post.photo} key={post._id} alt="photo"/>
                )
            })}



            
            
            
        </div>

        </div>:
        <h2>loading... !</h2>
        
    
    
    }
        
        </>
    )
}
export default UserProfile