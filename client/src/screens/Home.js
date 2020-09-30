import React,{useEffect,useState} from 'react'

const Home = ()=>{
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
    
    return(
        <div className='home'>
            
            {posts.map(post=>{
                return(
                    <div className='card home-card' key={post._id}>
                
                <h5 className='card-content'>{post.postedBy.name}</h5> 
               <div className='card-image'>
                    <img src={post.photo}/>
               </div>
               <div className='card-content'>
               <i className="material-icons">favorite</i>
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