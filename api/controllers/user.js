import User from "../models/User.js";
import bcrypt from 'bcrypt'


const userController = {
    getUser: async (req, res) => {
        try {
            // Find the user with the matching id

            const user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while retrieving the user' });
        }
    },


    updateUser: async (req, res) => {
        try {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Find the user with the matching id and update its fields, including the hashed password
            const user = await User.findByIdAndUpdate(req.params.userId, { ...req.body, password: hashedPassword }, { new: true });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json({ message: 'User Updated successfully', user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating the user' });
        }
    },


    deleteUser: async (req, res) => {
        try {
            // Find the user with the matching id and delete it
            if (req.user.role !== 'admin') {
                return res.status(401).json({ error: 'Unauthorized: Insufficient privileges' });
            }

            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            // res.json(user);
            return res.status(200).json({ message: 'User deleted successfully', user });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the user' });
        }
    },

    getAll: async (req, res) => {
        try {
            // Find all users in the database
            if (req.user.role !== 'admin') {
                return res.status(401).json({ error: 'Unauthorized: Insufficient privileges' });
            }
            const users = await User.find();

            // Send the users in the response
            res.json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
};

export default userController;
