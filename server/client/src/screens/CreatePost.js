import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'
const CreatePost=()=>{
  const [title,setTitle]=useState("")
  const [body,setBody]=useState("")
  const [image,setImage]=useState("")
  const [url,setUrl]=useState("")
  const history = useHistory()
  useEffect(()=>{
    if(url){
      fetch('/createpost',
        {method:'post',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('jwt')}`
        },
            body:JSON.stringify({title,body,photo:url} 
        )
        })
        .then(res=>res.json())
            .then(data=>{
                
                if(data.error){
                    M.toast({html: data.error,classes:'#c62828 red darken-3'})
                }
                else{
                    M.toast({html: 'post created successfully',classes:'#4caf50 green'})
                    
                    history.push('/')
                }
            
            }).catch(err=>console.log(err))
    
    }
  },[url])


  const postDetails= ()=>{
  const data =new FormData()
  data.append("file",image)
  data.append("upload_preset",'instagramClone')
  data.append('cloud_name','myfirstinstaclone')
  fetch('https://api.cloudinary.com/v1_1/myfirstinstaclone/image/upload',{
        method:'post',
        body:data  
      })
      .then(res=>res.json())
      .then(data=>setUrl(data.url))
      .catch(err=>console.log(err))
      console.log(title,body,url)
    }

    return(
        <div className='card input-field' style={{margin:'40px auto',maxWidth:'500px',padding:'20px',textAlign:'center'}}>
            <input type='text' placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input type='text' placeholder='Body' value={body} onChange={(e)=>setBody(e.target.value)} />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                  <span>Upload Image</span>
                  <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button onClick={()=>postDetails()} className="btn waves-effect waves-light #64b5f6 blue darken-1" >Submit Post
            
            </button>
        </div>
    )
}
export default CreatePost; 