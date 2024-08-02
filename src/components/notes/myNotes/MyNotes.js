import React, { useEffect, useRef, useState } from "react";
import Navigation from "../../navigation/Navigation";
import MyNotesModal from "./MyNotesModal";


export default function MyNotes({ userDetails, setUserDetails }){

    const allBooks = useRef(userDetails && userDetails.savedBooks ? userDetails.savedBooks : null)

    const [books, setBooks] = useState([])
    const [myNotesModal, setMyNotesModal] = useState({ visible: false, hide: null, size: 'md', savedBook: null })

    useEffect(() => {
        if(userDetails && userDetails.savedBooks){
            const { savedBooks } = userDetails
            setBooks(savedBooks)
        }
    }, [userDetails])

    if(!allBooks.current){
        return (<></>)
    }

    const hideMyNotesModal = () => setMyNotesModal({ visible: false, hide: null, size: 'md', savedBook: null })

    const displaySavedBooks = books && books.length > 0 && books.map((libook, i) => {
        const { cover, title, author } = libook

        const selectBook = () => {
            setMyNotesModal({ visible: true, hide: hideMyNotesModal, size: 'md', savedBook: libook })

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
                    allBooks={allBooks.current}
                    books={books}
                    setBooks={setBooks}
                />
            </div>

            <div className="mb-5 mb-lg-4 mb-md-4"/>
            <div className="mb-lg-3 mb-md-3 mb-4 pb-1"/>

            <div className="p-lg-5 p-md-5 p-3">
                <div className="mb-5">
                    <h3
                        style={{
                            borderLeft: '3px solid #21B08E'
                        }}
                        className="m-0 p-0 py-2 px-3 mb-2 txt-204148 font-family-ubuntu medium-txt font-weight-500 mb-3"
                    >
                        My notes
                    </h3>
                    <p className="m-0 p-0 txt-000 font-family-ubuntu font-weight-500 regular-txt">
                        Tap on one of your saved books to view all notes under that book
                    </p>
                </div>

                <div style={{ gap: '20px' }} className="d-flex justify-content-lg-start justify-content-md-start justify-content-center align-items-center">
                    {
                        books && books.length > 0 
                        ?
                            displaySavedBooks
                        :
                            <div> 
                                <p className="discover-zero-books">No saved books found</p>
                            </div>                        
                    }
                </div>
            </div>

            <MyNotesModal 
                modalProps={myNotesModal}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
            />
        </div>
    )
}