import React,{useContext, useEffect,useState} from 'react'
import {UserContext} from '../App'

const Home = ()=>{
    const {state,dispatch}=useContext(UserContext)
    const [posts,setPosts] = useState([])
    
    useEffect(()=>{
        fetch('/allposts',{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result.posts)
            setPosts(result.posts)
            
        })
    },[])
    
    const postLike=(id)=>{
        fetch('/like',{
            method:'put',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('jwt')}`
            },
            body:JSON.stringify({postId:id}) 
            
        })
        .then(res=>res.json()).then(result=>
            {
                const newPost= posts.map(post=>{
                    if(post._id===result._id){
                        return result
                    }
                    else{
                        return post
                    }
                })
                setPosts(newPost)
            }
        )
            
        .catch(err=>console.log(err))
    }

    const postUnlike=(id)=>{
        fetch('/unlike',{
            method:'put',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('jwt')}`
            },
            body:JSON.stringify({postId:id}) 
            
        })
        .then(res=>res.json()).then(result=>{
            //console.log(result)
            const newPost= posts.map(post=>{
                if(post._id===result._id){
                    return result
                }
                else{
                    return post
                }
            })
            setPosts(newPost)
        }
            )
        .catch(err=>console.log(err))
    }

    return(
        <div className='home'>
            
            {posts.map(post=>{
                return(
                    <div className='card home-card' key={post._id}>
                
                <h5 className='card-content'>{post.postedBy.name}</h5> 
               <div className='card-image'>
               {post.likes.includes(state._id)
                    ? <img src={post.photo} onDoubleClick={()=>postUnlike(post._id)}/>
                    :<img src={post.photo} onDoubleClick={()=>postLike(post._id)}/>
                }
                    
               </div>
               <div className='card-content'>
                   {post.likes.includes(state._id)
                    ?<i className=" small material-icons like waves-effect waves-light" onClick={()=>postUnlike(post._id)} style={{color:'red'}}>favorite</i>
                    :<i className="small material-icons like waves-effect waves-light" onClick={()=>postLike(post._id)}>favorite_border</i>
                }
               
                <h6><b>{post.likes.length} likes</b></h6>
                   <h6>
                       {post.title}
                   </h6>
                    <p>{post.body}</p>
                    <input type='text'placeholder='Add a comment' />
               </div>
            </div>
                )
            })}
            
            
        </div>
    )
}
export default Home