import React from 'react'
import { pdfjs } from 'react-pdf';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useNavigate, useParams } from 'react-router-dom';
import { extractPdf } from '../services/apiService';
import './Style.css'


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();



function Viewpdf() {

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState([])
  const [pagesForExtraction, setPagesForExtraction] = useState([])

  //url for pdf
  const PDF_URL = 'http://localhost:5000'

  const navigate=useNavigate()

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);

    //this loop is for displaying all the pages of the pdf
    for (var i = 0; i < numPages; i++) {
      pages.push(i + 1)
    }


  }

  //getting filename from params
  const { pdfName } = useParams()


  //get pages for extraction
  const extract = (pageNo) => {
    if (pagesForExtraction.includes(pageNo)) {
      const index = pagesForExtraction.indexOf(pageNo)
      pagesForExtraction.splice(index, 1)
    } else {
      pagesForExtraction.push(pageNo)
    }

    
  }

  //downloading a pdf file
  const downloadPDF=()=>{
    const pdfUrl = `${PDF_URL}/pdffiles/${pdfName}`;
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = pdfName; // specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  }

  //api call fro extraction
  const handleExtraction = async () => {

    if (pagesForExtraction.length == 0) {
      alert("Please select pages to extract")
    } else {
      //calling the api call function
      const response = await extractPdf(pdfName, pagesForExtraction)

      //response evaluation
      if (response.status >= 200 && response.status <= 399) {
      
        //taking the bufferdata from the response
        const bufferData=response.data.data
        //converting buffer data into a blob
        const blob = new Blob([new Uint8Array(bufferData).buffer], { type: 'application/pdf' });

        //creating an url to download the pdf
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = pdfName
        document.body.appendChild(link);
        link.click();
       
      } else {
        navigate('/*')
      }
    }


  }


  return (
    <div>
      <div className="container">
        <div className="row">
          <div className='fixed-top'>
            <button  className='btn btn-primary m-2' onClick={downloadPDF}>Download</button>
            <button onClick={handleExtraction} className='btn btn-success m-2'>Extract pages</button>
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-8" style={{ marginTop: '100px' }}>
            <div>
              <Document file={`${PDF_URL}/pdffiles/${pdfName}`} onLoadSuccess={onDocumentLoadSuccess}>

                {/* mapping the pages array */}
                {
                  pages.length > 0 ? pages.map((page) => (
                    <div>

                     <div>
                     <input onChange={() => { extract(page) }} className='mb-2' style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                       type="checkbox"/>
                       <label className='ms-2 mb-3' htmlFor="">Select page to extract</label>
                     </div>
                      <Page className='shadow mb-3' pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} />

                    </div>
                  )) : ''
                }


              </Document>
              <p>
                Page {pages.length} of {numPages}
              </p>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  )
}

export default Viewpdf