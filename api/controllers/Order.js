//not using this using print order may be i will change the printorder name later 
// const Order = mongoose.model('Order', orderSchema);

import Order from "../models/PrintOrders.js";
// import jwt from 'jwt-decode'

export const createOrder = async (req, res) => {
    const { pages, copies, sides, color, binding } = req.body;
    // req.user = jwt(req.token);
    const user = req.user.id;

    try {
        const newOrder = await Order.create({
            pages,
            copies,
            sides,
            color,
            binding,
            user
        });
        return res.status(201).json(newOrder);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id });
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findOne({ _id: orderId, user: req.user.id });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
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
        return res.status(500).json({ message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findOneAndDelete({ _id: orderId, user: req.user.id });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export const getOrderBetweenDate = async (req, res) => {
    const { startDate, endDate } = req.body;
    try {
        const orders = await Order.find({
            user: req.user._id,
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        });
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// const orders = await getOrdersByDateModel('day', '%d-%m-%Y');
// GET /orders?dateField=day&format=%d-%m-%Y

export const getOrdersByDate = async (req, res) => {
    try {
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
};


