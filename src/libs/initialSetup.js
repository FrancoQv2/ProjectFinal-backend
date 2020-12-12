const User = require('../models/user');
const Role = require('../models/role');
const bcryptjs = require('bcryptjs');

const initialSetups = {};

initialSetups.createRoles = async () => {
    try {
        const cantidad = await Role.estimatedDocumentCount();
        if (cantidad > 0) 
            return;

        const roles = await Promise.all([
            new Role({ name: "admin" }).save(),
            new Role({ name: "user" }).save()
        ]);
        console.log(roles);
    } catch (error) {
        console.log(error);
    }
};

initialSetups.createAdmin = async () =>{
    try {
        const user = await User.findOne({usuario:'admin'});
        const roles = await Role.find({name:{$in: ["admin","user"]}})
    if(!user){
        await User.create({
            name: 'admin',
            last_name: '-',
            country: '-',
            age: '-',
            email:'admin@admin.com',
            username:'admin',
            // password: await bcryptjs.hash("admin",10),
            password: await newUser.encryptPassword("admin"),
            userActive: true,
            sessionState:false,
            role: roles.map((item) => item._id)
        })
        console.log('Rol admin creado!');
    }
    } catch (error) {
        console.log(error);
    }
}

module.exports = initialSetups;
