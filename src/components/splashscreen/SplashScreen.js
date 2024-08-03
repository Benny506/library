import React, { useEffect, useRef } from "react";
import './css/loaders.css'
import logo1 from '../../assets/logos/logo1.png'
import userprofile from '../../assets/profile/userprofile.jpg'
import HTMLFlipBook from 'react-pageflip';
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { splash_books } from "./splashBooks";
import { Spinner } from "react-bootstrap";
import { library_books } from "../dummyDb/dummyDb";




const Page = React.forwardRef((props, ref) => {
    return (
        <div 
            className={`splash-book-container ${props.noPadding ? 'p-0' : 'p-3'}`} 
            ref={ref}
        >
            {
                props.children
            }
        </div>
    );
});



export default function SplashScreen({ setIsLoading }){
    const bookRef = useRef()

    useEffect(() => {
        if(bookRef.current){
            const flipInterval = setInterval(() => {
                bookRef.current?.pageFlip().flipNext()
                if(bookRef.current.pageFlip().getCurrentPageIndex() == 5){
                    setIsLoading(false)
                }
            }, 1500)
    
            return () => clearInterval(flipInterval);
        }
    }, [])

    const displayPages = splash_books.map((book, i) => {
        const { img, text } = book
        return(
            <Page
                key={i}
            >
                <div>

                </div>
                <div className="d-flex justify-content-center align-items-center mb-4 px-2">
                    <img 
                        src={img}
                        width={"80%"}
                        height={"80%"}
                    />
                </div>
                <hr />
                <div>
                    <p className="splash-book-text">{text}</p>
                </div>
            </Page>
        )
    })

    return (
        <div className="splash-screen-container p-3">
            <div className="mb-4 col-lg-1 col-3 d-flex justify-content-center">
                <img 
                    className="col-lg-11 col-12"
                    src={logo1} 
                />
            </div>
            <div className="mb-5">

            </div>
            <HTMLFlipBook 
                ref={bookRef}
                width={350} 
                height={300} 
                className="splash-screen-body p-0 m-0"
                showCover={true}    
                showPageCorners={true}
            >
                <Page noPadding={true}>
                    <div className="cover-page-container h-100 w-100 img-bg">
                        <h1 className="cover-page-header text-center p-0 m-0 py-4 mb-4">
                            Welcome traveller
                        </h1>
                        <h3 className="cover-page-sub-header text-center fst-italic mb-5">
                            Your journey begins here
                        </h3>
                        <div className="d-flex justify-content-end px-5">
                            <BsFillArrowRightCircleFill color="#FFF" size={20} />
                        </div>
                    </div>
                </Page>
                {
                    displayPages
                }
                <Page noPadding={true}>
                    <div className="back-page-container h-100 w-100 img-bg">
                        <h1 className="cover-page-header text-center p-0 m-0 py-4 mb-4">
                            Exploration awaits
                        </h1>
                        <h3 className="cover-page-sub-header text-center fst-italic mb-5">
                            Any moment now
                        </h3>
                        <div className="d-flex justify-content-center">
                            <Spinner color="#FFF" style={{ color: "#FFF" }} />
                        </div>
                    </div>
                </Page>                
            </HTMLFlipBook>                         
        </div>
    )
}