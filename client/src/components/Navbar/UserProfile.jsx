import React from 'react'
import './userProfile.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserProfile = ({ isOpen, setIsProfileOpen }) => {

    const user = useSelector((state) => state.user)
    console.log(user)

    if (isOpen) {
        document.body.addEventListener('click', () => {
            setIsProfileOpen(false)
        })
    }


    if (!isOpen) return null

    return (
        <div className="user-profile">
            <div class="profile-header gap1">
                {/* <img src="profile-picture.jpg" alt="Profile Picture" /> */}
                <span class="material-icons d-flex-center">
                    account_circle
                </span>
                <p>Username</p>
            </div>
            <div class="profile-dropdown ">
                {/* <p><Link to="/">Edit Profile</Link></p> */}
                <p><Link to="/orders">My Orders</Link></p>
                {
                    user.role === "admin" &&
                    (
                        <>
                            <p><Link to="/createPost">Create Post</Link></p>
                        </>

                    )
                }
                {/* <p><Link to="/">Edit Profile</Link></p>
                <p><Link to="/">Edit Profile</Link></p> */}
            </div>

        </div>
    )
}

export default UserProfile