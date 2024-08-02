import React, { useState } from "react";
import logo from '../../assets/logos/logo1.png'
import { BiSearch } from "react-icons/bi";
import { GiCancel } from "react-icons/gi"
import './css/navigation.css'
import { A_Z } from "../dummyDb/dummyDb";
import a_z_img from '../../assets/navigation/a_z.png'


export default function OffcanvasSearch({ 
    hideSearchOffcanvas, searchInput, alphaFilter, onUserAlphaFilter,
    onUserInput, filterBooks
}){

    const displayAlphabetOpts = A_Z.map((letter, i) => (
        <option 
            key={i}
            value={letter.toLowerCase()}
        >
            {letter}
        </option>
    ))
    
    return (
        <div className="offcanvas-search-bg h-100 py-3 px-5">
            <div className="d-flex justify-content-between align-items-start">
                <div className="col-2 d-flex align-items-center mb-5">
                    <div className="col-10">
                        <img className="col-12" src={logo} />
                    </div>
                    <div className="mx-3">
                        <h1 className="navigation-title m-0 p-0">Library</h1>
                    </div>
                </div>
                <div>
                    <GiCancel onClick={hideSearchOffcanvas} size={20} color={"#000"} />
                </div>
            </div>

            <div className="mb-5">
                <div className="navigation-input-container d-flex px-2 align-items-center">
                    <div className="" style={{width: '10%'}}>
                        <BiSearch size={18} color="#7A7A7A" />
                    </div>
                    <div className="mx-1" style={{width: '90%'}}>
                        <input 
                            placeholder="Explore" 
                            className="p-1 w-100" 
                            onInput={onUserInput}
                            value={searchInput}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-5 col-4 p-2 py-1 navigation_a-z_container">
                <select 
                    name="a_z" 
                    className="col-12"
                    value={alphaFilter}
                    onInput={onUserAlphaFilter}                
                >
                    <option style={{ backgroundColor: "#F7F7F7" }} value={''}>A-Z</option>
                    {
                        displayAlphabetOpts
                    }
                </select>
            </div>


            <button 
                className="col-5 navigation-button navigation-button-text px-3 py-2"
                onClick={filterBooks}
            >
                Search
            </button>            
        </div>
    )
}