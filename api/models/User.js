import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^\d{10}$/,  // validation pattern for phone numbers with a fixed length of 10 digits
        unique: true  // make the phone number field unique to ensure that no two users have the same phone number
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    },

    img: {
        type: String
    },
    subscribed: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    },
    fromGoogle: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });



export default mongoose.model('Users', userSchema);

