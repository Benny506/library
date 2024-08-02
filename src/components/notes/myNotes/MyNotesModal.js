import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import { FaTrash } from "react-icons/fa";
import CustomErrorMsg from "../../CustomErrorMsg/CustomErrorMsg";
import { onRequestApi } from "../../apiRequests/requestApi";


export default function MyNotesModal({ modalProps, userDetails, setUserDetails }){

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
                successCallBack: deleteNoteSuccessful,
                failureCallback: deleteNoteFailure
            })
            
        } catch (error) {
            return deleteNoteFailure({ errorMsg: 'Error deleting note' })
        }
    }

    const deleteNoteSuccessful = ({ result, requestInfo }) => {
        const { data } = result
        const { note_id } = data

        const filteredNotes = userDetails.myNotes.filter(note => note.note_id != note_id)

        setUserDetails(prev => ({
            ...prev,
            alertModal: { msg: 'Successfully deleted note', type: 'success' },
            myNotes: filteredNotes
        }))

        setApiReqs({ isLoading: false, data: null, errorMsg: null })

        return;
    }

    const deleteNoteFailure = ({ errorMsg, requestInfo }) => {
        setUserDetails(prev => ({
            ...prev,
            alertModal: { msg: errorMsg, type: 'error' },
        }))

        setApiReqs({ isLoading: false, data: null, errorMsg })

        return
    }

    if(modalProps && userDetails && setUserDetails){
        
        const { visible, hide, savedBook, size } = modalProps

        if(!savedBook || !userDetails.myNotes){
            return hide && hide()
        }


        const { details, accessToken } = userDetails
        const { user_id } = details
        const { title, book_id } = savedBook
        
        const savedBookNotes = userDetails.myNotes.filter(note => note.book_id == book_id)

        const deleteNote = ({ note_id }) => {
            return setApiReqs({
                isLoading: true,
                errorMsg: null, 
                data: {
                    url: 'books/notes/delete-note',
                    method: 'post',
                    token: accessToken,
                    data: {
                        user_id, note_id
                    }
                }
            })
        }
        
        const displayNotes = savedBookNotes.map((savedNote, i) => {
            const { note, date, note_id } = savedNote

            const onDeleteNote = () => deleteNote({ note_id })

            return (
                <div
                    key={i}
                    className="discover-section-container px-4 py-2 mb-4"
                >
                    <p className="m-0 p-0 mb-2 font-family-ubuntu txt-000 font-weight-500 regular-txt d-flex align-items-start">
                        <span className="txt-21B08E">{i+1}</span> <span className="mx-2">{ note }</span>
                    </p>
                    <p className="m-0 p-0 text-end font-family-galada small-txt font-weight-600 fst-italic txt-21B08E">
                        { new Date(date).toDateString() }
                    </p>
                    <div className="d-flex align-items-center justify-content-end">
                        {
                            apiReqs.isLoading
                            ?
                                <Spinner color="#21B08E" size="sm" />
                            :
                                <p onClick={onDeleteNote} className="m-0 p-0 pb-1 text-end clickable">
                                    <FaTrash size={15} color="#a71313" />
                                </p>                            
                        }
                    </div>
                </div>                    
            )
        })

        return (
            <Modal
                show={visible}
                onHide={hide}
                backdrop="static"
                size={size || 'md'}
            >
                <div className="px-3">
                    <div className="mb-4 d-flex align-items-center justify-content-between">
                        <h1 className="font-family-galada txt-000 font-weight-600 medium-txt">
                            <span>Notes on</span> <span className="txt-21B08E"> { title } </span>
                        </h1>
                        <div onClick={hide} className="clickable">
                            <GiCancel color="#000" size={25} />
                        </div>
                    </div>
                    {
                        apiReqs.errorMsg
                        &&
                            <div className="mb-4">
                                <CustomErrorMsg errorMsg={apiReqs.errorMsg} isCentered={true} />
                            </div>
                    }
                    {
                        savedBookNotes.length > 0
                        ?
                            <div>
                                { displayNotes }
                            </div>
                        :
                            <div> 
                                <p className="discover-zero-books">No notes found</p>
                            </div>                        
                    }
                </div>
            </Modal>
        )
    }
}