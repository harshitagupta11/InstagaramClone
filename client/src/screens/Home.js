import React from 'react'

const Home = ()=>{
    return(
        <div className='home'>
            
            <div className='card home-card'>
               <h5 className='card-content'>UserName</h5> 
               <div className='card-image'>
                    <img src='https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60' />
               </div>
               <div className='card-content'>
               <i className="material-icons">favorite</i>
                   <h6>
                       title
                   </h6>
                    <p>this is first post caption</p>
                    <input type='text'placeholder='Add a comment' />
               </div>
            </div>
            <div className='card home-card'>
               <h5 className='card-content'>UserName</h5> 
               <div className='card-image'>
                    <img src='https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60' />
               </div>
               <div className='card-content'>
               <i className="material-icons">favorite</i>
                   <h6>
                       title
                   </h6>
                    <p>this is first post caption</p>
                    <input type='text'placeholder='Add a comment' />
               </div>
            </div>
            <div className='card home-card'>
               <h5 >UserName</h5> 
               <div className='card-image'>
                    <img src='https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60' />
               </div>
               <div className='card-content'>
               <i className="material-icons">favorite</i>
                   <h6>
                       title
                   </h6>
                    <p>this is first post caption</p>
                    <input type='text'placeholder='Add a comment' />
               </div>
            </div>
        </div>
    )
}
export default Home