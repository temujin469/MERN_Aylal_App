const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt');

//register
router.post('/registrate',async(req,res)=>{
    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        //create new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })

        //save password and send response
        const savedUser = await newUser.save();
        res.status(200).json(savedUser.username)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//login
router.post("/login",async (req,res)=>{
    try{
     //find user
    const user = await User.findOne({username:req.body.username});
    !user && res.status(400).json("нэр эсвэл нууц үг буруу байна!");

    //validate password
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    !validPassword && res.status(400).json("нэр эсвэл нууц үг буруу байна!");

    //send response
    res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
})
module.exports = router;