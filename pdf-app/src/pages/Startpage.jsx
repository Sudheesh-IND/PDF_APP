import React from 'react'
import './Style.css'
import { Link } from 'react-router-dom'

function Startpage() {
    return (
        <div className="start">
            <div className='start-22'>

               <div>
               <h2>MY PDF</h2>
               </div>
                <div>
               <Link to={'login'}>
                   <button className='start-btn mt-3' >Getting Started</button>
                </Link>
            </div> 
              
            </div>
           

        </div>

    )
}

export default Startpage