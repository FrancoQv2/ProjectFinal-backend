const Card = require('../models/card');
const {validationResult} = require('express-validator');

const cardCtrl = {};

cardCtrl.createCard = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, img, type, rarity, power} = req.body;
    try{
        let newCard = await Card.findOne({name});

        if(newCard){ 
            return res.status(400).json({msg:'Esta carta ya existe'});
        }
        newCard = new Card(req.body);

        await newCard.save();
        res.status(201).json({
            msg:'Carta creada correctamente'
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            msg:'Hubo un error al crear la carta'
        });
    }
}

cardCtrl.getCards = async (req,res) => {
    await Card.find({},function(err,cards){
        if(!err){
            if(cards.length != 0) {
                const arrayCards = [];
                cards.forEach(eachCard => {
                    let card = {
                        id:             eachCard.id,
                        name:           eachCard.name,
                        img:            eachCard.img,
                        type:           eachCard.type,
                        rarity:         eachCard.rarity,
                        power:          eachCard.power,
                        cardDeleted:    eachCard.cardDeleted
                    }
                    if (!card.cardDeleted) {
                        arrayCards.push(card);
                    }
                });
                res.status(200).send(arrayCards);
            }
            else {
                res.status(400).json({
                    msg:"No existen cartas"
                });
            }
        }
        else {
            console.log(err);
        }
    });
}

cardCtrl.getCard = (req,res) => {
    const id = req.params.id;
    Card.findById(id)
        .then(data => {
            console.log(data);
            if(!data || data.cardDeleted != false){
                res.status(404).send({msg:"No se encontró la carta con el ID " + id});
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

cardCtrl.updateCard = (req,res) =>{
    console.log(req.body);
    if(req.body == {}){
        return res.status(400).send({
            msg: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Card.findByIdAndUpdate(id,req.body,{ useFindAndModify: false })
        .then(data => {
            if(!data){
                res.status(404).send({
                    msg: "Cannot update card with id: " + id + " maybe not found"
                });
            }else{
                res.status(200).send({
                    msg: "Carta actualizada exitosamente"
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                msg: "error" + err
            });
        })
}

cardCtrl.deleteCard = (req,res) => {
    const id = req.params.id;
    req.body = {cardDeleted: true};
    
    Card.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    msg: "Cannot update card with id: " + id + " maybe not found"
                });
            } else {
                res.status(200).send({
                    msg: "Carta borrada exitosamente"
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

cardCtrl.getCardsDeleted = async (req,res) => {
    await Card.find({},function(err,cards){
        if(!err){
            if(cards.length != 0) {
                const arrayCardsDeleted = [];
                cards.forEach(eachCard => {
                    let card = {
                        id:             eachCard.id,
                        name:           eachCard.name,
                        img:            eachCard.img,
                        type:           eachCard.type,
                        rarity:         eachCard.rarity,
                        power:          eachCard.power,
                        cardDeleted:    eachCard.cardDeleted
                    }
                    if (card.cardDeleted) {
                        arrayCardsDeleted.push(card);
                    }
                });
                res.status(200).send(arrayCardsDeleted);
            }
            else {
                res.status(400).json({
                    msg:"No existen cartas borradas"
                });
            }
        }
        else{
            console.log(err);
        }
    });
}

cardCtrl.getCardDeleted = (req,res) => {
    const id = req.params.id;
    Card.findById(id)
        .then(data => {
            console.log(data);
            if(!data || data.cardDeleted != true){
                res.status(404).send({msg:"No se encontró la carta con el ID " + id});
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

cardCtrl.recoverCardDeleted = (req,res) => {
    const id = req.params.id;
    req.body = {cardDeleted: false};
    
    Card.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    msg: "Cannot update card with id: " + id + " maybe not found"
                });
            } else {
                res.status(200).send({
                    msg: "Carta recuperada exitosamente"
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

cardCtrl.getRandomCard = async (req,res) => {
    function getRandomNumber(min,max) {
        let step1 = max - min + 1;
        let step2 = Math.random() * step1;
        let result = Math.floor(step2) + min;
        return result;
    }

    const cardsInStorage = await Card.estimatedDocumentCount();
    const randomIndex = getRandomNumber(0, cardsInStorage-1);

    let randomCard = {};

    if (randomIndex == 1) {
        randomCard = await Card.find().limit(randomIndex).skip(randomIndex);
    } else {
        randomCard = await Card.find().limit(randomIndex+1).skip(randomIndex);
    }
    // console.log(randomCard);
    // console.log(typeof randomCard);
    const newCardId = randomCard[0]._id;

    Card.findById(newCardId)
    .then(card => {
        console.log("-- getRandomCard");
        console.log(card);
        console.log(typeof card);
        console.log("end getRandomCard");
        return card;
        // if(!card || card.cardDeleted != false){
        //     res.status(404).send({msg:"No se encontró la carta con el ID " + newCardId});
        // }
        // else{
        //     res.send(card);
        // }
    })
    .catch(err =>{
        console.log(err);
        // res.status(500).send({
        //     msg: "Error " + err
        // });
    });
}

module.exports = cardCtrl;
