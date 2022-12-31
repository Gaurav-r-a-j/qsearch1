import React from 'react'
import './Background.css'
import boy from '../../assets/2.png'
import Search from '../../components/Search/Search';
import globe from '../../assets/3.jpeg'

// import image1 from '../../assets/rajuser1.png'
// import phone from '../../assets/phone.png'


const Background = ({ image , image2}) => {
    return (
        <div className="background_container">
            <div className="main_background">
                <div className="background_image">
                    <img
                        src={image || globe}
                        alt="" />
                </div>
                <div className="boy_image">
                    <img
                        src={image2 || boy}
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