import React,{useContext, useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
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

    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
            const newData = posts.map(item=>{
              if(item._id==result._id){
                  return result
              }else{
                  return item
              }
           })
          setPosts(newData)
        }).catch(err=>{
            console.log(err)
        })
  }

  const deletePost=(postId)=>{
      fetch(`/delete/${postId}`,{
        method:"delete",
        headers:{
            
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
       }).then(res=>res.json()).then(result=>{
           //console.log(result)
           const newData= posts.filter(post=>{
               return post._id!=result._id
           })
           setPosts(newData)
       })
  }
   const deleteComment=(postId,commentId)=>{
    fetch(`/deletecomment/${postId}/${commentId}`,{
        method:"delete",
        headers:{
            
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
       }).then(res=>res.json()).then(result=>{
           //console.log(result)
           const newData= posts.map(post=>{
               if(post._id==result._id)
               return result
               else{
                   return post
               }
           })
           console.log(newData)
           setPosts(newData)
       })
   }


    return(
        <div className='home'>
            
            {posts.map(post=>{
                return(
                    <div className='card home-card' key={post._id}>
                
                <h5 className='card-content'>
                   <Link to={post.postedBy._id==state._id ? '/profile':`/profile/${post.postedBy._id}`}> {post.postedBy.name} </Link> 
                {post.postedBy._id==state._id &&
                 <i className="  material-icons like waves-effect waves-light " onClick={()=>deletePost(post._id)} style={{color: '#e57373 ',float:"right"}}>delete</i>}</h5> 
                
               <div className='card-image'>
               {post.likes.includes(state._id)
                    ? <img src={post.photo} onDoubleClick={()=>postUnlike(post._id)}/>
                    :<img src={post.photo} onDoubleClick={()=>postLike(post._id)}/>
                }
                    
               </div>
               <div className='card-content'>
                   {post.likes.includes(state._id)
                    ?<i className=" small material-icons like waves-effect waves-light" onClick={()=>postUnlike(post._id)} style={{color:'#d32f2f '}}>favorite</i>
                    :<i className="small material-icons like waves-effect waves-light" onClick={()=>postLike(post._id)}>favorite_border</i>
                }
               
                <h6><b>{post.likes.length} likes</b></h6>
                   <h6>
                       {post.title}
                   </h6>
                    <p>{post.body}</p>
                    {
                       post.comments.map(record=>{
                                return(
                                <h6 key={record._id}><span style={{fontWeight:"500"}}>
                                    <Link to={record.postedBy._id==state._id?'/profile':`/profile/${record.postedBy._id}`}>
                                    {record.postedBy.name}</Link>
                                    </span> {record.text} 
                                {(post.postedBy._id==state._id||record.postedBy._id==state._id)&&
                 <i className=" material-icons like " onClick={()=>deleteComment(post._id,record._id)} style={{color:'#e57373',float:"right"}}>delete</i>}
                                
                                </h6>
                                    )
                                    })
                                }
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        makeComment(e.target[0].value,post._id)
                        e.target[0].value=""
                    }}>
                    <input type='text'placeholder='Add a comment' />
                    
                    </form>
                    
               </div>
            </div>
                )
            })}
            
            
        </div>
    )
}
export default Home