const express = require("express");
const verifyToken = require("../middlewares/authToken");
const users = require("../user.json");
const preferences = express.Router();
const path = require("path");
const fs = require("fs");
const {validatePreferenceParam} = require('../helpers/validator');

preferences.get("/", verifyToken, (req, res) => {
    try {
        if(req.statusCode === 200){
            const user = users.users.find((user) => user.username === req.user.username);
            res.status(200).json({ username: user.username, newsPreferences: user.newsPreferences, message: "Request successful" });
        }
        res.status(req.statusCode).json({ user: req.user, message: req.message });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

preferences.put("/", validatePreferenceParam, verifyToken, (req, res) => {
    try {
        console.log(req.user);
        console.log(req.message);
        console.log(req.statusCode);
        const { username } = req.user;
        const user = users.users.find((user) => user.username === username);
        if (user) {
            user.newsPreferences = req.body.newsPreferences;
            fs.writeFile(
                path.resolve(__dirname, "../user.json"),
                JSON.stringify(users),
                { encoding: "utf8", flag: "w" },
                (err) => {
                    if (err) {
                        return res
                            .status(500)
                            .send("Write to file failed. Please try again later");
                    }
                    res.status(200).send({ message: "User preferences updated", newsPreferences: user.newsPreferences});
                }
            );
        } else {
            res.status(404).send("User not found");
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = preferences;