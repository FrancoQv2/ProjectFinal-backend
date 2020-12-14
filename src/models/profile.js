const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deck:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }]
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;