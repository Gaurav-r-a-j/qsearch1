import React from 'react'
import './Card.css'

const LoadingCard = () => {
    return (
        <div className="card">
            <div className="card_header loading_card_header loading_animation">
                {/* <img src="https://source.unsplash.com/600x400/?computer" alt="card__image" className="card__image" width={600} /> */}
                {/* tab-brown tag-red also availabel */}
                <span className="tag loading_tag loading_animation"></span>
            </div>
            <div className="card_body loading_body ">
                <span className='loading_animation'></span>
                <p className='loading_animation'></p>
            </div>
            <div className="card_footer loading_footer">
                <div className="user loading_user loading_animation">
                </div>
            </div>
        </div>
    )
}

export default LoadingCard