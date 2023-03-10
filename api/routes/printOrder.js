import express from 'express'
import verifyToken from '../verifyToken.js';
import orderPrintController from '../controllers/printOrder.js';
import awsUpload from '../s3.js';
import { upload } from '../s3.js'
import retrievePaymentIntent from '../paymentIntent.js';
const router = express.Router();


router.post('/orders', verifyToken, upload.single('fileUrl'), awsUpload, orderPrintController.createOrder);
// router.post('/orders', upload.single('fileUrl'), awsUpload, orderPrintController.createOrder);


router.put('/orders/:orderId', verifyToken, orderPrintController.updateOrder);

router.patch('/orders/ispaid/:orderId', verifyToken, retrievePaymentIntent, orderPrintController.updateIsPaid);


router.get('/orders/user', verifyToken, orderPrintController.getUserOrders);
router.get('/orders/all', verifyToken, orderPrintController.getAllOrders);

router.get('/orders/:orderId', verifyToken, orderPrintController.getOrderById);


router.delete('/orders/:orderId', verifyToken, orderPrintController.deleteOrder);


router.get('/orders/timestamp/:timestamp', verifyToken, orderPrintController.getOrdersByDate);


export default router;


