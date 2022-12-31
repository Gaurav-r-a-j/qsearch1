import express from 'express'
import verifyToken from '../verifyToken.js';
import orderPrintController from '../controllers/printOrder.js';
import awsUpload from '../s3.js';
import { upload } from '../s3.js'
const router = express.Router();


router.post('/orders', verifyToken, upload.single('fileUrl'), awsUpload ,orderPrintController.createOrder);


router.put('/orders/:orderId', verifyToken, orderPrintController.updateOrder);

router.get('/orders', verifyToken, orderPrintController.getUserOrders);

router.get('/orders/:orderId', verifyToken, orderPrintController.getOrderById);


router.delete('/orders/:orderId', verifyToken, orderPrintController.deleteOrder);


router.get('/orders/timestamp/:timestamp', verifyToken, orderPrintController.getOrdersByDate);


export default router;


