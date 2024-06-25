const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { User } = require("./database/connect");
const path = require("path");
require("dotenv").config();

// Middleware to parse JSON bodies
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// API routes
app.post("/signup", async (req, res) => {
    console.log("hola");
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // const newUser = new User({ email, password: hashedPassword });
        // await newUser.save();
        User.create({ email, password: hashedPassword }).then(() => {
            res.status(201).json({ message: "User created successfully" });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// app.get("/preetam", async (req, res) => {
//     return res.status(200).json({ message: "HOLA !" });
// });

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exists" });
        }
        const rightPassword = await bcrypt.compare(password, user.password);
        if (!rightPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        res.status(201).json({ message: "User login successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Serve the React app for all other routes
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../index.html"));
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
