import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../axios';
import { setUser } from '../../redux/userSlice';
import { NotificationContext } from '../CustomNotification/CustomNotification';
import './Modal.css'

const Signup = ({ isOpen, setIsModalOpen }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    // const [error, setError] = useState(false);
    const { showNotification } = useContext(NotificationContext);
    const dispatch = useDispatch()


    isOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"

    const [form, setForm] = useState({
        name: '',
        email: '',
        phoneNumber: '',
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


    const handleSubmit = async (event) => {
        event.preventDefault();
        // ocalhost:5500/api/auth/signup
        // const data = JSON.stringify(form);
        // setError(false)
        // console.log(form)
        try {
            // const { data } = await api.post('https://qsearch.onrender.com/api/auth/signup', form)
            const { data } = await api.post('/auth/signup', form)
            localStorage.setItem('token', JSON.stringify(data.token))
            // console.log(data)
            dispatch(setUser(data.user))
            showNotification('success', 'Signup success!', 2000, 'top', 'Signup success!')
            closeModal();
            setForm({
                name: '',
                email: '',
                phoneNumber: '',
                password: ''
            });

        } catch (error) {
            console.log(error)
            showNotification('error', `${error.response.data.error ? (error.response.data.error) : "Something Went Wrong"}`, 2000, 'top', `${error.response.data.error ? (error.response.data.error) : "Something Went Wrong"}`)

            // setError(true)
        }

    }

    return (
        <div>
            {isOpen && (
                <div
                    onClick={() => setIsModalOpen(false)}
                    className="modal ">
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h2 className="modal-title">Sign up</h2>
                        <div className="form-container">
                            <form onSubmit={handleSubmit} className="form-container">
                                <div className="form-control">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={form.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
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
                                    <label htmlFor="phoneNumber">Phone</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        value={form.phone}
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
                                    <button disabled={true} type="button" className="secondary-button">Login With Google</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}



export default Signup