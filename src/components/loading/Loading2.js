import React from "react";
import './css/loading.css'
import { Spinner } from "react-bootstrap";


export default function Loading2(){
    return (
        <div className={
            `d-flex w-100 align-items-center`
        }>
            <Spinner />
        </div>  
    )
}