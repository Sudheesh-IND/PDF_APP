import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { registerApi } from '../services/apiService'
import './Style.css'

function Register() {

    //variables to carry form data
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()

      const navigate=useNavigate()

      //function to submit
      const onSubmit=async(data)=>{
       

        if(data.password==data.cPassword){
            //calling the api function and pasing the variables
             const response=await registerApi(data.name,data.email,data.password)

             //checking the response
             if(response.status>=200 && response.status<=399){
                alert('user registered successfully')
                navigate('/login')
                reset()
             }else{
             
                alert(response.response.data)
                reset()
             }

        }else{
            alert('Passwords does not match')
        }
   
      }
    return (
        <div className="start">
            <div className='start-2'>

                <div className="login-2">
                    <form action="" onSubmit={handleSubmit(onSubmit)}  style={{ backgroundColor: ' rgb(6,90,176)' }}>
                        <input {...register("name",{required:true})} className='form-control' placeholder='Name' type="text" />
                        <input {...register("email",{required:true})} className='form-control' placeholder='Email' type="text" />
                        <input {...register("password",{required:true})} type="password" className='form-control' placeholder='Password' />
                        <input {...register("cPassword",{required:true})} type="password" className='form-control' placeholder='Confirm Password' />
                        <button className='btn btn-white mt-3'>Register</button>
                    </form>
                    <div className='text-center'>
                        <Link to={'/login'}>

                            <button type='submit' className='btn btn-success mt-4'>Login</button>

                        </Link>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Register