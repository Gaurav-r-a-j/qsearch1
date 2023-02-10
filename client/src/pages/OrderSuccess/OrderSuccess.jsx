import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './OrderSuccess.css'
import api from '../../axios';
const OrderSuccess = (props) => {
    const location = useLocation();
    // const [orderId] = useState(props.match.params.id);
    const orderId = '63ac235e7951534f3249ac8f'
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {

        const updateIsPaid = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            };
            try {
                // Send a PATCH request to the server to update the ispaid field
                await api.patch(`/order/orders/ispaid/${orderId}`, {
                    ispaid: true
                },config);
                setIsPaid(true);
            } catch (error) {
                console.error(error);
            }
        };

        // Check for the success query parameter
        if (location.search === '?success=true') {
            console.log("iskeander")
            updateIsPaid();
        } else {
            setIsPaid(false);
        }
    }, [location, orderId]);

    return (
        <div className='order_success_container d-flex-center'>
            {isPaid ? (
                <div className="success-message">
                    <h1>Thank you for your order!</h1>
                    <p>Your order has been marked as paid and will be processed shortly.</p>
                </div>
            ) : (
                <div className="error-message">
                    <h1>Error updating payment status</h1>
                    <p>There was an error updating the payment status of your order. Please try again later.</p>
                </div>
            )}
        </div>
    );
};

export default OrderSuccess;
