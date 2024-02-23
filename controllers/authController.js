const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../user.json");
const path = require("path");
const fs = require("fs");
require('dotenv').config()

const expirationTime = Math.floor(Date.now() / 1000) + (60 * 60);

var register = async (req, res) => {
    try {
        const { name, email, username, newsPreferences, password } = req.body;
        let newUser = {
            username: username, 
            name: name, 
            email: email, 
            newsPreferences: newsPreferences, 
            password: password 
        }

        if(fetchUserIfExists(username, email) === undefined){
            newUser.password = await bcrypt.hash(password, 8);
            users.users.push(newUser);
            fs.writeFile(path.resolve(__dirname, "../user.json"), JSON.stringify(users), { encoding: "utf8", flag: "w" }, (err) => {
                if (err) {
                    return res.status(500).send('Write to file failed. Please try again later');
                }
                res.status(201).send("User registered successfully");
            });
        }else{
            res.status(400).send("User already exists. Please provide a new username and email");
        }
    } catch(e) {
        res.status(500).send({message: e.message});
    }
};

var login = async (req, res) => {
    const { username, password } = req.body;
    const user = fetchUserIfExists(username);
    if (user == null) {
        return res.status(400).send("Cannot find user");
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {expiresIn: expirationTime});
            res.json({ accessToken });
        } else {
            res.status(403).send("Invalid username or password");
        }
    } catch(e) {
        res.status(500).send(e.message);
    }
};

var fetchUserIfExists = (username, email) => {
    return users.users.find((u) => u.username === username || u.email === email)
}

module.exports = {register, login}