import React from 'react'
import { useSelector } from 'react-redux'
import './printOrder.css'
export const WhatsappButton = ({query}) => {
    const user = useSelector((state) => state.user)

    return (
        <div className="whatsapp_button d-flex-center">
            <img src="https://ik.imagekit.io/faskf16pg/Branding/Main/whatapp-sharepal_6GcbqnN5e.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657830361133" alt="" />

            <a
                href={`https://api.whatsapp.com/send?phone=918582042402&text=Hi , My name is ${user?.name ?? "_______"} and ${query}.`}
            >
                Get Support
            </a>
        </div>
    )
}
