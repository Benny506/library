import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from '../../../assets/home/img1.jpg'
import logo from '../../../assets/logos/logo1.svg'
import { BsArrowRight } from "react-icons/bs";
import Navigation from "../../navigation/Navigation";
import { Offcanvas } from "react-bootstrap";
import OffcanvasActiveBook from "./discover/OffcanvasActiveBook";
import { features } from "../auxiliary/mainAux";
import '../css/main.css'
import { useNavigate } from "react-router-dom";



export default function Home({ userDetails, allBooks, setUserDetails }){

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)
    const goToDiscover = () => navigateTo('/discover')   
    const goToRegister = () => navigateTo('') 

    const [activeBookOffcanvas, setActiveBookOffcanvas] = useState({ visible: false, details: null })
    const [books, setBooks] = useState([])

    useEffect(() => {
        setBooks(allBooks)
    }, [])

    
    const hideActiveBookOffcanvas = () => setActiveBookOffcanvas({ visible: false, details: null })

    const displayTop5Books = allBooks.slice(0, 5).map((libook, i) => {
        const { cover, title, author } = libook

        const selectBook = () => {
            setActiveBookOffcanvas({ visible: true, details: libook})

            return;
        }

        return (
            <div 
                className="col-lg-auto col-md-auto col-12 mb-lg-0 mb-md-0 mb-4 discover-single-book-container clickable"
                onClick={selectBook}
                key={i}
            >
                <div 
                    className="img-bg col-lg-12 col-12 mb-2 rounded-3"
                    style={{
                        height: '32vh',
                        backgroundImage: `url(${cover})`,
                    }}
                >
                </div>
                <div>
                    <h5 className="m-0 p-0 mb-1 font-family-ubuntu regular-txt txt-000 font-weight-500">{title}</h5>
                    <p className="m-0 p-0 font-family-galada txt-204148 font-weight-600 small-txt">{author}</p>
                </div>
            </div>            
        )
    })

    
    const displayFeatures = features.map((feature, i) => {
        const { Icon, title, text, bgColor } = feature
        return (
            <div
                key={i}
                className="col-lg-4 col-md-4 col-12 mb-lg-0 mb-md-0 mb-4 d-flex align-items-center justify-content-center"
            >
                <div
                    className="col-lg-11 col-md-11 col-12 d-flex align-items-center mx-0 flex-column rounded-3 p-5 home-single-feature-container"
                >
                    <div 
                        style={{
                            backgroundColor: bgColor
                        }}
                        className="mb-5 p-4 rounded-circle"
                    >
                        <Icon />
                    </div>

                    <div>
                        <h2 className="m-0 p-0 mb-4 text-center font-family-galada txt-204148 font-weight-500 medium-txt">
                            { title }
                        </h2>
                        <p className="m-0 p-0 text-center font-family-ubuntu txt-000 font-weight-500 small-txt">
                            { text }
                        </p>
                    </div>
                </div>
            </div>
        )
    })


    return (
        <div className="home-bg w-100">
            <div className="fixed-top">
                <Navigation 
                    userDetails={userDetails} 
                    setBooks={setBooks}
                    books={books}
                    allBooks={allBooks}
                />
            </div>

            <div className="mb-4"/>
            <div className="mb-3 pb-1"/>

            <div className="d-flex flex-wrap bg-9DCCFF-opacity-_2 align-items-center justify-content-between p-5 mb-4">
                <div className="col-lg-5 col-md-5 col-12 mb-lg-0 mb-md-0 mb-4">
                    <h4 className="m-0 p-0 mb-2 font-family-galada font-weight-500 txt-204148 regular-txt">
                        Powered by The Library
                    </h4>
                    <h1 className="m-0 p-0 mb-4 font-family-ubuntu font-weight-600 txt-000 large-txt">
                        Education Made Simple
                    </h1>
                    <p className="m-0 p-0 mb-4 font-family-ubuntu font-weight-500 regular-txt txt-204148">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur 
                        adipiscing elit, sed do eiusmod tempor
                    </p>
                    <button onClick={goToDiscover} className="bg-204148 rounded-3 clickable font-family-ubuntu font-weight-600 small-txt txt-FFF p-3 w-100">
                        Discover our collection
                    </button>
                </div>
                <div className="col-lg-5 col-md-5 col-12">
                    <div className="col-lg-12 col-md-12 col-12">
                        <img src={img1} className="col-lg-12 col-md-12 col-12 rounded-3" />
                    </div>
                </div>
            </div>

            <div className="mb-5 p-lg-5 p-md-5 p-4">
                <div className="mb-5 pb-5">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h2 className="m-0 p-0 font-family-ubuntu txt-204148 font-weight-600 medium-txt">
                            A glimpse at our books
                        </h2>
                        <button onClick={goToDiscover} style={{ borderRadius: '60px' }} className="py-1 px-3 bg-252641 clickable">
                            <p className="m-0 p-0 txt-FFF text-center font-family-ubuntu small-txt font-weight-500">
                                <span className="mx-1">See All</span> <span className="mx-1"><BsArrowRight color="#fff" size={20} /></span>
                            </p>
                        </button>
                    </div>
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                        { displayTop5Books }
                    </div>
                </div>

                <div className="mb-lg-5 mb-md-5 pb-5" />

                <div className="d-flex align-items-center justify-content-center flex-column">
                    <div className="mb-5 pb-3 col-lg-8 col-md-8 col-11">
                        <h2 className="m-0 p-0 mb-4 text-center font-family-ubuntu txt-204148 font-weight-600 medium-txt">
                            Popular Features
                        </h2>
                        <p className="m-0 p-0 text-center font-family-poppins txt-000 font-weight-400 regular-txt">
                            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                        </p>
                    </div>
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                        { displayFeatures }
                    </div>
                </div>
            </div>

            <div className="mb-5 pb-5" />

            <div className="bg-252641 d-flex flex-column align-items-center justify-content-center p-5">
                <div className="col-lg-2 col-md-2 col-6 d-flex align-items-center justify-content-between mb-5">
                    <div 
                        style={{
                            borderRight: '1px solid #626381'
                        }} 
                        className="col-lg-5 col-md-5 col-5 p-lg-4 p-md-4 p-2"
                    >
                        <img src={logo} className="col-lg-12 col-md-12 col-12" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-6">
                        <h4 className="m-0 p-0 font-family-galada regular-txt txt-FFF font-weight-500">
                            Education made <br /> simple
                        </h4>
                    </div>
                </div>

                <div className="mb-5">
                    <h3 className="m-0 p-0 mb-3 text-center font-family-ubuntu medium-txt font-weight-600 txt-B2B3CF">
                        {
                            userDetails.details
                            ?
                                'Access your account'
                            :
                                'Become a member on the library'
                        }
                    </h3>
                    <button style={{ borderRadius: '60px' }} className="w-100 p-3 bg-49BBBD txt-FFF font-weight-500 font-family-ubuntu regular-txt">
                        {
                            userDetails.details
                            ?
                                'My profile'
                            :
                                'Register'
                        }
                    </button>
                </div>

                <div>
                    <p className="m-0 p-0 font-family-ubuntu txt-B2B3CF font-weight-400 small-txt">
                        © 2024 Library-Edu Technologies Inc. 
                    </p>
                </div>
            </div>

            <Offcanvas
                show={activeBookOffcanvas.visible}
                onHide={hideActiveBookOffcanvas}
                placement="end"
            >
                <OffcanvasActiveBook 
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                    bookDetails={activeBookOffcanvas.details}
                    hideActiveBookOffcanvas={hideActiveBookOffcanvas}
                />
            </Offcanvas>
        </div>
    )
}