const mongoose = require("mongoose");
const uri =
    "mongodb+srv://not_satpal_singh:sahilsagar@satpalcluster.tiwi9as.mongodb.net/AuthenticationDb?retryWrites=true&w=majority&appName=satpalCluster";

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

// project/
// │
// ├── index.html
// ├── src/
// │   ├── components/
// │   │   ├── Header.js
// │   │   ├── LoginPage.js
// │   │   └── SignUpPage.js
// │   │
// │   ├── database/
// │   │   └── connect.js
// │   │
// │   ├── App.js
// │   └── route.js
// │
// └── style.css
