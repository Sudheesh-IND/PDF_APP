import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Style.css'

function Pagenotfound() {

  const navigate=useNavigate()

  const goBack=()=>{
    localStorage.clear()
    navigate('/')
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex text-align-center justify-content-center mt-5"  >
              
                <img src="https://th.bing.com/th/id/R.b8f7431d88b650d46fd667aed04c6c40?rik=oe%2bpCtlh13tUWQ&riu=http%3a%2f%2fresources.css.edu%2fcollegecomm%2fimages%2f404.gif&ehk=KfSaYEID7yczCgRvV5q3XPpnmi52MV5q01wFrDFAPy0%3d&risl=&pid=ImgRaw&r=0" alt="" />
               
                
           
          </div>
          <div className="col-md-12 text-center">
            <button className='btn btn-danger mt-5' onClick={goBack} > Back</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagenotfound