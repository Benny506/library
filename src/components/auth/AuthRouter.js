import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./screens/Register";
import './css/auth.css'
import AlertMsg from "../alertMsg/AlertMsg";
import CustomScroll from "../scroll/CustomScroll";
import carouselImg1 from '../../assets/auth/carousel-img-1.jpg'
import carouselImg2 from '../../assets/auth/carousel-img-2.jpg'
import carouselImg3 from '../../assets/auth/carousel-img-3.jpg'
import carouselImg4 from '../../assets/auth/carousel-img-4.jpg'
import { Carousel } from "react-bootstrap";
import Login from "./screens/Login";


const carouselImages = [carouselImg1, carouselImg2, carouselImg3, carouselImg4]


export default function AuthRouter({ setUserDetails, userDetails, setAllBooks }){

    const location = useLocation()
    const pathname = location.pathname

    const [alertModal, setAlertModal] = useState({ msg: null, type: null })

    useEffect(() => {
        if(userDetails){

            setAlertModal(userDetails.alertModal)
        }
    }, [userDetails])

    const displayCarouselImages = carouselImages.map((c_img, i) => (
        <Carousel.Item key={i}>
            <img src={c_img} className="col-lg-12" style={{ minHeight: '150vh' }} />
        </Carousel.Item>
    ))

    return (
        <>
            <AlertMsg {...alertModal} setAlertModal={setAlertModal} />

            <CustomScroll
                scrollToTopCondition={pathname}
            >
                <div className="d-flex justify-content-between">
                    <div className="col-lg-4 col-md-4 d-lg-block d-md-block d-none">
                        <Carousel
                            fade={true}
                            interval={2000}
                            controls={false}
                        >
                            { displayCarouselImages }
                        </Carousel>
                    </div>

                    <div className="col-lg-8 col-md-8 col-12 px-lg-5 px-md-4 px-2 d-flex flex-column align-items-stretch justify-content-center">
                        <div className="p-lg-5 p-md-5 p-3">
                            <Routes>
                                <Route 
                                    path="/"
                                    element={
                                        <Register 
                                            setUserDetails={setUserDetails}
                                        />
                                    }
                                />

                                <Route 
                                    path="/login"
                                    element={
                                        <Login 
                                            setUserDetails={setUserDetails}
                                            setAllBooks={setAllBooks}
                                        />
                                    }
                                />
                            </Routes>  
                        </div>
                    </div>
                </div> 
            </CustomScroll>     
        </>
    )
}