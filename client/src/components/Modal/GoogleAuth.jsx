import React, { useEffect } from 'react'
import api from '../../axios';
import './Modal.css'


const GoogleAuth = () => {

    useEffect(() => {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                // client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
                client_id: "257825662102-q6co6hp2suc5thij2caah130dt92a1mj.apps.googleusercontent.com"
            });
        });
    }, [])



    const googleAuth = async () => {
        const googleAuth = window.gapi.auth2.getAuthInstance();
        console.log("si")
        if (!googleAuth.isSignedIn.get()) {
            try {
                console.log("try")
                const googleUser = await googleAuth.signIn();
                console.log('this')
                if (googleUser) {
                    const idToken = googleUser.getAuthResponse().id_token;
                    // Make a post request to the server-side endpoint with the idToken
                    const response = await api.post('/auth/googleAuth', { idToken });
                    const token = response.data.token;
                    console.log(response.data)
                    // Store the token in local storage or a cookie for later use
                    // Store the token in local storage or a cookie for later use
                    localStorage.setItem('token', token);
                    // dispatch(setUser(data.user))
                }
            } catch (error) {
                console.error(error);
                if (error.error === 'popup_closed_by_user') {
                    console.log("User closed the popup window");
                } else {
                    alert('An error occurred while authenticating with Google');
                }
            }
        } else {
            console.log("User already signed in, no need to sign in again");
        }
    }


    return (

        <button
            onClick={googleAuth}
            type="button"
            className="secondary-button"
        >
            Login With Google
        </button>
    )
}

export default GoogleAuth