import React, { useEffect, useState } from 'react'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import { getdetails } from '../services/apiService';
import Addpdf from './Addpdf';

function Header() {

  //state to hold the name of user
  const [user,setUser]=useState()

  //getting details with respect to ID
  const {userId}=useParams()
  const navigate=useNavigate( )

  //getting the user details to the frontend
  const userDetails=async()=>{
    //here destructuring is used to extract the data
    const response=await getdetails(userId)
    //setting the name of user into the state
    if(response.status>=200 && response.status<=399){
      setUser(response.data.name)
    }else{
      // navigate('/*')
    }
    
  }


  //sign out
  const signOut=()=>{
    localStorage.clear()
    navigate('/')

  }


  //calling the function iside use effect hook so that it can function automatically while loading
  useEffect(()=>{
    userDetails()
  },[])

  return (
    <div>
      <MDBNavbar className='shadow fixed-top' style={{ backgroundColor: ' rgb(6,90,176)' }}>

        <MDBNavbarBrand href='#'>
          <img
            style={{ borderRadius: '2rem' }}
            className='ms-3'
            src='https://cdn.dribbble.com/users/9112/screenshots/958420/anim-dpk.gif'
            height='40'
            alt=''
            loading='lazy'
          />
        </MDBNavbarBrand>
        <div className="mr-auto me-4 d-flex">
          <Addpdf/>
          <MDBDropdown>
            <MDBDropdownToggle tag='a' className='btn btn-light'>
              {user}
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem link onClick={signOut}>Sign Out</MDBDropdownItem>
              
              
            </MDBDropdownMenu>
          </MDBDropdown>
          
        </div>

      </MDBNavbar>
    </div>
  )
}

export default Header