import React, { useState, useEffect } from 'react';
import './Orders.css'
import api from '../../axios';
import { useSelector } from 'react-redux';
import ErrorPage from '../Error/ErrorPage';
import { NotificationContext } from '../../components/CustomNotification/CustomNotification';
import { Link } from 'react-router-dom';
import DeleteModal from '../../components/Modal/DeleteModal';

const Orders = () => {

    const { user } = useSelector((state) => state.user)
    const { showNotification } = React.useContext(NotificationContext);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [orderId, setOrderId] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let api_url = "";
        if (user.role === 'admin') {
            api_url = '/order/orders/all'
        } else if (user.role === 'user') {
            api_url = '/order/orders/user'
        }
        api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        const fetchOrders = async () => {
            const response = await api.get(api_url);
            setOrders(response.data);
            setFilteredOrders(response.data);
            setIsLoading(false);
        };

        fetchOrders();
    }, []);

    // useEffect(() => {
    //     setFilteredOrders(
    //         orders.filter(order => {
    //             if (statusFilter === 'all') {
    //                 return true;
    //             }

    //             return order.status === statusFilter;
    //         })
    //     );
    // }, [statusFilter, orders]);


    const [isPaidFilter, setIsPaidFilter] = useState('all');

    useEffect(() => {
        setFilteredOrders(
            orders.filter(order => {
                if (statusFilter === 'all' && isPaidFilter === 'all') {
                    return true;
                }

                if (statusFilter === 'all' && isPaidFilter !== 'all') {
                    return order.isPaid === (isPaidFilter === 'yes');
                }

                if (statusFilter !== 'all' && isPaidFilter === 'all') {
                    return order.status === statusFilter;
                }

                return order.status === statusFilter && order.isPaid === (isPaidFilter === 'yes');
            })
        );
    }, [statusFilter, isPaidFilter, orders]);


    useEffect(() => {
        console.log(searchTerm)
        setFilteredOrders(
            orders.filter(order => {
                return (
                    order.orderNumber.toString().includes(searchTerm) ||
                    order?.user?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
                    order?.user?.email?.toLowerCase()?.includes(searchTerm.toLowerCase())
                );
            })
        );
    }, [searchTerm, orders]);




    // to delte order
    // const deleteOrder = async (orderId) => {
    //     try {
    //         await api.delete(`/order/orders/${orderId}`);
    //         setOrders(orders.filter(order => order._id !== orderId));
    //         showNotification('error', 'Order Deleted Successfully!', 2000, 'top', 'Order Deleted Successfully!');

    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // }

    const [modalOpen, setModalOpen] = useState(false);
    const deleteOrder = async (e, orderId) => {
        e.preventDefault();
        setOrderId(orderId)
        setModalOpen(true)
    }

    const handleConfirm = async () => {
        // Send a DELETE request to the server to delete the post
        try {
            await api.delete(`/order/orders/${orderId}`);
            setOrders(orders.filter(order => order._id !== orderId));
            showNotification('error', 'Order Deleted Successfully!', 2000, 'top', 'Order Deleted Successfully!');
            setModalOpen(false);
        } catch (error) {
            console.log(error)
            showNotification('error', 'Something Went Wrong!', 2000, 'top', 'Something Went Wrong!');

        }
    }

    const handleCancel = () => {
        setModalOpen(false);
    }


    if (user === null) {
        return (
            <ErrorPage />
        )
    }


    return (

        <>

            {modalOpen &&
                (<DeleteModal
                    text={"Order"}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />)
            }
            <div className="OrdersPage Orders mtop">
                <h1>Orders</h1>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="filter-section">
                            {user.role === 'admin' && <div className="filter-by d-flex-center fd-col">
                                <label htmlFor="orderStatus">Order Status</label>
                                <select id='orderStatus' value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                                    <option value="all">All</option>
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            }
                            <div className="filter-by d-flex-center fd-col">
                                <label htmlFor="isPaid">isPaid</label>
                                <select id='isPaid' value={isPaidFilter} onChange={e => setIsPaidFilter(e.target.value)}>
                                    <option value="all">All</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            {user.role === 'admin' ?
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    placeholder="Search by order number or customer name"
                                />
                                :
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    placeholder="Search by your order number"
                                />


                            }
                        </div>



                        <div className="order-table">

                            <table>
                                <thead>
                                    <tr>
                                        {user.role === 'admin' && <th></th>}
                                        <th>Order Number</th>
                                        {user.role === 'admin' && <th>Customer</th>}
                                        <th>isPaid</th>
                                        <th>Pdf</th>
                                        <th>print Type</th>
                                        <th>Pages</th>
                                        <th>Sides</th>
                                        <th>Copies</th>
                                        <th>Binding</th>
                                        <th>Total Cost</th>
                                        {user.role === 'admin' && <th>Status</th>}
                                        {user.role === 'admin' && <th>Action</th>}
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredOrders.map(order => (
                                        <tr key={order._id}>
                                            {user.role === 'admin' && <td>
                                                <input type="checkbox" name="" id="" />
                                            </td>}
                                            <td>
                                                <Link to={`/orders/${order._id}`}>
                                                    {order.orderNumber}
                                                </Link>
                                            </td>
                                            {user.role === 'admin' && <td>{order.user.name}</td>}
                                            <td>{order.isPaid ? "✅" : "🚫"}</td>
                                            <td>
                                                <a href={order.fileUrl} target="_blank" rel="noopener noreferrer">
                                                    Open Pdf
                                                </a>
                                            </td>
                                            <td>{order.printType}</td>
                                            <td>{order.pages}</td>
                                            <td>{order.sides}</td>
                                            <td>{order.copies}</td>
                                            <td>{order.binding}</td>
                                            <td>{order.totalCost}</td>
                                            {user.role === 'admin' && <td>{order.status}</td>}
                                            {user.role === 'admin' && <td className='action'>

                                                <span onClick={(e) => deleteOrder(e, order._id)} class="material-icons">
                                                    delete
                                                </span>
                                                <span class="material-icons">
                                                    edit
                                                </span>
                                            </td>}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </>
                )}
            </div>

        </>

    )

}


export default Orders;