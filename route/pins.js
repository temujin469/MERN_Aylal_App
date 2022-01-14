const router = require('express').Router();
const Pin = require('../model/Pin');

//create Pin
router.post('/', async (req,res)=>{
    const newPin = new Pin(req.body)

    try{
        const savedPin = await newPin.save()
        res.status(200).json(savedPin)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//get Pin
router.get("/", async(req,res)=>{
    try{
        const pins = await Pin.find();
        res.status(200).json(pins)
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.delete("/delete/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        await Pin.deleteOne({_id:id})
    }
    catch(err){
        res.status(500).json(err)
    }
})
module.exports = router;