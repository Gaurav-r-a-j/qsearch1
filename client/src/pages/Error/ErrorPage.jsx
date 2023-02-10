import React from 'react'

const ErrorPage = () => {
    return (
        <div style={{ width: '100%', height: '100vh', textAlign: "center",fontSize:"2rem" }} className="error_page d-flex-center fd-col">
            <h1 style={{ color: "red" }}>Error 404</h1>
            <p>Something Went Wrong!</p>
        </div>
    )
}

export default ErrorPage