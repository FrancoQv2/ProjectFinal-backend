const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    last_name:{
        type: String,
        required: true,
        trim: true
    },
    country:{
        type: String,
        required: true,
        trim: true
    },
    age:{
        type: Number,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
