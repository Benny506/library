import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from 'react-router-dom'
import CustomScroll from "../scroll/CustomScroll";
import AlertMsg from "../alertMsg/AlertMsg";
import Home from "./screens/Home";
import Discover from "./screens/discover/Discover";
import './css/main.css'
import Profile from "./screens/profile/Profile";
import Reading from "../reading/Reading";
import SavedBooks from "./screens/savedBooks/SavedBooks";
import MyNotes from "../notes/myNotes/MyNotes";



export default function MainRouter({ 
    allBooks, userDetails, setAllBooks, setUserDetails 
}){

    const location = useLocation()
    const pathname = location.pathname

    const [alertModal, setAlertModal] = useState({ msg: null, type: null })

    useEffect(() => {
        if(userDetails){

            setAlertModal(userDetails.alertModal)
        }
    }, [userDetails])
    
    return (
        <>
            <AlertMsg {...alertModal} setAlertModal={setAlertModal} />
            
            <CustomScroll
                scrollToTopCondition={pathname}
            >
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home 
                                allBooks={allBooks}
                                userDetails={userDetails}
                                setUserDetails={setUserDetails}
                            />
                        }
                    />                   
                    <Route
                        path="/discover"
                        element={
                            <Discover 
                                allBooks={allBooks}
                                userDetails={userDetails}
                                setUserDetails={setUserDetails}
                            />
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <Profile 
                                allBooks={allBooks}
                                userDetails={userDetails}
                                setUserDetails={setUserDetails}
                            />
                        }
                    />
                    <Route
                        path="/reading-now"
                        element={
                            <Reading 
                                allBooks={allBooks}
                                userDetails={userDetails}
                                setUserDetails={setUserDetails}
                            />
                        }
                    />
                    <Route
                        path="/my-library"
                        element={
                            <SavedBooks 
                                allBooks={allBooks}
                                userDetails={userDetails}
                                setUserDetails={setUserDetails}
                            />
                        }
                    />
                    <Route
                        path="/my-notes"
                        element={
                            <MyNotes 
                                allBooks={allBooks}
                                userDetails={userDetails}
                                setUserDetails={setUserDetails}
                            />
                        }
                    />                                                                                                    
                </Routes>             
            </CustomScroll>
        </>       
    )
}