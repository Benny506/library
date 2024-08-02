import React, { useEffect, useReducer } from "react";
import { FaCheck, FaInfoCircle  } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";


export default function AlertMsg({ msg, type, setAlertModal }){

    useEffect(() => {
        if(msg && type){
            const alertContainer = document.querySelector('.fancy-alert')

            if(alertContainer){
                const firstTimeout = setTimeout(function() {
                    alertContainer.classList.add('fancy-alert__active')
                    clearTimeout(firstTimeout)
                }, 10);

                const secondTimeout = setTimeout(function() {
                    alertContainer.classList.add('fancy-alert__extended')
                    clearTimeout(secondTimeout)
                }, 500);

                const thirdTimeOut = setTimeout(function() {
                    alertContainer.classList.remove('fancy-alert__extended')
                    clearTimeout(thirdTimeOut)
                }, 2000)

                const fourthTimeout = setTimeout(function() {
                    alertContainer.classList.remove('fancy-alert__active')

                    setAlertModal({
                        msg: null,
                        type: null
                    })

                    clearTimeout(fourthTimeout)
                }, 2500)                

            }
        }
    }, [type, msg])

    if(type && msg){
        return (
            <div className={`fancy-alert ${type} `}>
                <div className="">
                    <i className="fancy-alert--icon">
                        { type == 'success' &&  <FaCheck color="#fff" size={20} /> }
                        { type == 'error' &&  <IoIosWarning color="#fff" size={25} /> }
                        { type == 'info' &&  <FaInfoCircle  color="#fff" size={20} /> }
                    </i>
                    <div className="fancy-alert--content">
                        <div className="fancy-alert--words">{msg}</div>
                    </div>
                </div>
            </div>
        )
    }
}