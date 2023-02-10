import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'
import { OAuth2Client } from 'google-auth-library'
import User from '../models/User.js';






const authController = {
    // Login method
    login: [

        // Validate the request body
        check('email').isEmail().withMessage('Please enter a valid email'),
        check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        // check('phoneNumber', 'Phone number must be 10 digits').isLength({ min: 10, max: 10 }),

        async (req, res) => {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            try {
                // Find the user by email
                const user = await User.findOne({ email: req.body.email });
                if (!user) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }

                // Check the password
                const isMatch = await bcrypt.compare(req.body.password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }

                // Create a JWT
                const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
                    expiresIn: 864000 // 10 hours
                });

                // Send the JWT in the response
                res.status(200).json({
                    token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        role: user.role
                    }
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Server error' });
            }
        }
    ],

    // Signup Method
    signup: [
        // Validate the request body
        check('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        check('email').isEmail().withMessage('Please enter a valid email'),
        check('phoneNumber', 'Phone number must be 10 digits').isLength({ min: 10, max: 10 }),
        check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ errors: errors.array() });
            }

            // console.log(req.body)

            try {
                // Check if the name is already in use
                // const existingUserByName = await User.findOne({ name: req.body.name });
                // if (existingUserByName) {
                //     return res.status(409).json({ error: 'username is already in use' });
                // }

                // Check if the email is already in use
                const existingUserByEmail = await User.findOne({ email: req.body.email });
                if (existingUserByEmail) {
                    return res.status(409).json({ error: 'Email is already in use' });
                }
                // Check if the email is already in use
                const existingUserByPhoneNumber = await User.findOne({ phoneNumber: req.body.phoneNumber });
                if (existingUserByPhoneNumber) {
                    return res.status(409).json({ error: 'Phone Number is already in use' });
                }

                // Hash the password
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                // Create a new user
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    phoneNumber: req.body.phoneNumber,
                    role: req.body.role
                });

                // Save the new user
                const savedUser = await newUser.save();

                // Create a JWT
                const token = jwt.sign({ id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, {
                    expiresIn: 864000 // 10 day
                });

                // Send the JWT in the response
                res.status(201).json({
                    token: token,
                    user: {
                        id: savedUser._id,
                        name: savedUser.name,
                        email: savedUser.email,
                        phoneNumber: savedUser.phoneNumber,
                        role: savedUser.role
                    }
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Server error' });
            }
        }
    ]



    ,



    googleAuth: async (req, res) => {
        try {
            // console.log(req)
            // Verify the token sent by the client
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: req.body.idToken,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();

            // Check if a user with the same email already exists
            const existingUser = await User.findOne({ email: payload.email });
            if (existingUser) {
                // If a user with the same email already exists, generate a JWT and send it as the response
                const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET);
                return res.json({ token });
            }

            // If a user with the same email does not exist, create a new user and generate a JWT
            const user = new User({
                name: payload.name,
                email: payload.email,
                googleId: payload.sub,
                role: 'user'
            });
            await user.save();
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while authenticating with Google' });
        }
    },



    authUser: async (req, res) => {
        try {
            // Find the user with the matching id
            // console.log(req)

            const user = await User.findById(req.user.id).select(` -password -createdAt -updatedAt `);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while retrieving the user' });
        }
    },



};

export default authController;

