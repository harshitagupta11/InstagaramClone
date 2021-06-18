import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
const Signup = ()=>{
    
    const [name ,setName]= useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState(undefined)
    const history = useHistory()
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])


    const uploadPic=()=>{
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
            //console.log(title,body,url)    
    }
    const uploadFields=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: 'Invalid email',classes:'#c62828 red darken-3'})
            return
        }

        fetch('/signup',
        {method:'post',
        headers:{
            'Content-Type':'application/json'
        },
            body:JSON.stringify({
                name,
                email,
                password,
                pic:url
            } 
        )
        })
        .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                    M.toast({html: data.error,classes:'#c62828 red darken-3'})
                }
                else{
                    M.toast({html: data.message,classes:'#4caf50 green'})
                    history.push('/signin')
                }
            
            }).catch(err=>console.log(err))
    }
    

    const PostData=()=>{
        if(image){
            uploadPic()
        }
        else{
            uploadFields()
        }
    }
    return(
        <div className='mycard'>
        <div className='card authcard input-field'>
            <h2>Instagram</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                  <span>Upload Pic</span>
                  <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text"/>
                </div>
            </div>
            
            <button onClick={()=>PostData()} className="btn waves-effect waves-light #64b5f6 blue darken-1" >SignUp
    
            </button>
            <h6>
                <Link to='/signin'> Already have an account ?</Link>
            </h6>

        </div>
    </div>
    )
}
export default Signup