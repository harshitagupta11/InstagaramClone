import React from 'react'

const Profile = ()=>{
    return(
        <div className='container'>
        <div style={{display:'flex',justifyContent:"space-around",margin:'18px 0px',borderBottom:'1px solid grey'}}>
            <div>
                <img style={{width:'160px',height:'160px',borderRadius:'50%'}} src='https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60' />
            </div>
            <div>
                <h4>UserName</h4>
                <div style={{display:'flex',justifyContent:"space-between",width:'108%'}}>
                    <h6>
                        <b>40</b> Posts
                    </h6>
                    <h6>
                        <b>40</b> Followers
                    </h6>
                    <h6>
                        <b>40</b> Following
                    </h6>
                    </div>
            </div>
        </div>
        <div className='gallery'>
            <img className='item' src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
            <img className='item' src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
            <img className='item' src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
            <img className='item' src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
            <img className='item' src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
            <img className='item' src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
            
        </div>
        </div>
    )
}
export default Profile