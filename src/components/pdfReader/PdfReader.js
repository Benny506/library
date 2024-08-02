import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { CiCircleChevRight, CiCircleChevLeft } from "react-icons/ci";
import pdf from '../../assets/librarybooks/48LawsOfPower/48LawsOfPower.pdf'
// import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './css/pdfReader.css'


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();



export default function PdfReader({ bookPath }) {

  const pdfScrollRef = useRef(null)

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    if(pdfScrollRef.current){
      pdfScrollRef.current.scrollTo(0, 0)
    }
  }, [pageNumber])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  const moveToNextPage = () => setPageNumber(prev => prev + 1)
  const moveToPrevPage = () => setPageNumber(prev => prev - 1)

  return (
    <div className='d-flex align-items-center justify-content-center flex-column'>
        <p className='my-4 text-center font-family-ubuntu regular-txt font-weight-500 txt-000'>
          Page <span className='txt-21B08E font-weight-600'>{pageNumber}</span> of <span className='txt-21B08E font-weight-600'>{numPages}</span>
        </p>
        <div className='d-flex align-items-center justify-content-center mb-4'>
          <button
              disabled={pageNumber == 1 ? true : false}
              onClick={moveToPrevPage}
              style={{
                  opacity: pageNumber == 1 ? 0.5 : 1
              }}
          >
              <CiCircleChevLeft size={35} color='#21B08E' />
          </button>
          <button
              disabled={pageNumber == numPages ? true : false}
              onClick={moveToNextPage}
              style={{
                  opacity: pageNumber == numPages ? 0.5 : 1
              }}
          >
              <CiCircleChevRight size={35} color='#21B08E' />
          </button>
        </div>    

        <div
          ref={pdfScrollRef}
          className='pdf-view-container'
        >
          <div className='p-3 d-flex flex-column align-items-center justify-content-center'>  
            <Document className={'rounded-3 w-100 p-3 d-flex align-items-center justify-content-center'} file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
              <Page 
                pageNumber={pageNumber} 
                renderMode="canvas"
                className={"rounded-3 w-100 d-flex align-items-center justify-content-center"}
                scale={1.3}
                renderAnnotationLayer={false}
              />
            </Document> 
          </div>
        </div>        
    </div>
  );
}