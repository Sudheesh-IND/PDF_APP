import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { login } from '../services/apiService'
import './Style.css'


function Login() {

    //variable devleration for navigation
    const navigate=useNavigate()
    //decleration of form
     const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()

      //callign the function
      const onSubmit=async(data)=>{
         
          //api call for response
          const response=await login(data.email,data.password)
         
          if(response.status>=200 && response.status<=399){
            alert('User login Successfull')
             reset()
             localStorage.setItem('user_Id_PDF_APP_gsdgghhtew864466atua56ry546t41hfauh',response.data.response._id)
             const userId=localStorage.getItem('user_Id_PDF_APP_gsdgghhtew864466atua56ry546t41hfauh')
             localStorage.setItem('tok_en_PDF_APP_gsdgghhtew864466atua56ry546t41hfauh',response.data.token)
             navigate(`/home/${userId}`)

          }else{
            alert(response.response.data)
            reset()
          }
      }

      //checking if userId and token present on local storage login
      const checkLogin=()=>{
        const userId=localStorage.getItem('userId_PDF_APP_gsdgghhtew864466atua56ry546t41hfauh')
        const token=localStorage.getItem('tok_en_PDF_APP_gsdgghhtew864466atua56ry546t41hfauh')
        if(userId && token){
            navigate(`/home/${userId}`) 
        }
      }

      //inside useeffect hook
      useEffect(()=>{
          checkLogin()
      })
    return (
        <div className="start">
            <div className='start-2'>

                <div className="login-2">
                    <form action="" onSubmit={handleSubmit(onSubmit)}  style={{ backgroundColor: ' rgb(6,90,176)' }}>
                        <input {...register("email",{required:true})} className='form-control' placeholder='Email' type="text" />
                        <input {...register("password",{required:true})} type="password" className='form-control' placeholder='Password' />
                        <button type='submit' className='btn btn-white mt-3'>Login</button>
                    </form>
                    <div className='text-center'>
                        <Link to={'/register'}>
                            <button className='btn btn-success mt-4'>Register</button>
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login