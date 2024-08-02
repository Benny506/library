import React from "react";

export default function CustomErrorMsg({ errorMsg }){
    return (
        <p className="custom-error">
            {errorMsg}
        </p>
    )
}