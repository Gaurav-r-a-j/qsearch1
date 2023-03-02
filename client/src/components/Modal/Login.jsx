import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../axios';
import { setUser } from '../../redux/userSlice';
import { NotificationContext } from '../CustomNotification/CustomNotification';
import GoogleAuth from './GoogleAuth';
import './Modal.css'

const Login = ({ isOpen, setIsModalOpen }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { showNotification } = React.useContext(NotificationContext);

    const dispatch = useDispatch()
    // const [error, setError] = useState(false);
    isOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "none"

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setForm({
            ...form,
            [name]: value
        });
    }


    //Simple Login
    const handleSubmit = async (event) => {
        event.preventDefault();
        // ocalhost:5500/api/auth/signup
        // const data = JSON.stringify(form);
        // setError(false)
        try {
            // const { data } = await api.post('https://qsearch.onrender.com/api/auth/login', form)
            const { data } = await api.post('/auth/login', form)
            localStorage.setItem('token', JSON.stringify(data.token));
            // localStorage.setItem('user', JSON.stringify(data.user));
            // console.log(data)
            dispatch(setUser(data.user))
            showNotification('success', 'Login Success!', 2000, 'top', 'Login Success!');
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            closeModal()
            setForm({ name: "", password: "" });
        } catch (error) {
            console.log(error)
            showNotification('error', 'Login Failed!', 2000, 'top', 'Login Failed!');

            // setError(true)
        }

    }






    return (
        <div>
            {isOpen && (
                <div
                    onClick={() => setIsModalOpen(false)}
                    className="modal">
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h2 className="modal-title">Login</h2>
                        <div className="form-container">
                            <form onSubmit={handleSubmit} className="form-container">

                                <div className="form-control">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={form.email}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-control">
                                    <label htmlFor="password">Password</label>
                                    <div className="password-container">

                                        <input
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            name="password"
                                            id="password"
                                            value={form.password}
                                            onChange={handleInputChange}
                                            autoComplete="current-password"
                                        />
                                        {/* <button type="button" onClick={togglePasswordVisibility}></button> */}
                                        {(!isPasswordVisible) ?
                                            (
                                                <span
                                                    onClick={togglePasswordVisibility}
                                                    className="material-icons button">
                                                    visibility_off
                                                </span>
                                            )
                                            :
                                            (
                                                <span
                                                    onClick={togglePasswordVisibility}
                                                    className="material-icons button">
                                                    visibility
                                                </span>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className='primary-button'>Submit</button>
                                    {/* <button disabled={true} type="button" className="secondary-button">Login With Google</button> */}
                                    <GoogleAuth />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}



export default Login