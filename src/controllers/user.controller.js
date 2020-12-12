const User = require('../models/user');
const {validationResult} = require('express-validator');

const userCtrl = {};

userCtrl.createUser = async (req,res) => {
    console.log("- entra createUser");
    console.log(req.body);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, last_name, country, age, email, username, password} = req.body;
    try{
        // let user = await (User.findOne({email}) || User.findOne({username}));
        let newUser = await User.findOne({email});
        console.log("Esta en la db?" + newUser);

        if(newUser){ 
            return res.status(400).json({msg:'Este usuario ya existe'});
        }
        newUser = new User(req.body);
        console.log(newUser);
        
        newUser.password = await newUser.encryptPassword(newUser.password);

        // Guardar en la DB
        await newUser.save();
        res.json({
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
                // console.log(users);
                // console.log(typeof users);
                const arrayUsers = [];
                users.forEach(eachUser => {
                    let user = {
                        id:         eachUser.id,
                        name:       eachUser.name,
                        last_name:  eachUser.last_name,
                        country:    eachUser.country,
                        age:        eachUser.age,
                        email:      eachUser.email,
                        username:   eachUser.username,
                        userActive:   eachUser.userActive
                    }
                    arrayUsers.push(user);
                });
                res.status(200).send(arrayUsers);
            }
            else {
                res.status(400).json({msg:"No existen usuarios"});
            }
        }
        else{
            console.log(err);
        }
    });
    // }).populate("tasks");
}

userCtrl.getUserById = (req,res) => {
    const id = req.params.id;
    User.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message:"Not found User with ID" + id});
            }
            else{
                res.send(data);
            }
        })
        .catch(err =>{
            res.status(500).send({message: "Error" + err});
        });
}

userCtrl.updateUser = (req,res) =>{
    if(!req.body){
        return res.status(400).send({message: "Data to update can not be empty!"})
    }
    const id = req.params.id;
    User.findByIdAndUpdate(id,req.body,{ useFindAndModify: false})
        .then(data =>{
            if(!data){
                res.status(404).send({message: "Cannot update user with id:" + id + "maybe not found"})
            }else{
                res.send({message: "User was updated!!"});
            }
        })
        .catch(err =>{
            res.status(500).send({message: "error" + err})
        })
}

userCtrl.deleteUser = (req,res)=>{
    const id = req.params.id;
    User.findByIdAndRemove(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: "Cannot delete User with id" + id + "maybe user not found"})
            }else{
                res.send({message: "User was deleted successful"});
            }
        })
        .catch(err=>{
            res.status(500).send({message: "error" + err});
        })
}

userCtrl.deleteAllUsers = (req,res) =>{
    User.deleteMany({})
        .then(data =>{
            res.send({message: "Users were deleted succesful!! Count:" + data.deletedCount })
        })
        .catch(err=>{
            res.status(500).send({message: "Error when deleted"})
        })
}

module.exports = userCtrl;
