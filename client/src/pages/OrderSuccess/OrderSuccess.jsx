import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import './OrderSuccess.css'
import api from '../../axios';
import { getCookie } from '../../generic_functions/smallFunctions';
import ErrorPage from '../Error/ErrorPage';
import { WhatsappButton } from '../../components/OrdrContainer/WhatsappButton';
const OrderSuccess = (props) => {
    const location = useLocation();
    const navigate = useNavigate();


    console.log(location)
    // const [orderId] = useState(props.match.params.id);
    // const orderId = '63ac235e7951534f3249ac8f'
    const { orderId } = useParams()
    const [isPaid, setIsPaid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const updateIsPaid = async () => {
            setIsLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            };
            try {
                // Send a PATCH request to the server to update the ispaid field
                const { data } = await api.patch(`/order/orders/ispaid/${orderId}`, {
                    sessionId: getCookie('sessionId')
                }, config);
                setIsPaid(data.success);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false)
            }
        };

        // Check for the success query parameter
        // if (location.search === '?success=true') {
        //     console.log("iskeander")
        //     updateIsPaid();
        // } else {
        //     setIsPaid(false);
        // }

        updateIsPaid()
    }, [orderId]);




    const goBack = () => {
        navigate(-1);
    }

    if (!getCookie('sessionId') && !localStorage.getItem('sessionId')) {
        return <ErrorPage />
    }


    return (
        <div className='order_success_container d-flex-center'>
            {
                isLoading ?
                    // <p>processing...</p>
                    <div class="spinner-box">
                        <div class="circle-border">
                            <div class="circle-core"></div>
                        </div>
                    </div>
                    :
                    isPaid ? (
                        <div className="success-message">
                            <svg
                                id="successAnimation"
                                className="animated"
                                xmlns="http://www.w3.org/2000/svg"
                                width={70}
                                height={70}
                                viewBox="0 0 70 70"
                            >
                                <path
                                    id="successAnimationResult"
                                    fill="#D8D8D8"
                                    d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"
                                />
                                <circle
                                    id="successAnimationCircle"
                                    cx={35}
                                    cy={35}
                                    r={24}
                                    stroke="#979797"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    fill="transparent"
                                />
                                <polyline
                                    id="successAnimationCheck"
                                    stroke="#979797"
                                    strokeWidth={2}
                                    points="23 34 34 43 47 27"
                                    fill="transparent"
                                />
                            </svg>

                            <h1>Thank you for your order!</h1>
                            <p>Your order has been placed!, and will be processed shortly.</p>
                            <div className="d-flex-center gap1">

                                <button className='order-nav-btn'>
                                    <Link to={'/'}>
                                        Go Home
                                    </Link>
                                </button>
                                <button className='order-nav-btn'>
                                    <Link to={'/my-orders'}>
                                        My Orders
                                    </Link>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="error-message">
                            <h1>Error updating payment status</h1>
                            <p>Payment not completed Sucessfully! , Please try again or Contact us.</p>

                            <br />

                            <h3 style={{ color: "white" }}>If You have paid the amount using UPI then You can check your Account section for your order status ! or you can Contact us. </h3>
                            <div className='d-flex-center gap1 fd-col'>
                                <div className="d-flex-center gap1">
                                    <button onClick={goBack} className='order-nav-btn'>   Try again </button>
                                    <button className='order-nav-btn'>
                                        <Link to={'/my-orders'}>
                                            My Orders
                                        </Link>
                                    </button>
                                </div>
                                {/* <div className="whatsapp_button d-flex-center">
                                    <img src="https://ik.imagekit.io/faskf16pg/Branding/Main/whatapp-sharepal_6GcbqnN5e.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657830361133" alt="" />

                                    <a
                                        href={`https://api.whatsapp.com/send?phone=918582042402&text=Hi , My name is ${user?.name} and I need help regarding my order ${orderId}.`}
                                    >
                                        Get Support
                                    </a>
                                </div> */}

                                <WhatsappButton query={` I need help regarding my order ${orderId}`} />
                            </div>

                        </div>
                    )}
        </div>
    );
};

export default OrderSuccess;
