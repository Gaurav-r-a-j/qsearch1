import React from 'react'
import './DeleteModal.css'
const DeleteModal = ({ postId, onConfirm, onCancel }) => {

    
    return (

        <div className="delete_modal">
            <div className="delete_modal_content">
                <p>Are you sure you want to delete this post?</p>
                <div className="modal_buttons">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal