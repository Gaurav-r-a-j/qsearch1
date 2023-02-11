// const Order = require('../models/order');
import Order from "../models/PrintOrders.js";

const orderPrintController = {
  createOrder: async (req, res) => {

    // console.log(req.body)
    if (!req.res.locals.fileUrl) {
      return res.status(400).send({ message: 'Missing required fields' });
    }
  
    const { orderNumber, printType, pages, sides, copies, binding, totalCost, status } = req.body;


    // req.user = jwt(req.token);
    const user = req.user.id;

    try {

      const newOrder = await Order.create({
        orderNumber,
        fileUrl:req.res.locals.fileUrl,
        printType,
        pages,
        sides,
        copies,
        binding,
        totalCost,
        status,
        user
      });

      // console.log("newOrder",newOrder)

      await newOrder.save();

      // Send the response
      // res.send({ printOrder });
      return res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // this is to get the all orders realted to a user
  getUserOrders: async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const orders = await Order.find({ user: req.user.id });
      return res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving the orders' });
    }
  },
  

  // this is to get the all orders 
  getAllOrders: async (req, res) => {
    try {
    if (req.user.role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
    }
    // const allOrders = await Order.find({});
    const allOrders = await Order.find({})
    .populate('user', ['name', 'email'])
    .sort({ createdAt: 'desc' })
    .exec();

    return res.status(200).json(allOrders);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving all orders' });
    }
    },


  getOrderById: async (req, res) => {

    const orderId = req.params.orderId;

    try {
      if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      // Find the order with the matching id
      const order = await Order.findOne({ _id: orderId, user: req.user.id });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving the order' });
    }
  },




  updateOrder: async (req, res) => {
    const orderId = req.params.orderId;
    // console.log(orderId)
    try {
      // Find the order with the matching id and update its fields
      if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const order = await Order.findOneAndUpdate(
        { _id: orderId, user: req.user.id },
        req.body,
        { new: true }
      );
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the order' });
    }
  },


  updateIsPaid: async (req, res) => {
    try {
    
      const paymentIntent = req.paymentIntent;
      const paymentStatus = req.paymentStatus;


      if(paymentIntent==="succeeded" || paymentStatus==="paid"){
        // Find the print order with the specified ID
        const order = await Order.findById(req.params.orderId);
        // Update the ispaid field and save the document
        order.isPaid = true;
        await order.save();

        // Return a success response
        res.status(200).json({
        success: true,
        message: 'Payment completed successfully! '
      });
      }else{
        res.status(404).json({
          success:false,
          message: 'Payment not succeeded!'
        });
      }
  

    } catch (error) {
      console.error(error)
      // Return an error response
      res.status(400).json({
        success: false,
        message: 'Error updating ispaid field'
      });
    }
  },
  
  
  
  



  deleteOrder: async (req, res) => {
    const orderId = req.params.orderId;
    try {
      if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      // Find the order with the matching id and delete it
      const order = await Order.findOneAndDelete({ _id: orderId, user: req.user.id });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the order' });
    }
  },




  getOrdersByDate: async (req, res) => {
    try {

      if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      // Get the date, day, or month from the request query
      const dateField = req.query.dateField || 'date';

      // Set the format for the date field
      const format = req.query.format || '%Y-%m-%d';

      // Aggregate the orders and group them by the date field
      const orders = await Order.aggregate([
        {
          $group: {
            _id: {
              [dateField]: {
                $dateToString: {
                  format: format,
                  date: '$createdAt',
                  timezone: 'Asia/Kolkata',
                },
              },
            },
            total: { $sum: 1 },
          },
        },
      ]);
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving the orders' });
    }
  },

};

export default orderPrintController;





// import multer from 'multer';
// import Order from './models/order';
// import { uploadFile, getFileUrl } from './s3.js';

// const upload = multer({ dest: 'uploads/' });

// exports.createOrder = (req, res) => {
//   const file = req.file;
//   uploadFile(file).then((response) => {
//     console.log(response); // { Location: 'https://YOUR_BUCKET_NAME.s3.amazonaws.com/FILE_NAME' }
//     const fileUrl = getFileUrl(file.name);
//     console.log(fileUrl); // 'https://YOUR_BUCKET_NAME.s3.amazonaws.com/FILE_NAME?AWSAccessKeyId=...&Expires=...&Signature=...'
    
//     const order = new Order({
//       // include any other fields for the order document here
//       fileUrl
//     });
//     return order.save();
//   }).then((savedOrder) => {
//     console.log(savedOrder);
//     return res.status(201).send({ order: savedOrder });
//   }).catch((error) => {
//     console.error(error);
//     return res.status(500).send({ error: error.message });
//   });
// };



