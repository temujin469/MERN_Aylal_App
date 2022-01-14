const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const pinRoute = require('./route/pins')
const userRoute = require('./route/users')
const cors = require('cors')

dotenv.config();
app.use(express.json({limit: '50mb'}));
app.use(cors());

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true})
.then(()=>{console.log('mongoDB has connected***')})
.catch(err=>console.log(`ERROR_IS: ${err}`))

app.use("/api/pins",pinRoute)
app.use("/api/users",userRoute)

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});

const port = process.env.PORT || 5000

app.listen(port);
