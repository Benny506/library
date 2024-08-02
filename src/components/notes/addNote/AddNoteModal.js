import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { GiCancel } from 'react-icons/gi'
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdOutlineEditNote, MdSave } from "react-icons/md";
import CustomErrorMsg from "../../CustomErrorMsg/CustomErrorMsg";
import { onRequestApi } from "../../apiRequests/requestApi";


export default function AddNoteModal({ modalProps, bookDetails, setUserDetails, userDetails }){

    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })
    const [note, setNote] = useState('')

    useEffect(() => {
        if(apiReqs.isLoading && apiReqs.data){
            const { data } = apiReqs
            makeRequest({ requestInfo: data })
        }
    }, [apiReqs])

    const makeRequest = async ({ requestInfo }) => {
        try {

            return await onRequestApi({ 
                requestInfo,
                successCallBack: onSaveNoteSuccess,
                failureCallback: onSaveNoteFailure
            })
            
        } catch (error) {
            return onSaveNoteFailure({ errorMsg: 'Error saving note' })
        }
    }

    const onSaveNoteSuccess = ({ requestInfo, result }) => {
        if(setUserDetails && userDetails && bookDetails){
            setUserDetails(prev => ({
                ...prev,
                alertModal: { msg: 'Successfully saved note', type: 'success' },
                myNotes: [
                    ...prev.myNotes, 
                    {
                        user_id: userDetails.details.user_id,
                        note,
                        date: new Date(),
                        ...bookDetails
                    }
                ]
            }))

            setNote('')
            setApiReqs({ isLoading: false, data: null, errorMsg: null })
        }

        return;
    }

    const onSaveNoteFailure = ({ errorMsg, requestInfo }) => {
        if(setUserDetails && userDetails && bookDetails){
            setUserDetails(prev => ({
                ...prev,
                alertModal: { msg: errorMsg, type: 'error' }
            }))

            setApiReqs({ isLoading: false, data: null, errorMsg })
        }

        return;
    }

    if(modalProps && bookDetails && userDetails){

        const { hide, visible, size } = modalProps
        const { title, book_id } = bookDetails
        const { details, accessToken } = userDetails
        const { user_id } = details

        const onNoteInput = (e) => setNote(e.target.value)

        const saveNote = () => {
            if(!note){
                return setApiReqs({ isLoading: false, data: null, errorMsg: 'No note provided' })
            }
            if(note.length == 1000){
                return setApiReqs({ isLoading: false, data: null, errorMsg: 'Must be less than 1000 characters' })
            }

            return setApiReqs({ 
                isLoading: true,
                errorMsg: null,
                data: {
                    url: 'books/notes/add',
                    method: 'post',
                    data: {
                        user_id, book_id, note
                    },
                    token: accessToken
                }
            })
        }

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
                            <span>Add</span> <span className="txt-21B08E">Note</span>
                        </h1>
                        <div onClick={hide} className="clickable">
                            <GiCancel color="#000" size={25} />
                        </div>
                    </div>

                    <div className="mb-4">
                        <h2 className="m-0 p-0 txt-000 font-family-ubuntu regular-txt font-weight-600">
                            Note on <span className="txt-21B08E font-family-galada">{title}</span>
                        </h2>
                    </div>

                    {
                        apiReqs.errorMsg &&
                            <div className="mb-3">
                                <CustomErrorMsg errorMsg={apiReqs.errorMsg} isCentered={true} />
                            </div>
                    }

                    <div className="w-100 mb-4">
                        <div className="d-flex align-items-start justify-content-between bg-F3F3F3 w-100 p-3 rounded-3">
                            <MdOutlineEditNote color="#204148" size={28} />
                            <textarea 
                                placeholder="Enter your note here"
                                className="font-family-ubuntu font-weight-500 txt-204148 regular-txt"
                                onInput={onNoteInput}
                                value={note}
                                style={{
                                    width: '95%',
                                    height: '30vh'
                                }}
                            />                                   
                        </div>
                    </div>

                    <button
                        onClick={saveNote}
                        disabled={apiReqs.isLoading}
                        className="mb-3 w-100 bg-204148 rounded-3 p-3 font-family-ubuntu font-weight-500 small-txt txt-FFF text-center"
                        style={{
                            opacity: apiReqs.isLoading ? 0.5 : 1
                        }}
                    >
                        {
                            apiReqs.isLoading
                            ?
                                <span>Saving... <Spinner size="sm" variant="light" /></span>
                            :
                                <span> <span className="mx-1"><MdSave color="#FFF" size={20} /></span> Save</span>
                        }
                    </button>                                                            
                </div>
            </Modal>
        )
    }
}