import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { library_books } from './components/dummyDb/dummyDb';
import MainRouter from './components/main/MainRouter';
import SplashScreen from './components/splashscreen/SplashScreen';
import AuthRouter from './components/auth/AuthRouter';
import { onRequestApi } from './components/apiRequests/requestApi';
import PdfReader from './components/pdfReader/PdfReader';

function App() {

  const navigate = useNavigate()
  const navigateTo = (path) => navigate(path)
  const goToInitialRoute = () => navigateTo('/')

  const location = useLocation()
  const pathname = location.pathname

  const user_id = localStorage.getItem("user_id")
  const accessToken = localStorage.getItem('accessToken')

  const [isLoading, setIsLoading] = useState(true)
  const [allBooks, setAllBooks] = useState()
  const [userDetails, setUserDetails] = useState({ details: null })

  useEffect(() => {
    if(user_id && accessToken && !userDetails.details){
      initialFetch()
    
    } else if(userDetails.details) {
      // goToInitialRoute()

    } else {
      setIsLoading(false)
    }
  }, [pathname])

  useEffect(() => {
    if(userDetails){
      const { alertModal } = userDetails
      if(alertModal && alertModal.initialRoute){
          goToInitialRoute()
      }
    }
  }, [userDetails])

  const initialFetch = async () => {
    try {
      
      return await onRequestApi({
        requestInfo: {
          url: 'users/retrieve-single-user', 
          method: 'post', 
          data: {
            user_id
          }, 
          token: accessToken
        },
        successCallBack: initialFetchSuccess,
        failureCallback: initialFetchFailure
      })

    } catch (error) {
      initialFetchFailure()
    }
  }

  const initialFetchSuccess = ({ result }) => {
    try {
      
      setIsLoading(false)
      goToInitialRoute()

      const { data, accessToken } = result

      const { details, allBooks, savedBooks, myNotes } = data

      setAllBooks(allBooks)

      return setUserDetails({
        details,
        accessToken,
        savedBooks,
        myNotes
      })
      
    } catch (error) {
      return initialFetchFailure()
    }
  }

  const initialFetchFailure = () => {
    setIsLoading(false)
    return setUserDetails(prev => ({
      ...prev,
      alertModal: { msg: 'Automatic login failed! Login manually', err: '' }
    }))
  }

  if(isLoading){
    return (
      <SplashScreen />
    )
  }

  if(allBooks && userDetails && userDetails.details){
    return (
      <MainRouter 
        allBooks={allBooks}
        setAllBooks={setAllBooks}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
    )
  } else{
    return(
      <AuthRouter 
        setUserDetails={setUserDetails}
        userDetails={userDetails}
        setAllBooks={setAllBooks}
      />
    )
  }

}

export default App;