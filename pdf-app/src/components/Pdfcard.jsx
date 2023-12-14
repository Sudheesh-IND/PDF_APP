import React from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
} from 'mdb-react-ui-kit';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import './components.css'
import { deletPdf } from '../services/apiService';



pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();



function Pdfcard({ pdf, setDeletePdfStatus }) {

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const navigate = useNavigate()


    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    //getting userId from params
    const { userId } = useParams()

   

    //handle deltete request
    const handleDelete = async (filename) => {
        const response = await deletPdf(filename)

        if (response.status >= 200 && response.status <= 399) {
            setDeletePdfStatus(true)


        } else {
            // navigate('/*')
        }
    }
    return (
        <div>

            <MDBCard className='m-3 pdf-card'>
                <MDBCardBody>

                    <div >
                        <Link to={`/viewpdf/${userId}/${pdf.filename}`}>
                            <div className='pdf-portion' style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <Document file={`http://localhost:5000/pdffiles/${pdf.filename}`} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
                                </Document>

                            </div>
                        </Link>
                        <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-between' }}>
                            {
                                pdf.title.length > 10 ? (<h2 style={{ fontSize: '1.3rem', fontWeight: '800' }} className='mt-3'>{pdf.title.slice(0, 10)}..</h2>)
                                    : <h2 style={{ fontSize: '1.3rem', fontWeight: '800' }} className='mt-3'>{pdf.title}</h2>

                            }
                            <i onClick={() => { handleDelete(pdf.filename) }} style={{ fontSize: '1.3rem', cursor: 'pointer' }} class="fa-solid fa-trash text-danger mt-4"></i>
                        </div>
                    </div>

                </MDBCardBody>
            </MDBCard>

        </div>
    )
}

export default Pdfcard