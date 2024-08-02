import React, { useEffect, useState } from "react";
import { GiCancel, GiOpenBook } from 'react-icons/gi'
import { IoMdSave } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { onRequestApi } from "../../../apiRequests/requestApi";
import CustomErrorMsg from "../../../CustomErrorMsg/CustomErrorMsg";
import { Spinner } from "react-bootstrap";


export default function OffcanvasActiveBook({ bookDetails, hideActiveBookOffcanvas, userDetails, setUserDetails, noSaveBtn }){
    
    const navigate = useNavigate()
    const navigateTo = (path, data) => navigate(path, { state: data })

    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })

    useEffect(() => {
        if(apiReqs.data && apiReqs.isLoading){
            const { data } = apiReqs
            makeRequest({ requestInfo: data })
        }
    }, [apiReqs])

    const makeRequest = async ({ requestInfo }) => {
        try {
            
            return await onRequestApi({
                requestInfo,
                successCallBack: saveBookSuccess,
                failureCallback: saveBookFailure
            })

        } catch (error) {
            return saveBookFailure({ errorMsg: 'Error saving beat!' })
        }
    }

    const saveBookSuccess = ({ requestInfo, result }) => {
        if(userDetails.savedBooks){
            const { data } = result
            const updatedsavedBooks = [...userDetails.savedBooks, bookDetails]

            setUserDetails(prev => ({
                ...prev,
                alertModal: { msg: 'Successfully saved book', type: 'success' },
                savedBooks: updatedsavedBooks
            }))

            setApiReqs({ isLoading: false, errorMsg: null, data: null })
        }

        return;
    }

    const saveBookFailure = ({ requestInfo, errorMsg }) => {        
        setUserDetails(prev => ({
            ...prev,
            alertModal: { msg: errorMsg, type: 'error' },
        }))

        setApiReqs({ isLoading: false, errorMsg, data: null })

        return;
    }

    if(bookDetails && userDetails){

        const { details, accessToken } = userDetails
        const { user_id } = details
        const { cover, title, author, description, pdf, book_id  } = bookDetails

        const goToReading = () => navigateTo('/reading-now', bookDetails)

        const saveBook = () => {
            return setApiReqs({
                isLoading: true, 
                errorMsg: null,
                data: {
                    url: '/books/save-book',
                    method: 'post',
                    token: accessToken,
                    data: {
                        user_id, book_id
                    }
                }
            })
        }

        return (
            <div className="offcanvas-active-book-bg h-100 py-3">
                <div className="px-5">
                    <div 
                        onClick={hideActiveBookOffcanvas}
                        className="mb-2 pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <rect x="8.54126" y="28.3403" width="28" height="4.14815" rx="2.07407" transform="rotate(-45 8.54126 28.3403)" fill="white"/>
                            <rect x="28.2319" y="31.1651" width="28" height="4.14815" rx="2.07407" transform="rotate(-135 28.2319 31.1651)" fill="white"/>
                        </svg>                        
                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div 
                            className="img-bg col-lg-7 col-7 mb-3 rounded-3"
                            style={{
                                height: '25vh',
                                backgroundImage: `url(${cover})`,
                            }}
                        />
                        <div className="mb-4">
                            <h3 className="m-0 p-0 mb-2 offcanvas-active-book-title">{title}</h3>
                            <p className="m-0 p-0 offcanvas-active-book-author-text">{author}</p>
                        </div>
                        <div className="mb-5">
                            <p className="m-0 p-0 text-center offcanvas-active-book-preview-text">
                                { description }                               
                            </p>
                        </div>
                        {
                            apiReqs.errorMsg &&
                                <CustomErrorMsg errorMsg={apiReqs.errorMsg} isCentered={true} />
                        }
                        <div className="">
                            <button 
                                onClick={goToReading}
                                disabled={apiReqs.isLoading ? true : false}
                                style={{
                                    opacity: apiReqs.isLoading ? 0.5 : 1
                                }}
                                className="2-100 mb-2 offcanvas-active-book-read-btn d-flex justify-content-center py-2 px-2 pointer"
                            >
                                <div className="mx-1">
                                    <p className="p-0 m-0 offcanvas-active-book-read-btn-text">Read now</p>
                                </div>
                                <div className="mx-1">
                                    <GiOpenBook color="#FFF" size={20} />
                                </div>
                            </button>
                            {
                                !noSaveBtn &&
                                    <button 
                                        onClick={saveBook}
                                        disabled={apiReqs.isLoading ? true : false}
                                        className="w-100 offcanvas-active-book-read-btn bg-transparent d-flex justify-content-center py-2 px-2 pointer"
                                        style={{
                                            border: '1px solid #21B08E',
                                            opacity: apiReqs.isLoading ? 0.5 : 1
                                        }}
                                    >
                                        {
                                            apiReqs.isLoading
                                            ?
                                                <Spinner variant="light" size="sm" />
                                            :
                                                <>
                                                    <div className="mx-1">
                                                        <IoMdSave color="#FFF" size={20} />
                                                    </div>                                
                                                    <div className="mx-1">
                                                        <p className="p-0 m-0 offcanvas-active-book-read-btn-text">Save</p>
                                                    </div>                                        
                                                </>
                                        }
                                    </button>                                
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    } else{
        return <></>
    }
}