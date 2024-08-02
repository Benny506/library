import React, { useEffect, useState } from "react";
import CustomScroll from "../../../scroll/CustomScroll";
import Navigation from "../../../navigation/Navigation";
import { MdEmail, MdWavingHand } from "react-icons/md";
import { FaLock, FaRegEye, FaRegEyeSlash, FaRegUserCircle } from "react-icons/fa";
import { FaScrewdriverWrench } from "react-icons/fa6";
import CustomErrorMsg from "../../../CustomErrorMsg/CustomErrorMsg";
import { onRequestApi, requestApi } from "../../../apiRequests/requestApi";
import { Spinner } from "react-bootstrap";
import { EMAIL_REGEX } from "../../../helpers/regex";


export default function Profile({ userDetails, setBooks, books, allBooks, setUserDetails }){

    const { details, accessToken } = userDetails
    const { username, user_id, email } = details

    const [oldPasswordVisible, setOldPasswordVisible] = useState(false)
    const [newPasswordVisible, setNewPasswordVisible] = useState(false)
    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: { type: null, msg: null } })
    const [usernameInput, setUsernameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [newPasswordInput, setNewPasswordInput] = useState('')
    const [oldPasswordInput, setOldPasswordInput] = useState('')

    const toggleOldPasswordVisibility = () => setOldPasswordVisible(prev => !prev)
    const toggleNewPasswordVisibility = () => setNewPasswordVisible(prev => !prev)

    const onUsernameInput = e => setUsernameInput(e.target.value)
    const onEmailInput = e => setEmailInput(e.target.value)
    const onNewPasswordInput = e => setNewPasswordInput(e.target.value)
    const onOldPasswordInput = e => setOldPasswordInput(e.target.value)

    useEffect(() => {
        if(apiReqs.data && apiReqs.isLoading){
            const { data } = apiReqs
            const { type, requestInfo, successCallBack, failureCallback } = data
            makeRequest({ type, requestInfo, successCallBack, failureCallback })
        }
    }, [apiReqs])

    const makeRequest = async({ type, requestInfo, successCallBack, failureCallback }) => {
        try {

            return await onRequestApi({
                requestInfo,
                successCallBack,
                failureCallback
            })
            
        } catch (error) {
            return failureCallback({ errorMsg: 'Unexpected error' })
        }
    }

    const usernameSaveSuccess = ({ result, requestInfo }) => {
        setUserDetails(prev => ({
            ...prev,
            alertModal: { msg: 'Successfully updated username', type: 'success' },
            details: {
                ...prev.details,
                username: usernameInput
            }
        }))

        setUsernameInput('')

        return setApiReqs({ isLoading: false, data: null, errorMsg: { type: null, msg: null } })
    }

    const usernameSaveFailure = ({ errorMsg }) => {
        setUserDetails(prev => ({
            ...prev,
            alertModal: { msg: errorMsg, type: 'error' }
        }))

        return setApiReqs({ isLoading: false, data: null, errorMsg: { type: 'username', msg: errorMsg } })
    }

    const emailSaveSuccess = ({ result, requestInfo }) => {
        setUserDetails(prev => ({
            ...prev,
            alertModal: { msg: 'Successfully updated email', type: 'success' },
            details: {
                ...prev.details,
                email: emailInput
            }
        }))

        setEmailInput('')

        return setApiReqs({ isLoading: false, data: null, errorMsg: { type: null, msg: null } })
    }

    const emailSaveFailure = ({ errorMsg }) => {
        setUserDetails(prev => ({
            ...prev,
            alertModal: { msg: errorMsg, type: 'error' }
        }))

        return setApiReqs({ isLoading: false, data: null, errorMsg: { type: 'email', msg: errorMsg } })
    }

    const passwordSaveSuccess = ({ result, requestInfo }) => {
        setUserDetails(prev => ({
            ...prev,
            alertModal: { msg: 'Successfully updated password', type: 'success' },
        }))

        setNewPasswordInput('')
        setOldPasswordInput('')

        return setApiReqs({ isLoading: false, data: null, errorMsg: { type: null, msg: null } })
    }

    const passwordSaveFailure = ({ errorMsg }) => {
        setUserDetails(prev => ({
            ...prev,
            alertModal: { msg: errorMsg, type: 'error' }
        }))

        return setApiReqs({ isLoading: false, data: null, errorMsg: { type: 'password', msg: errorMsg } })
    }

    const onSaveEmail = () => {
        if(!emailInput){
            return setApiReqs({ isLoading: false, data: null, errorMsg: { type: 'email', msg: 'No new email found' } })
        }

        if(!emailInput.match(EMAIL_REGEX)){
            return setApiReqs({ isLoading: false, data: null, errorMsg: { type: 'email', msg: 'Must be a valid email address' } })
        }

        return setApiReqs({
            isLoading: true, 
            errorMsg: { type: null, msg: null },
            data: {
                type: 'email',
                successCallBack: emailSaveSuccess,
                failureCallback: emailSaveFailure,
                requestInfo: {
                    url: '/users/edit-email', 
                    method: 'post', 
                    data: {
                        email: emailInput,
                        user_id
                    }, 
                    token: accessToken
                }
            }
        })
    }

    const onSaveUsername = () => {
        if(!usernameInput){
            return setApiReqs({ isLoading: false, data: null, errorMsg: { type: 'username', msg: 'No new username found' } })
        }

        if(usernameInput.length > 20){
            return setApiReqs({ isLoading: false, data: null, errorMsg: { type: 'username', msg: 'Must be less than 20 characters' } })
        }

        return setApiReqs({
            isLoading: true, 
            errorMsg: { type: null, msg: null },
            data: {
                type: 'username',
                successCallBack: usernameSaveSuccess,
                failureCallback: usernameSaveFailure,
                requestInfo: {
                    url: '/users/edit-profile', 
                    method: 'post', 
                    data: {
                        update: {
                            username: usernameInput
                        },
                        user_id
                    }, 
                    token: accessToken
                }
            }
        })
    }

    const onSavePassword = () => {
        if(!oldPasswordInput || !newPasswordInput){
            return setApiReqs({ isLoading: false, data: null, errorMsg: { type: 'password', msg: 'Provide both your old password and your new password' } })
        }

        return setApiReqs({
            isLoading: true, 
            errorMsg: { type: null, msg: null },
            data: {
                type: 'password',
                successCallBack: passwordSaveSuccess,
                failureCallback: passwordSaveFailure,
                requestInfo: {
                    url: '/users/reset-password-from-profile', 
                    method: 'post', 
                    data: {
                        user_id,
                        oldPassword: oldPasswordInput,
                        newPassword: newPasswordInput
                    }, 
                    token: accessToken
                }
            }
        })
    }


    return (
        <CustomScroll>
            <div className="fixed-top">
                <Navigation 
                    userDetails={userDetails} 
                    setBooks={setBooks}
                    books={books}
                    allBooks={allBooks}
                />
            </div>

            <div className="mb-4"/>
            <div className="mb-1 pb-1"/>

            <div className="p-5">
                <div className="mb-5">
                    <h1 className="m-0 p-0 mb-2 text-000 font-family-ubuntu large-txt font-weight-600">
                        Welcome back <span className="font-family-galada txt-21B08E">{username}</span>
                    </h1>
                    <p className="m-0 p-0 txt-000 font-family-ubuntu small-txt font-weight-500">
                        <span> <MdEmail color="#21B08E" size={20} /> </span> <span>Email address: <span className="font-family-galada txt-21B08E">{email}</span> </span>
                    </p>
                </div>

                <div className="col-lg-7 col-md-7 col-12">
                    <div className="mb-5 pb-5">
                        <h3
                            style={{
                                borderLeft: '3px solid #21B08E'
                            }}
                            className="m-0 p-0 py-2 px-3 txt-204148 font-family-ubuntu medium-txt font-weight-500 mb-5"
                        >
                            Edit profile
                        </h3>
                        <div className="mb-4">
                            <div className="d-flex mb-3 align-items-center justify-content-between bg-F3F3F3 w-100 p-3 rounded-3">
                                <FaRegUserCircle color="#204148" size={20} />
                                <input 
                                    type="text"
                                    placeholder="new username"
                                    onInput={onUsernameInput}
                                    value={usernameInput}
                                    className="font-family-ubuntu font-weight-500 txt-204148 regular-txt"
                                    style={{
                                        width: '95%'
                                    }}
                                />                                   
                            </div>
                            {
                                apiReqs.errorMsg.msg && apiReqs.errorMsg.type == 'username'
                                &&
                                    <CustomErrorMsg errorMsg={apiReqs.errorMsg.msg} isCentered={true} />
                            }
                            <button
                                onClick={onSaveUsername}
                                disabled={apiReqs.isLoading ? true : false}
                                className="bg-21B08E px-3 py-2 font-family-ubuntu font-weight-500 txt-FFF small-txt"
                                style={{
                                    borderRadius: '20px',
                                    opacity: apiReqs.isLoading ? 0.5 : 1
                                }}
                            >
                                {
                                    apiReqs.isLoading
                                    ?
                                        <Spinner color="#FFF" size="sm" />   
                                    :
                                        <> <FaScrewdriverWrench color="#FFF" size={20} /> <span className="mx-1">Save</span> </>

                                }
                            </button>
                        </div>
                        <div className="mb-4">
                            <div className="d-flex mb-3 align-items-center justify-content-between bg-F3F3F3 w-100 p-3 rounded-3">
                                <MdEmail color="#204148" size={20} />
                                <input 
                                    type="email"
                                    value={emailInput}
                                    onChange={onEmailInput}
                                    placeholder="new email address"
                                    className="font-family-ubuntu font-weight-500 txt-204148 regular-txt"
                                    style={{
                                        width: '95%'
                                    }}
                                />                                   
                            </div>
                            {
                                apiReqs.errorMsg.msg && apiReqs.errorMsg.type == 'email'
                                &&
                                    <CustomErrorMsg errorMsg={apiReqs.errorMsg.msg} isCentered={true} />
                            }                            
                            <button
                                onClick={onSaveEmail}
                                disabled={apiReqs.isLoading ? true : false}
                                className="bg-21B08E px-3 py-2 font-family-ubuntu font-weight-500 txt-FFF small-txt"
                                style={{
                                    borderRadius: '20px',
                                    opacity: apiReqs.isLoading ? 0.5 : 1
                                }}
                            >
                                {
                                    apiReqs.isLoading
                                    ?
                                        <Spinner color="#FFF" size="sm" />   
                                    :
                                        <> <FaScrewdriverWrench color="#FFF" size={20} /> <span className="mx-1">Save</span> </>

                                }
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3
                            style={{
                                borderLeft: '3px solid #21B08E'
                            }}
                            className="m-0 p-0 py-2 px-3 txt-204148 font-family-ubuntu medium-txt font-weight-500 mb-5"
                        >
                            Security information
                        </h3>
                        <div className="d-flex mb-3 align-items-center justify-content-between bg-F3F3F3 w-100 p-3 rounded-3">
                            <FaLock color="#204148" size={20} />
                            <input 
                                type={oldPasswordVisible ? "text" : 'password'}
                                placeholder="old password"
                                value={oldPasswordInput}
                                onChange={onOldPasswordInput}
                                className="font-family-ubuntu font-weight-500 txt-204148 regular-txt"
                                style={{
                                    width: '90%'
                                }}
                            />
                            <div className="clickable" onClick={toggleOldPasswordVisibility}>
                                {
                                    oldPasswordVisible
                                    ?
                                        <FaRegEye color="#000" size={20} />
                                    :
                                        <FaRegEyeSlash color="#204148" size={20} className="clickable" />
                                }
                            </div>                                                               
                        </div>
                        <div className="d-flex mb-3 align-items-center justify-content-between bg-F3F3F3 w-100 p-3 rounded-3">
                            <FaLock color="#204148" size={20} />
                            <input 
                                type={newPasswordVisible ? "text" : 'password'}
                                placeholder="new password"
                                value={newPasswordInput}
                                onChange={onNewPasswordInput}
                                className="font-family-ubuntu font-weight-500 txt-204148 regular-txt"
                                style={{
                                    width: '90%'
                                }}
                            />
                            <div className="clickable" onClick={toggleNewPasswordVisibility}>
                                {
                                    newPasswordVisible
                                    ?
                                        <FaRegEye color="#000" size={20} />
                                    :
                                        <FaRegEyeSlash color="#204148" size={20} className="clickable" />
                                }
                            </div>                                                               
                        </div>
                        {
                            apiReqs.errorMsg.msg && apiReqs.errorMsg.type == 'password'
                            &&
                                <CustomErrorMsg errorMsg={apiReqs.errorMsg.msg} isCentered={true} />
                        }                        
                        <button
                            disabled={apiReqs.isLoading ? true : false}
                            onClick={onSavePassword}
                            className="bg-21B08E px-3 py-2 font-family-ubuntu font-weight-500 txt-FFF small-txt"
                            style={{
                                borderRadius: '20px',
                                opacity: apiReqs.isLoading ? 0.5 : 1
                            }}
                        >
                            {
                                apiReqs.isLoading
                                ?
                                    <Spinner color="#FFF" size="sm" />   
                                :
                                    <> <FaScrewdriverWrench color="#FFF" size={20} /> <span className="mx-1">Save</span> </>

                            }
                        </button>
                    </div>                    
                </div>
            </div>          
        </CustomScroll>
    )
}