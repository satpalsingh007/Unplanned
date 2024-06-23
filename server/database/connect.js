require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

mongoose
    .connect(uri)
    .then(() => console.log("Connected To The DB"))
    .catch((err) => console.log(err));

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const User = mongoose.model("User", newSchema);
module.exports = { mongoose, User };
