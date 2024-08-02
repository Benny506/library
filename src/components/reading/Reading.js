import React from "react";
import Navigation from "../navigation/Navigation";
import { useLocation, useNavigate } from "react-router-dom";
import PdfReader from "../pdfReader/PdfReader";
import AddNote from "../notes/addNote/AddNote";


export default function Reading({ userDetails, setBooks, books, allBooks, setUserDetails }){

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)
    const goHome = () => navigateTo('/')

    const location = useLocation()
    const { state } = location

    if(!state || !state.pdf){
        goHome()
        return <></>
    }

    const { title, author, description, cover } = state

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

            <div className="mb-5 mb-lg-4 mb-md-4"/>
            <div className="mb-lg-3 mb-md-3 mb-4 pb-1"/>

            <div className="p-lg-5 p-md-5 p-3">
                <h3
                    style={{
                        borderLeft: '3px solid #21B08E'
                    }}
                    className="m-0 p-0 py-2 px-3 txt-204148 font-family-ubuntu medium-txt font-weight-500 mb-3"
                >
                    Reading now
                </h3>
                <div className="d-lg-flex d-md-flex d-block align-items-start">
                    <div className="col-lg-2 mb-lg-0 mb-md-0 mb-2">
                        <img src={cover} className="col-lg-12" />
                    </div>
                    <div className="mx-lg-3 mx-md-3 mx-0">
                        <h5 className="m-0 p-0 mb-2 font-family-ubuntu medium-txt txt-000 font-weight-500">
                            { title }
                        </h5>
                        <p className="m-0 p-0 font-family-galada small-txt txt-21B08E font-weight-600">
                            { author }
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-3 mb-5 pb-5 d-flex align-items-center justify-content-center">
                <PdfReader />
            </div>


            <AddNote 
                bookDetails={state} 
                setUserDetails={setUserDetails} 
                userDetails={userDetails}
            />
        </div>
    )
}