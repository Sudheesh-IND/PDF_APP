import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { uploadpdf } from '../services/apiService';
import { useNavigate, useParams } from 'react-router-dom';

function Addpdf() {

  //state to hold the boolean value
  const [show, setShow] = useState(false);

  //getting userId from prarms
  const { userId } = useParams()

  //state for storing file and title name
  const [file, setFile] = useState('')
  const [title, setTitle] = useState('')
  //for navigating to different location
  const navigate=useNavigate()

  console.log(file)

  //uploading the document
  const handleUploads = async () => {

    if (file == '' || title == '') {
      alert("Please fill all fields")
    } else {
      //taking the data from input field to form data
      const formData = new FormData
      formData.append("file", file)

      //api call
      const response = await uploadpdf(userId, formData, title)

      if (response.status >= 200 && response.status <= 399) {
        console.log(response)
        //removing the values form the input fields
        setTitle('')
        setFile('')

        handleClose()
        navigate(`/viewpdf/${userId}/${response.data[0].filename}`)
      } else {
        alert("failed")
        setTitle('')
        setFile('')
        navigate('/*')
      }
    }


  }

  //for showing and closing of modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (


    <div>
      <Button className='me-2' variant="success" onClick={handleShow}>
        Add PDF
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Body className='p-3'>
          <form action="">
            <input onChange={(e) => { setTitle(e.target.value) }} placeholder='PDF Title' className='form-control mt-3' type="text" />
            <input onChange={(e) => { setFile(e.target.files[0]) }} className='form-control mt-3' type="file" accept='application/pdf' />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleUploads}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Addpdf