import React, { useEffect, useState } from "react";
import './css/navigation.css'
import { offCanvasNavLinks } from "./Auxiliary/NavAux";
import { GiCancel } from 'react-icons/gi'
import { useLocation, useNavigate } from "react-router-dom";


export default function OffcanvasNav({ userDetails, allBooks, hideOffcanvasNav }){

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)

    const location = useLocation()
    const pathname = location.pathname.toLowerCase()

    const { details } = userDetails
    const { username, profile } = details

    const [activeNav, setActiveNav] = useState('home')

    useEffect(() => {
        if(pathname.includes('discover')){
            setActiveNav('discover')
        } else if(pathname.includes('my-library')){
            setActiveNav('my library')
        } else if(pathname.includes('my-notes')){
            setActiveNav('my notes')
        } else if(pathname.includes('settings')){
            setActiveNav('settings')
        } else{
            setActiveNav('home')
        }
    }, [pathname])

    const displayNavs = offCanvasNavLinks.map((navlink, i) => {
        const { title, Svg, path } = navlink
        
        const isActive = title.toLowerCase() == activeNav.toLowerCase()

        const goToPath = () => path && navigateTo(path)

        return (
            <div key={i}>
                <div 
                    style={{cursor: 'pointer'}} 
                    onClick={goToPath} 
                    className="d-flex mb-lg-4 mb-3 pb-2 px-5"
                >
                    <div 
                        className=""
                        style={{
                            borderRadius: isActive && "7.778px",
                            background: isActive && '#21B08E',
                            paddingLeft: isActive && '5px',
                            paddingRight: isActive && '5px',
                            paddingTop: isActive && '2px',
                            paddingBottom: isActive && '5px',
                        }}
                    >
                        <Svg 
                            color={isActive ? '#FFF' : '#7A7A7A'}
                        />                    
                    </div>
                    <div className="col-lg-6">
                        <p className="offcanvas-nav-link p-0 m-0 mx-3">{title}</p>
                    </div>
                </div>
                {
                    i == 3 && 
                        <div className="my-lg-5 my-3">
                            <hr  
                                style={{
                                    backgroundColor: '#36575F',
                                    color: '#36575F'
                                }}
                            />
                        </div>
                }           
            </div>
        )
    })

    return(
        <div className="h-100 offcanvas-nav-bg">
            <div className="d-flex justify-content-between px-5 py-4 mb-lg-5 mb-4 align-items-center">
                <div>
                    <div className="d-flex align-items-center">
                        <div className="col-lg-12">
                            <h5 className="p-0 m-0 offcanvas-nav-username mb-2">{username}</h5>
                            <p className="p-0 m-0 offcanvas-nav-usertype-text">
                                <span className="d-flex align-items-center">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <path d="M5.44656 2.05767C4.76934 2.73488 4.38889 3.65338 4.38889 4.61111C4.38889 5.56884 4.76934 6.48734 5.44656 7.16455C6.12377 7.84177 7.04227 8.22222 8 8.22222C8.95773 8.22222 9.87623 7.84177 10.5534 7.16455C11.2307 6.48734 11.6111 5.56884 11.6111 4.61111C11.6111 3.65338 11.2307 2.73488 10.5534 2.05767C9.87623 1.38046 8.95773 1 8 1C7.04227 1 6.12377 1.38046 5.44656 2.05767ZM4.88889 8.77778C3.72488 8.77778 2.60855 9.24018 1.78548 10.0633C0.962399 10.8863 0.5 12.0027 0.5 13.1667C0.5 13.9181 0.798511 14.6388 1.32986 15.1701C1.86122 15.7015 2.58189 16 3.33333 16H12.6667C13.4181 16 14.1388 15.7015 14.6701 15.1701C15.2015 14.6388 15.5 13.9181 15.5 13.1667C15.5 12.0027 15.0376 10.8863 14.2145 10.0633C13.3914 9.24018 12.2751 8.77778 11.1111 8.77778H4.88889Z" stroke="#21B08E"/>
                                        </svg>
                                    </span>
                                    <span className="mx-2">
                                        Student
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>                    
                </div>
                <div
                    className="pointer"
                    onClick={hideOffcanvasNav}
                >
                    <GiCancel color="#FFF" size={30} />
                </div>
            </div>

            <div className="">
                { displayNavs }
            </div>
        </div>
    )
}