const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = Schema({
    name:{
        type: String,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;