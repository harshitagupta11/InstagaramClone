import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
const Signup = ()=>{
    const [name ,setName]= useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const history = useHistory()
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: 'Invalid email',classes:'#c62828 red darken-3'})
            return
        }

        fetch('/signup',
        {method:'post',
        headers:{
            'Content-Type':'application/json'
        },
            body:JSON.stringify({name,email,password} 
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
    return(
        <div className='mycard'>
        <div className='card authcard input-field'>
            <h2>Instagram</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            
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