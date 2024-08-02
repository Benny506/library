import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AddNoteModal from "./AddNoteModal";


export default function AddNote({ bookDetails, setUserDetails, userDetails }){

    const [addNoteModal, setAddNoteModal] = useState({ visible: false, hide: null, size: 'md' })

    const showAddNoteModal = () => setAddNoteModal({ visible: true, hide: hideAddNoteModal, size: 'md' })
    const hideAddNoteModal = () => setAddNoteModal({ visible: false, hide: null, size: 'md' })

    if(bookDetails){
        return (
            <div 
                className="fixed-bottom w-100 d-flex align-items-end justify-content-end p-4"
            >
                <div onClick={showAddNoteModal} className="clickable p-3 rounded-circle bg-21B08E">
                    <FaPlus color="#FFF" size={25} />
                </div>
    
                <AddNoteModal 
                    modalProps={addNoteModal} 
                    bookDetails={bookDetails} 
                    setUserDetails={setUserDetails} 
                    userDetails={userDetails}
                />
            </div>
        )
    }
}