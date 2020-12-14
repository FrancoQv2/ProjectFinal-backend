const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const initialSetup = {};

initialSetup.createAdmin = async () => {
    try {
        const user = await User.findOne({role:'admin'});
    if(!user){
        await User.create({
            name: '-',
            last_name: '-',
            country: '-',
            age: '0',
            email:'admin@admin.com',
            username:'admin',
            password: await bcryptjs.hash('admin',10),
            role: 'admin',
            userActive: true
        })
        console.log('** Admin user created **');
    }
    } catch (error) {
        console.log(error);
    }
}

module.exports = initialSetup;
