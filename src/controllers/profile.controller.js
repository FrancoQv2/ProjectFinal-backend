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

module.exports = profileCtrl;
