import React from "react";


export default function CustomErrorMsg({ isCentered, errorMsg }){
    return (
        <div className="my-2">
            <p 
                className={`${isCentered && 'text-center'} m-0 p-0 font-weight-500 font-family-ubuntu small-txt txt-A71313`}
            >
                {errorMsg}
            </p>
        </div>
    )
}