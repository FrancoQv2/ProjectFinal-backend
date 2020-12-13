const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true,
        trim: true
    },
    type:{
        type: String,
        required: true
    },
    rarity:{
        type: String,
        required: true,
        trim: true
    },
    power:{
        type: String,
        required: true
    },
    cardDeleted: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;