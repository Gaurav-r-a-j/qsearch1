import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../axios';
import './printOrder.css'
import { loadStripe } from '@stripe/stripe-js';
import { setCookie } from '../../generic_functions/smallFunctions';
import { WhatsappButton } from './WhatsappButton';
import { useSelector } from 'react-redux';
import { NotificationContext } from '../CustomNotification/CustomNotification';


// // Store the session ID in the cache
// const setSessionId = async (sessionId) => {
//     const cache = await caches.open('session-id');
//     await cache.put('session-id', new Response(sessionId));
// };

// // Retrieve the session ID from the cache
// const getSessionId = async () => {
//     const cache = await caches.open('session-id');
//     const response = await cache.match('session-id');
//     return response ? response.text() : null;
// };

export const generateOrderNumber = () => {
    // generate a random number between 1 and 1000000
    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    // get the current timestamp
    const timestamp = new Date().getTime();
    // combine the random number and the timestamp to create a unique ID
    const orderNumber = `${randomNumber}${timestamp}`;
    return orderNumber;
}



export const calculatePrice = (pages, copies, sides, color, binding) => {
    let basePrice = pages * 1.50; // base price is $0.1 per page
    if (pages <= 20) {
        basePrice = pages * 1.75;
    } else {
        basePrice = pages * 1.50;
    }

    if (sides === 'double') {
        basePrice *= 2; // double-sided prints cost twice as much as single-sided prints
    }
    if (color === 'color') {
        basePrice *= 2; // color prints cost 50% more than black-and-white prints
    }
    if (binding === 'spiral') {
        basePrice += 20; // spiral binding costs an additional $5
    }
    const totalPrice = basePrice * copies; // total price is the base price multiplied by the number of copies
    return totalPrice;
}



// const removeNonDigits = (str) => {
//     const regex = /[^\d]/g;
//     const cleanedStr = str.replace(regex, '');
//     return cleanedStr;
//   }


const PrintOrderForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [pages, setPages] = useState(0);
    const [copies, setCopies] = useState(1);
    const [sides, setSides] = useState('single');
    const [color, setColor] = useState('black-and-white');
    const [binding, setBinding] = useState('none');
    const [totalCost, setTotalCost] = useState(0);
    const [isOrder, setIsOrder] = useState(false)
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);

    const { showNotification } = React.useContext(NotificationContext);
    const { user } = useSelector((state) => state.user)


    // const user = useSelector((state) => state.user)



    useEffect(() => {
        const calculatedPrice = () => {
            const totalPrice = calculatePrice(pages, copies, sides, color, binding);
            setTotalCost(Math.ceil(totalPrice));
        }
        calculatedPrice()

    }, [pages, copies, sides, color, binding])


    const handleFileChange = (event) => {
        // console.log(event)
        setSelectedFile(event.target.files[0]);
    }


    const handlePagesChange = (event) => {
        const value = event.target.value
        // if (!/^\d+$/.test(value)) {
        setPages(value >= 0 ? event.target.value : 1)

    }

    const handleCopiesChange = (event) => {
        const value = event.target.value
        setCopies(value >= 0 ? event.target.value : 1)
    }


    const handleSidesChange = (event) => {
        setSides(event.target.value);
    }

    const handleColorChange = (event) => {
        setColor(event.target.value);
    }

    const handleBindingChange = (event) => {
        setBinding(event.target.value);
    }

    // const calculatetotalCost = () => {
    //     // calculate the totalCost based on the selected options
    //     setTotalCost(/* calculated totalCost */);
    // }



    // Make the API call to create a new Order
    const createOrder = async (data) => {
        setIsLoading(true)
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    'Content-Type': 'multipart/form-data'
                }
            };
            // const response = await axios.post('https://qsearch.onrender.com/api/order/orders', data, config);
            const response = await axios.post('http://localhost:5500/api/order/orders', data, config);
            stripeSubmit(response.data.totalCost, response.data._id, response.data.orderNumber)
            setIsOrder(true)
            return response.data;


        } catch (error) {
            setIsOrder(false)
            setError(true)
            console.error(error);
            throw error;
        } finally {
            setIsLoading(false)
        }
    };






    const stripeSubmit = async (totalCost, orderId, orderNumber) => {
        setPaymentLoading(true)
        try {
            // Create payment object with necessary information
            const paymentData = {
                amount: totalCost,
                paymentMethodType: 'card',
                orderId,
                orderNumber
            };


            // Send request to create payment on backend server
            // const { data } = await axios.post('http://localhost:5500/create-checkout-session', paymentData);
            const { data } = await api.post('/create-checkout-session', paymentData);

            localStorage.setItem('sessionId', data.sessionId)
            setCookie('sessionId', data.sessionId, 10)
            // alert(data.sessionId)


            // Load Stripe library

            // this is for live mode
            // const stripe = await loadStripe('pk_live_51LbfH4SBb75IOhndCV6AZUBshONgtDq7bhTzwrYXVCByr9ZvKl1tx5wasSAu14IQz3t98TLj5kuM3P6fUZioAkim00bynxRzF9');
            // this is for test mode
            const stripe = await loadStripe('pk_test_51LbfH4SBb75IOhndwJlysAKUhmwF0jGz2HJFbFhfc0QDJFAQAACBVjRcGaJP8m8D4JI1U6U19YNN20jxpY3STEvK00cdctDwtx');


            setIsLoading(false)
            // Redirect to default Stripe checkout page
            const result = await stripe.redirectToCheckout({
                // sessionId: data.stripeSession.id,
                sessionId: data.sessionId,
            });

            console.error("result", result)

            if (result.error) {
                console.log(result)
                console.log(error)
            } else {
                console.log(result)
            }

            console.log(result)
        } catch (error) {
            console.error(error);
        }
    };


    // handle submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create the data object for the API call
        const formData = new FormData();
        formData.append('fileUrl', selectedFile);
        formData.append('pages', pages);
        formData.append('copies', copies);
        formData.append('sides', sides);
        formData.append('printType', color);
        formData.append('binding', binding);
        formData.append('totalCost', totalCost);
        formData.append('orderNumber', generateOrderNumber())
        // Make the API call
        console.log("formdata set", formData)
        // formData.forEach((value, key) => {
        //     console.log(key, value);
        // });

        console.log(user)
        if (user === null) {
            console.log("not use")
            showNotification('error', 'Login to Order!', 2000, 'top', 'Login to Order!');
            return;
        }

        try {
            if (totalCost !== 0) {
                const order = await createOrder(formData);
            }
            // console.log(order)
            // stirpeSubmit(order.totalCost)
            // Reset the form
            if (isOrder) {
                setSelectedFile(null);
                setPages(0);
                setCopies(1);
                setSides('single');
                setColor('black-and-white');
                setBinding('none');
                setTotalCost(0);
            }
        } catch (error) {
            console.log(error)
        }


    };

    return (
        <div className='print_order_form  glassomorphism'>
            <div className="print_order_input d-flex-spaceb">
                <div className='upload_button d-flex-center'>
                    <label
                        // style={{ width: '100%', textOverflow: 'ellipsis' }}
                        title={selectedFile ? selectedFile.name : ''}
                        className='upload_file d-flex-center'
                        htmlFor='file'>
                        <i className="material-icons">cloud_upload</i>

                        <span>
                            {selectedFile ? selectedFile.name : 'Upload'}
                        </span>

                    </label>
                    <input type="file" id="file" style={{ display: 'none' }} onChange={handleFileChange} />
                </div>

                {/* <div className="whatsapp_button d-flex-center">
                    <img src="https://ik.imagekit.io/faskf16pg/Branding/Main/whatapp-sharepal_6GcbqnN5e.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657830361133" alt="" />

                    <a
                        href={`https://api.whatsapp.com/send?phone=918582042402&text=Hi , My name is ${user?.name} and I have query regarding Print.`}
                    >
                        Get Support
                    </a>
                </div> */}

                <WhatsappButton query={'I have query regarding Print'} />
            </div>

            <div className="print_order_input">
                <label htmlFor="pages">Pages:</label>
                <input type="number" id="pages" value={pages} onChange={handlePagesChange} />
            </div>

            <div className="print_order_input">
                <label htmlFor="copies">Copies:</label>
                <input type="number" id="copies" value={copies} onChange={handleCopiesChange} />
            </div>



            <div className="print_order_input">
                <label htmlFor="sides">Sides:</label>
                <select id="sides" value={sides} onChange={handleSidesChange}>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                </select>
            </div>



            <div className="print_order_input">
                <label htmlFor="color">Color:</label>
                <select id="color" value={color} onChange={handleColorChange}>
                    <option value="black-and-white">Black and White</option>
                    <option value="color">Color</option>
                </select>
            </div>



            <div className="print_order_input">

                <label htmlFor="binding">Binding:</label>
                <select id="binding" value={binding} onChange={handleBindingChange}>
                    <option value="none">None</option>
                    <option value="spiral">spiral</option>
                </select>

            </div>


            <div className="price_box" value={totalCost}>
                <span>Total:</span>
                {totalCost}
            </div>


            {<button
                onClick={handleSubmit}
                disabled={selectedFile === null || pages === 0 || totalCost === 0}
                className="order-button">
                {(isLoading || paymentLoading) ? 'Wait...' : "Order"}
            </button>}

            {/* <span>Su</span> */}


        </div>




    )
}

export default PrintOrderForm



