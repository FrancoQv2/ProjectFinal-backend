const User = require('../models/user');
const Card = require('../models/card');
const Profile = require('../models/profile');

const profileCtrl = {};

profileCtrl.addNewProfile = async (req,res) => {

}

profileCtrl.getProfile = async (req,res) => {
    await Profile.find().populate({path: 'user', select: 'name last_name country age email username'})
        .exec((err,profile) => {
            console.log(profile);
            if (!err) {
                if (profile) {
                    Card.populate(profile, {path: 'deck'}, (err,cards) => {
                        console.log(profile);
                        if (!err) {
                            res.status(200).send(profile)
                        } else {
                            res.status(400).json({
                                msg:"Error"
                            });
                        }
                    })
                } else {
                    res.status(400).json({
                        msg:"No existen perfiles de usuario"
                    });
                }
            } else {
                console.log(err);
            }
        })
}

// profileCtrl.getRandomCard = async (req,res) => {
//     function getRandomNumber(min,max) {
//         let step1 = max - min + 1;
//         let step2 = Math.random() * step1;
//         let result = Math.floor(step2) + min;
//         return result;
//     }

//     const cardsInStorage = await Card.estimatedDocumentCount();
//     console.log(cardsInStorage);
//     const randomIndex = getRandomNumber(0, cardsInStorage-1);
//     console.log(randomIndex);

//     let newUser = await Card.findOne({ $arrayElemAt: [ <array>, randomIndex ] });
//     console.log("Esta en la db?" + newUser);


//     const id = req.params.id;
//     Card.findById(id)
//         .then(data => {
//             console.log(data);
//             if(!data || data.cardDeleted != false){
//                 res.status(404).send({msg:"No se encontró la carta con el ID " + id});
//             }
//             else{
//                 res.status(200).send(data);
//             }
//         })
//         .catch(err =>{
//             res.status(500).send({
//                 msg: "Error " + err
//             });
//         });



//     const user = await User.findById(owner);
//     user.tasks.push(task);
//     await user.save();
// }

module.exports = profileCtrl;
