import React, { useEffect, useState, useRef } from "react";
import Navigation from "../../../navigation/Navigation";
import { Offcanvas } from "react-bootstrap";
import OffcanvasActiveBook from "../discover/OffcanvasActiveBook";


export default function SavedBooks({ userDetails, setUserDetails }){

    const allBooks = useRef(userDetails && userDetails.savedBooks ? userDetails.savedBooks : null)

    const [books, setBooks] = useState()
    const [activeBookOffcanvas, setActiveBookOffcanvas] = useState({ visible: false, details: null })

    useEffect(() => {
        if(userDetails && userDetails.savedBooks){
            const { savedBooks } = userDetails
            setBooks(savedBooks)
        }
    }, [userDetails])


    if(!allBooks.current){
        return (<></>)
    }

    const hideActiveBookOffcanvas = () => setActiveBookOffcanvas({ visible: false, details: null })

    const displaySavedBooks = books && books.length > 0 && books.map((libook, i) => {
        const { cover, title, author } = libook

        const selectBook = () => {
            setActiveBookOffcanvas({ visible: true, details: libook})

            return;
        }

        return (
            <div
                key={i}
                className="col-lg-2 col-md-2 col-5 d-flex align-items-center justify-content-center"
            >
                <div 
                    className="discover-single-book-container col-lg-10 col-md-12 col-12"
                    onClick={selectBook}
                >
                    <div 
                        className="img-bg mb-2 rounded-3"
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
                    allBooks={allBooks.current}
                />
            </div>

            <div className="mb-lg-4 mb-md-4 mb-5"/>
            <div className="mb-3 pb-1"/>

            <div className="p-lg-5 p-md-5 p-2">
                <div style={{ gap: '20px' }} className="d-flex justify-content-lg-start justify-content-md-start justify-content-center align-items-center">
                    {
                        books && books.length > 0
                        ?
                            displaySavedBooks
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
                    noSaveBtn={true}
                />
            </Offcanvas>            
        </div>        
    )
}