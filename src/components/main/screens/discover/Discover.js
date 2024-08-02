import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Offcanvas } from "react-bootstrap";
import OffcanvasActiveBook from "./OffcanvasActiveBook";
import Navigation from "../../../navigation/Navigation";
import '../../css/main.css'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 40
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 90
  }
};



export default function Discover({ allBooks, userDetails, setUserDetails }){

    const [activeBookOffcanvas, setActiveBookOffcanvas] = useState({ visible: false, details: null })
    const [books, setBooks] = useState([])

    useEffect(() => {
        setBooks(allBooks)
    }, [])

    
    const hideActiveBookOffcanvas = () => setActiveBookOffcanvas({ visible: false, details: null })

    const displayLibraryBooks = books && books.length > 0 && books.map((libook, i) => {
        const { cover, title, author } = libook

        const selectBook = () => {
            setActiveBookOffcanvas({ visible: true, details: libook})

            return;
        }

        return (
            <div 
                className="discover-single-book-container"
                onClick={selectBook}
                key={i}
            >
                <div 
                    className="img-bg col-lg-10 col-9 mb-2 rounded-3"
                    style={{
                        height: '32vh',
                        backgroundImage: `url(${cover})`,
                    }}
                >

                </div>
                <div>
                    <h5 className="discover-book-title m-0 p-0 mb-1">{title}</h5>
                    <p className="discover-book-author-name">{author}</p>
                </div>
            </div>            
        )
    })


    return (
        <div className="discover-bg w-100">
            <div className="mb-5 fixed-top">
                <Navigation 
                    userDetails={userDetails} 
                    setBooks={setBooks}
                    books={books}
                    allBooks={allBooks}
                />
            </div>

            <div className="mb-5 pb-5"/>
            <div className="mb-3 pb-1"/>

            <div className="discover-section-container py-2 px-lg-5 px-4 mb-5">
                <div className="mb-4">
                    <h4 className="discover-section-header">Top search</h4>
                </div>
                <div>
                    {
                        books && books.length > 0
                        ?
                            <Carousel
                                additionalTransfrom={0}
                                swipeable={false}
                                draggable={false}
                                showDots={false}
                                partialVisible={true}
                                responsive={responsive}
                                // ssr={true} // means to render carousel on server-side.
                                infinite={true}
                                // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                                autoPlay={true}
                                rewindWithAnimation={true}
                                autoPlaySpeed={3000}
                                keyBoardControl={true}
                                customTransition="all 1.5"
                                transitionDuration={1000}
                                slidesToSlide={1}
                                shouldResetAutoplay={true}
                                pauseOnHover={true}
                                sliderClass=""
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                // itemClass="carousel-item-padding-40-px"
                            >
                                {
                                    displayLibraryBooks
                                }
                            </Carousel>   
                        :
                            <div> 
                                <p className="discover-zero-books">No books found</p>
                            </div>
                    }
                </div>
            </div>

            <div className="discover-section-container py-2 px-lg-5 px-4 mb-5">
                <div className="mb-4">
                    <h4 className="discover-section-header">Recommended for you</h4>
                </div>
                <div className="mb-4">
                    {
                        books && books.length > 0
                        ?
                            <Carousel
                                additionalTransfrom={0}
                                swipeable={false}
                                draggable={false}
                                showDots={false}
                                partialVisible={true}
                                responsive={responsive}
                                // ssr={true} // means to render carousel on server-side.
                                infinite={true}
                                // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                                autoPlay={true}
                                rewindWithAnimation={true}
                                autoPlaySpeed={3000}
                                keyBoardControl={true}
                                customTransition="all 1.5"
                                transitionDuration={1000}
                                slidesToSlide={1}
                                shouldResetAutoplay={true}
                                pauseOnHover={true}
                                sliderClass=""
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                // itemClass="carousel-item-padding-40-px"
                            >
                                {
                                    displayLibraryBooks
                                }
                            </Carousel>   
                        :
                            <div> 
                                <p className="discover-zero-books">No books found</p>
                            </div>
                    }
                </div>
                <div className="mb-4">
                    {
                        books && books.length > 0
                        ?
                            <Carousel
                                additionalTransfrom={0}
                                swipeable={false}
                                draggable={false}
                                showDots={false}
                                partialVisible={true}
                                responsive={responsive}
                                // ssr={true} // means to render carousel on server-side.
                                infinite={true}
                                // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                                autoPlay={true}
                                rewindWithAnimation={true}
                                autoPlaySpeed={3000}
                                keyBoardControl={true}
                                customTransition="all 1.5"
                                transitionDuration={1000}
                                slidesToSlide={1}
                                shouldResetAutoplay={true}
                                pauseOnHover={true}
                                sliderClass=""
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                // itemClass="carousel-item-padding-40-px"
                            >
                                {
                                    displayLibraryBooks
                                }
                            </Carousel>   
                        :
                            <div> 
                                <p className="discover-zero-books">No books found</p>
                            </div>
                    }
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