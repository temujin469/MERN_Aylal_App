const express = require("express");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./route/pins");
const userRoute = require("./route/users");
const cors = require("cors");
const path = require("path");
const logger = require("./middlewares/logger");

dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(logger);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.use(errorHandler);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port);
