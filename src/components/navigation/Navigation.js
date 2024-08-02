import React, { useState } from "react";
import logo from '../../assets/logos/logo1.png'
import { A_Z } from "../dummyDb/dummyDb";
import { BiSearch } from 'react-icons/bi'
import { RxHamburgerMenu } from 'react-icons/rx'
import a_z_img from '../../assets/navigation/a_z.png'
import userprofile from '../../assets/profile/userprofile.jpg'
import './css/navigation.css'
import { Offcanvas } from "react-bootstrap";
import OffcanvasNav from "./OffcanvasNav";
import OffcanvasSearch from "./OffcanvasSearch";
import { useLocation, useNavigate } from "react-router-dom";



export default function Navigation({ userDetails, books, setBooks, allBooks }){

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)
    const goToDiscover = () => navigateTo('/discover')

    const location = useLocation()
    const { pathname } = location

    const [offcanvasNav, setOffcanvasNav] = useState({ visible: false })
    const [searchOffcanvas, setSearchOffcanvas] = useState({ visible: false })
    const [searchInput, setSearchInput] = useState('')
    const [alphaFilter, setAlphaFilter] = useState('')


    const hideOffCanvasNav = () => setOffcanvasNav({ visible: false })
    const showOffCanvasNav = () => setOffcanvasNav({ visible: true })

    const toggleOffCanvasNav = () => setOffcanvasNav(prev => ({ ...prev, visible: !prev.visible }))

    const hideSearchOffcanvas = () => setSearchOffcanvas({ visible: false })
    const toggleSearchOffcanvas = () => setSearchOffcanvas(prev => ({...prev, visible: !prev.visible}))

    const displayAlphabetOpts = A_Z.map((letter, i) => (
        <option 
            key={i}
            value={letter.toLowerCase()}
        >
            {letter}
        </option>
    ))

    const onUserInput = (e) => {
        if(e){
            setSearchInput(e.target.value)
            setAlphaFilter('')
        }

        return;
    }

    const onUserAlphaFilter = (e) => {
        if(e){
            setAlphaFilter(e.target.value)
            setSearchInput('')
        }

        return;
    }

    const filterBooks = () => {
        const filter = searchInput ? searchInput.toLowerCase() : alphaFilter.toLowerCase()

        if(filter){
            const filteredBooks = allBooks.filter(book => 
                book.title.toLowerCase().includes(filter)
                ||
                filter.includes(book.title.toLowerCase())
            )
    
            setBooks(filteredBooks)

        } else{
            setBooks(allBooks)
        }

        setSearchInput('')
        setSearchInput('')

        return hideSearchOffcanvas()
    }

    return (  
        <div className="navigation-container">
            <div className="d-lg-flex d-none justify-content-between align-items-center py-2 px-5">
                <div className="d-flex justify-content-between align-items-center col-lg-8">
                    <div className="col-lg-2 d-flex justify-content-between align-items-center border-right-green">
                        <div className="col-lg-7 col-7">
                            <img className="col-lg-5 col-5" src={logo} />
                        </div>
                        <div className="col-lg-7">
                            <h1 className="navigation-title m-0 p-0">Library</h1>
                        </div>
                    </div>
                    {
                        (
                            pathname.toLowerCase().includes('discover') 
                            ||
                            pathname.toLowerCase().includes('my-library')
                            ||
                            pathname.toLowerCase().includes('my-notes')
                        )
                        &&                        
                            <div className="col-lg-9 d-flex justify-content-between align-items-center">
                                <div className="col-lg-6 navigation-input-container d-flex px-2 align-items-center">
                                    <div className="" style={{width: '10%'}}>
                                        <BiSearch size={18} color="#7A7A7A" />
                                    </div>
                                    <div className="mx-1" style={{width: '90%'}}>
                                        <input 
                                            onInput={onUserInput}
                                            value={searchInput}
                                            placeholder="Explore" 
                                            className="w-100" 
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-2 px-2 py-1 d-flex justify-content-between align-items-center navigation_a-z_container">
                                    <select 
                                        name="a_z" 
                                        className="col-lg-7" 
                                        value={alphaFilter}
                                        onInput={onUserAlphaFilter}
                                    >
                                        <option style={{ backgroundColor: "#F7F7F7" }} value={''}>A-Z</option>
                                        {
                                            displayAlphabetOpts
                                        }
                                    </select>
                                    <div className="col-lg-2">
                                        <img src={a_z_img} className="col-lg-10" />
                                    </div>
                                </div>
                                <button 
                                    className="col-lg-3 navigation-button navigation-button-text px-3 py-2"
                                    onClick={filterBooks}
                                >
                                    Search
                                </button>
                            </div>                        
                    }
                </div>


                <div className="col-lg-3 d-flex justify-content-between align-items-center">
                    <div className="col-lg-7 d-flex align-items-center">
                        <div className="col-lg-7">
                            <p className="m-0 p-0 navigation-username">{userDetails.details.username}</p>
                        </div>
                        <div className="col-lg-5 col-5">
                            <img className="col-lg-5 col-5 rounded-3" src={userDetails.details.profile} />
                        </div>
                    </div>
                    <div className="col-lg-4 pointer" onClick={toggleOffCanvasNav}>
                        <RxHamburgerMenu size={25} color="#204148" />
                    </div>
                </div>
            </div>


            <div className="d-lg-none d-block col-auto">
                <div className="d-flex justify-content-between align-items-center px-4 py-2">
                    <div className="col-2 d-flex align-items-center justify-content-start">
                        {
                            pathname.toLowerCase().includes("discover")
                            ?
                                <BiSearch onClick={toggleSearchOffcanvas} size={28} color="#7A7A7A" />
                            :
                                <div className="d-flex justify-content-start align-items-center col-lg-12">
                                    <img className="col-8" src={logo} />
                                </div>
                        }
                    </div>
                    <div className="col-8">
                        {
                            pathname.toLowerCase().includes('discover')
                            ?
                                <div className="d-flex justify-content-center align-items-center col-lg-12">
                                    <img className="col-2" src={logo} />
                                </div>
                            :                        
                                <h1 className="m-0 text-center p-0 large-txt font-family-galada font-weight-600 txt-204148">
                                    Library
                                </h1>
                        }
                    </div>
                    <div className="col-2 d-flex align-items-center justify-content-end">
                        <div className="pointer" onClick={toggleOffCanvasNav}>
                            <RxHamburgerMenu size={28} color="#204148" />
                        </div>
                    </div>
                </div>
            </div>




            <Offcanvas
                show={offcanvasNav.visible}
                onHide={hideOffCanvasNav}
            >
                <OffcanvasNav 
                    userDetails={userDetails}
                    books={books}
                    hideOffcanvasNav={hideOffCanvasNav}
                />
            </Offcanvas>

            <Offcanvas
                show={searchOffcanvas.visible}
                onHide={hideSearchOffcanvas}
                placement="start"
            >
                <OffcanvasSearch 
                    hideSearchOffcanvas={hideSearchOffcanvas}
                    allBooks={allBooks}
                    setBooks={setBooks}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    alphaFilter={alphaFilter}
                    setAlphaFilter={setAlphaFilter}
                    onUserAlphaFilter={onUserAlphaFilter}
                    onUserInput={onUserInput}
                    filterBooks={filterBooks}        
                />
            </Offcanvas>            
        </div>
    )
}