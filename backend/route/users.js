const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const MyError = require("../utils/MyError");

//register
router.post("/registrate", async (req, res, next) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save password and send response
    const savedUser = await newUser.save();
    res.status(200).json(savedUser.username);
  } catch (err) {
    next(err);
  }
});

//login
router.post("/login", async (req, res, next) => {
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw new MyError("нэр эсвэл нууц үг буруу байна!", 400);

    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      throw new MyError("нэр эсвэл нууц үг буруу байна!", 400);

    //send response
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) throw new MyError("hereglegch alga bain", 400);

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
