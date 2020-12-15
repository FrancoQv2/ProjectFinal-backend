const User = require('../models/user');
const { validationResult } = require('express-validator');

const userCtrl = {};

userCtrl.createUser = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, last_name, country, age, email, username, password} = req.body;
    try{
        let newUser = await User.findOne({email});
        if(newUser){ 
            return res.status(400).json({msg:'Este usuario ya existe'});
        }
        newUser = new User(req.body);
        console.log(newUser);
        newUser.password = await newUser.encryptPassword(newUser.password);

        await newUser.save();
        res.status(201).json({
            msg:'Usuario creado correctamente'
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            msg:'Hubo un error al crear el usuario'
        });
    }
}

userCtrl.getUsers = async (req,res) => {
    await User.find({},function(err,users){
        if(!err){
            if(users.length != 0) {
                const arrayUsers = [];
                users.forEach(eachUser => {
                    let user = {
                        id:             eachUser.id,
                        name:           eachUser.name,
                        last_name:      eachUser.last_name,
                        country:        eachUser.country,
                        age:            eachUser.age,
                        email:          eachUser.email,
                        username:       eachUser.username,
                        role:           eachUser.role,
                        userActive:     eachUser.userActive,
                        userDeleted:    eachUser.userDeleted
                    }
                    if (!user.userDeleted) {
                        arrayUsers.push(user);
                    }
                });
                res.status(200).send(arrayUsers);
            }
            else {
                res.status(400).json({
                    msg:"No existen usuarios"
                });
            }
        }
        else{
            console.log(err);
        }
    });
}

userCtrl.getUser = (req,res) => {
    const id = req.params.id;
    User.findById(id)
        .then(data => {
            if(!data || data.userDeleted != false){
                res.status(404).send({msg:"No se encontró el usuario con el ID " + id});
            }
            else{
                res.status(200).send(data);
            }
        })
        .catch(err =>{
            res.status(500).send({
                msg: "Error " + err
            });
        });
}

userCtrl.updateUser = (req,res) =>{
    if(req.body == {}){
        return res.status(400).send({
            msg: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    User.findByIdAndUpdate(id,req.body,{ useFindAndModify: false })
        .then(data => {
            if(!data){
                res.status(404).send({
                    msg: "Cannot update user with id: " + id + " maybe not found"
                });
            }else{
                res.status(200).send({
                    msg: "Usuario actualizado exitosamente"
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                msg: "error" + err
            });
        })
}

userCtrl.deleteUser = (req,res) => {
    const id = req.params.id;
    req.body = {userDeleted: true};
    User.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    msg: "Cannot update user with id: " + id + " maybe not found"
                });
            } else {
                res.status(200).send({
                    msg: "Usuario borrado exitosamente"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                msg: "error" + err
            });
        })
}

// userCtrl.deleteUser = (req,res) => {
//     const id = req.params.id;
//     User.findByIdAndRemove(id)
//         .then(data => {
//             if(!data){
//                 res.status(404).send({msg: "Cannot delete User with id" + id + "maybe user not found"})
//             }else{
//                 res.send({msg:"Usuario borrado correctament v2"});
//             }
//         })
//         .catch(err=>{
//             res.status(500).send({msg: "error" + err});
//         })
// }

// userCtrl.deleteAllUsers = (req,res) =>{
//     User.deleteMany({})
//         .then(data => {
//             res.send({
//                 msg: "Users were deleted succesful!! Count:" + data.deletedCount
//             });
//         })
//         .catch(err=>{
//             res.status(500).send({
//                 msg: "Error when deleted"
//             });
//         })
// }

// ------------------------------------------------------------------------

userCtrl.getUsersDeleted = async (req,res) => {
    await User.find({},function(err,users){
        if(!err){
            if(users.length != 0) {
                const arrayUsers = [];
                users.forEach(eachUser => {
                    let user = {
                        id:             eachUser.id,
                        name:           eachUser.name,
                        last_name:      eachUser.last_name,
                        country:        eachUser.country,
                        age:            eachUser.age,
                        email:          eachUser.email,
                        username:       eachUser.username,
                        userActive:     eachUser.userActive,
                        userDeleted:    eachUser.userDeleted
                    }
                    if (user.userDeleted) {
                        arrayUsers.push(user);
                    }
                });
                res.status(200).send(arrayUsers);
            }
            else {
                res.status(400).json({
                    msg:"No existen usuarios"
                });
            }
        }
        else{
            console.log(err);
        }
    });
}

userCtrl.getUserDeleted = (req,res) => {
    const id = req.params.id;
    User.findById(id)
        .then(data => {
            if(!data || data.userDeleted != true){
                res.status(404).send({msg:"No se encontró el usuario con el ID " + id});
            }
            else{
                res.status(200).send(data);
            }
        })
        .catch(err =>{
            res.status(500).send({
                msg: "Error " + err
            });
        });
}

userCtrl.recoverUserDeleted = (req,res) =>{
    const id = req.params.id;
    req.body = {userDeleted: false};
    User.findByIdAndUpdate(id,req.body,{ useFindAndModify: false })
        .then(data => {
            if(!data){
                res.status(404).send({
                    msg: "Cannot update user with id: " + id + " maybe not found"
                });
            }else{
                res.status(200).send({
                    msg: "Usuario recuperado exitosamente"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                msg: "error" + err
            });
        })
}

// ------------------------------------------------------------------------

userCtrl.verifyLogin = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {username, password} = req.body;
    try{
        console.log(req.body);
        let findUser = await User.findOne({username});
        console.log(findUser);
        if(!findUser){ 
            return res.status(400).json({msg:'Este usuario no existe'});
        }

        const verifyPassword = await findUser.validatePassword(password);
        if (verifyPassword) {
            res.status(200).json({
                msg:'Usuario verificado correctamente'
            });
        } else {
            res.status(400).json({msg:'La contraseña es incorrecta'});
        }    
    }catch(error){
        console.log(error);
        res.status(400).json({
            msg:'Hubo un error al verificar el usuario'
        });
    }
}

module.exports = userCtrl;
