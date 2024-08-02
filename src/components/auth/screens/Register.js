import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logo from '../../../assets/logos/logo1.png'
import { Formik, ErrorMessage } from 'formik'
import { Carousel, Spinner } from "react-bootstrap";
import * as yup from "yup"
import CustomErrorMsg from "../../CustomErrorMsg/CustomErrorMsg";
import { onRequestApi } from "../../apiRequests/requestApi";
import CustomScroll from "../../scroll/CustomScroll";
import { useNavigate } from "react-router-dom";



export default function Register({ setUserDetails }){

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)
    const goToLogin = () => navigateTo('/login')

    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })
    const [passwordVisible, setPasswordVisible] = useState(false)

    const schema = yup.object().shape({
        username: yup.string().max(20, 'Maximum of 20 characters').required("Username required"),
        email: yup.string().email("Must be a valid email address").required("Email required"),
        password: yup.string().required('Password required')
    })

    useEffect(() => {
        if(apiReqs.isLoading && apiReqs.data){
            makeRequest({ requestInfo: apiReqs.data })
        }
    }, [apiReqs])

    const togglePasswordVisibility = () => setPasswordVisible(prev => !prev)

    const makeRequest = async ({ requestInfo }) => {
        try {

            return await onRequestApi({ 
                requestInfo,
                successCallBack: registerSuccessful,
                failureCallback: registerFailure
            })
            
        } catch (error) {
            console.log(error)
            return registerFailure({ errorMsg: 'Error creating account' })
        }
    }

    const registerSuccessful = ({ requestInfo, result }) => {
        setUserDetails(prev => ({
            ...prev,
            alertModal: { msg: 'Registration successful. Login to access your account', type: 'success' }
        }))
        
        return goToLogin()
    }

    const registerFailure = ({ requestInfo, errorMsg }) => {
        setApiReqs({ isLoading: false, data: null, errorMsg })
        return setUserDetails(prev => ({
            ...prev,
            alertModal: { msg: errorMsg, type: 'error' }
        }))
    }

    return (
        <CustomScroll
            scrollToTopCondition={apiReqs.errorMsg}
        >
            <div className="mb-5 pb-3 w-100 d-lg-block d-md-block d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center col-lg-2 col-md-2 col-2">
                    <img src={logo} className="col-lg-10 col-md-10 col-10" />
                </div>
            </div>
            <div className="mb-4 pb-2">
                <h1 className="m-0 p-0 font-family-galada font-weight-600 extra-large-txt txt-000">Register your account!</h1>
                <p className="m-0 p-0 font-family-ubuntu txt-204148 regular-txt font-weight-500">
                    Sign up to gain access to a wide variety of online e-books!
                </p>
            </div>

            {
                apiReqs.errorMsg &&
                    <div className="my-4">
                        <CustomErrorMsg isCentered={true} errorMsg={apiReqs.errorMsg} />
                    </div>
            }

            <Formik
                validationSchema={schema}
                
                initialValues={{
                    username: '', email: '', password: ''
                }}

                onSubmit={(values) => {
                    return setApiReqs({
                        isLoading: true,
                        errorMsg: null,
                        data: {
                            url: 'users/register',
                            method: 'post',
                            data: values
                        }
                    })
                }}
            >
                {({ handleBlur, handleChange, handleSubmit, values, isValid, dirty }) => (
                    <div className="">
                        <div className="w-100 mb-4">
                            <div className="d-flex align-items-center justify-content-between bg-F3F3F3 w-100 p-3 rounded-3">
                                <FaRegUserCircle color="#204148" size={20} />
                                <input 
                                    type="text"
                                    name="username"
                                    placeholder="A Suitable username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="font-family-ubuntu font-weight-500 txt-204148 regular-txt"
                                    style={{
                                        width: '95%'
                                    }}
                                />                                   
                            </div>
                            <ErrorMessage name="username">
                                { error => <CustomErrorMsg errorMsg={error} />}
                            </ErrorMessage> 
                        </div>
                        <div className="w-100 mb-4">
                            <div className="d-flex align-items-center justify-content-between bg-F3F3F3 w-100 p-3 rounded-3">
                                <MdEmail color="#204148" size={20} />
                                <input 
                                    type="email"
                                    name="email"
                                    placeholder="A valid email address"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="font-family-ubuntu font-weight-500 txt-204148 regular-txt"
                                    style={{
                                        width: '95%'
                                    }}
                                />                                   
                            </div>
                            <ErrorMessage name="email">
                                { error => <CustomErrorMsg errorMsg={error} />}
                            </ErrorMessage> 
                        </div>
                        <div className="w-100 mb-5">
                            <div className="d-flex align-items-center justify-content-between bg-F3F3F3 w-100 p-3 rounded-3">
                                <input 
                                    type={passwordVisible ? 'text' : 'password'}
                                    name="password"
                                    placeholder="A convinient password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="font-family-ubuntu font-weight-500 txt-204148 regular-txt"
                                    style={{
                                        width: '95%'
                                    }}
                                />                                   
                                <div className="clickable" onClick={togglePasswordVisibility}>
                                    {
                                        passwordVisible
                                        ?
                                            <FaRegEye color="#000" size={20} />
                                        :
                                            <FaRegEyeSlash color="#204148" size={20} className="clickable" />
                                    }
                                </div> 
                            </div>
                            <ErrorMessage name="password">
                                { error => <CustomErrorMsg errorMsg={error} />}
                            </ErrorMessage> 
                        </div>
                        <div className="mb-2">
                            <p className="m-0 p-0 font-family-galada txt-000 small-txt text-center font-weight-500">
                                By Signing up, you agree to our Terms of Service and Privacy & Cookie Statement
                            </p>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={(!(isValid && dirty)) || apiReqs.isLoading}
                            className="mb-3 w-100 bg-204148 rounded-3 p-3 font-family-ubuntu font-weight-500 small-txt txt-FFF text-center"
                            style={{
                                opacity: (!(isValid && dirty)) || apiReqs.isLoading ? 0.5 : 1
                            }}
                        >
                            {
                                apiReqs.isLoading
                                ?
                                    <span>Creating account... <Spinner size="sm" variant="light" /></span>
                                :
                                    <span>Register</span>
                            }
                        </button>
                        <p className="m-0 p-0 text-center small-txt font-family-ubuntu txt-000 font-weight-500">
                            Already have an account? <span onClick={goToLogin} className="clickable txt-204148 font-family-galada font-weight-500">Login</span>
                        </p>
                    </div>
                )}
            </Formik>
        </CustomScroll>
    )
}