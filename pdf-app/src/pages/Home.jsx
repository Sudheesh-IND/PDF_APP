import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getPdfDetails } from '../services/apiService'
import Pdfcard from '../components/Pdfcard'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';
import './Style.css'

function Home() {

  //for getting the status of delete request to call the function inside use effect
  const [deletePdfStatus,setDeletePdfStatus]=useState(false)

  const [details,setDetails]=useState([])
  const [sample,setSample]=useState([])
  const [searchKey,setSearchKey]=useState('')
  //getting user ID
  const {userId}=useParams()
  const navigate=useNavigate()

  //function for handling api call
  const handlePdf = async () => {

    const response = await getPdfDetails(userId)
    
    if (response.status >= 200 && response.status <= 399) {
      setDetails(response.data)
      setSample(response.data)

    } else {
      //  navigate('/**')
    }
  }

  //searching
  const searchResult=()=>{
   
    const searching=sample?.filter((item)=>(
      item.title.toLowerCase().trim().includes(searchKey.toLowerCase().trim())
    ))
 
    setDetails(searching)
  }



  //inside useeffect hook for call the function while loading page
  useEffect(() => {
    handlePdf()
  }, [deletePdfStatus])

  return (
    <div  style={{minHeight:'100vh',maxHeight:'100%'}}>
      <div>
        <Header />
      </div>
      <div className="container" style={{marginTop:'100px'}}>
        <div className="row">
          <div className="col-md-4 d-flex">
            <input onKeyUp={searchResult} onChange={(e)=>{setSearchKey(e.target.value)}} className='form-control' type="text" name="" id="" placeholder='Search here' />
            
          </div>
        </div>
      </div>
      <div className="container mt-3">
        
        <Row >
        
            {
              details.length > 0 ? details.map((pdf) => (
                <Col sm={12} md={6} lg={4} xl={3} >

                <Pdfcard pdf={pdf} setDeletePdfStatus={setDeletePdfStatus} />

                </Col>
              )) : <div className='row'>
                       <div className="col-md-12 text-center" style={{marginTop:'100px'}}>
                        <h3 style={{fontWeight:'800'}}>Nothing Found!!</h3>
                        <i style={{fontSize:'2rem'}} class="fa-solid fa-file-pdf mt-3"></i>
                       </div>
                  </div>
            }
         

        </Row>
          


        
      </div>
    </div>
  )
}

export default Home