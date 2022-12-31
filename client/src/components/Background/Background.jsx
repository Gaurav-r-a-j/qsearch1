import React from 'react'
import './Background.css'
import Search from '../../components/Search/Search';
// import globe from '../../assets/3.jpeg'

// import image1 from '../../assets/rajuser1.png'
// import phone from '../../assets/phone.png'

const Background = ({ image1, image2 }) => {
    return (
        <div className="background_container">
            <div className="main_background">
                <div className="background_image">
                    <img
                        src={image1 || "https://upload-print-blog.s3.ap-south-1.amazonaws.com/3.webp"}
                        alt="" />
                </div>
                <div className="boy_image">
                    <img
                        src={image2 || "https://upload-print-blog.s3.ap-south-1.amazonaws.com/2.webp"}
                        alt=""
                    />
                </div>

                <div className="print_search">
                    <Search />
                </div>
            </div>

        </div>
    )
}

export default Background