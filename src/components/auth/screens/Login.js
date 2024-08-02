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



export default function Login({ setUserDetails, setAllBooks }){

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)
    const goToRegister = () => navigateTo('/')

    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })
    const [passwordVisible, setPasswordVisible] = useState(false)

    const schema = yup.object().shape({
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
                successCallBack: loginSuccessful,
                failureCallback: loginFailure
            })
            
        } catch (error) {
            console.log(error)
            return loginFailure({ errorMsg: 'Error creating account' })
        }
    }

    const loginSuccessful = ({ requestInfo, result }) => {
        try {
            const { data, accessToken } = result
            const { details, allBooks, savedBooks, myNotes } = data
            const { user_id } = details

            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("user_id", user_id)

            setAllBooks(allBooks)

            setUserDetails(prev => ({
                ...prev,
                alertModal: null,
                details,
                savedBooks,
                myNotes,
                accessToken
            }))

            return setApiReqs({ isLoading: false, data: null, errorMsg: null })

        } catch (error) {
            return loginFailure({ errorMsg: 'Failed to login! Try again later' })
        }
    }

    const loginFailure = ({ requestInfo, errorMsg }) => {
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
                <h1 className="m-0 p-0 font-family-galada font-weight-600 extra-large-txt txt-000">Login to your account!</h1>
                <p className="m-0 p-0 font-family-ubuntu txt-204148 regular-txt font-weight-500">
                    Login to access your very own collection of digital e-books
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
                    email: '', password: ''
                }}

                onSubmit={(values) => {
                    return setApiReqs({
                        isLoading: true,
                        errorMsg: null,
                        data: {
                            url: 'users/login',
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
                                <MdEmail color="#204148" size={20} />
                                <input 
                                    type="email"
                                    name="email"
                                    placeholder="your email address"
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
                                    placeholder="your password"
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
                                    <span>Logging in... <Spinner size="sm" variant="light" /></span>
                                :
                                    <span>Login</span>
                            }
                        </button>
                        <p className="m-0 p-0 text-center small-txt font-family-ubuntu txt-000 font-weight-500">
                            Don't have an account? <span onClick={goToRegister} className="clickable txt-204148 font-family-galada font-weight-500">Register</span>
                        </p>
                    </div>
                )}
            </Formik>
        </CustomScroll>
    )
}