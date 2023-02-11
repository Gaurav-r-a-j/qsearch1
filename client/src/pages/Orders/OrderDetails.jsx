import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './OrderDetails.css'
import api from '../../axios';
import { useSelector } from 'react-redux';
import ErrorPage from '../Error/ErrorPage';

const OrderDetails = () => {

  const user = useSelector((state) => state.user)
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/order/orders/${orderId}`);
        setOrder(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      }
    };
    fetchOrder();
  }, [orderId]);

  if (user?.role !== "admin") {
    return (
      <ErrorPage />
    )
  }

  return (
    <div className="order-details mtop">
      <h1>Order Details</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <tbody>
              <tr>
                <td>Order Number:</td>
                <td>{order.orderNumber}</td>
              </tr>
              <tr>
                <td>File URL:</td>
                <td>
                  <a href={order.fileUrl} target="_blank" rel="noopener noreferrer"> {order.fileUrl}</a>
                </td>
              </tr>
              <tr>
                <td>Print Type:</td>
                <td>{order.printType}</td>
              </tr>
              <tr>
                <td>Pages:</td>
                <td>{order.pages}</td>
              </tr>
              <tr>
                <td>Sides:</td>
                <td>{order.sides}</td>
              </tr>
              <tr>
                <td>Copies:</td>
                <td>{order.copies}</td>
              </tr>
              <tr>
                <td>Binding:</td>
                <td>{order.binding}</td>
              </tr>
              <tr>
                <td>Total Cost:</td>
                <td>{order.totalCost}</td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>{order.status}</td>
              </tr>
              <tr>
                <td>Is Paid:</td>
                <td>{order.isPaid ? '✅' : '🚫'}</td>
              </tr>
            </tbody>
          </table>
        </>
      )
      }
      <Link to="/orders">Back to Orders</Link>
    </div >
  );
};

export default OrderDetails;
