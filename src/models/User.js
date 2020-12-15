const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

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
    role:{
        type: String,
        required: true,
        default: 'user'
    },
    card_deck:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
    userActive: {
        type: Boolean,
        default: false
    },
    userDeleted: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
}

UserSchema.methods.validatePassword = function(password){
    return bcryptjs.compareSync(password,this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
