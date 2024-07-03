const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const userRegister = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        throw new Error("User already registered!");
    }
    const hashPassword=await bcrypt.hash(password,10);
    console.log(hashPassword);
    const user = await User.create({ username, email, password:hashPassword});
    
    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

const userLogin = asyncHandler(async (req, res) => {
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("Please provide email and password");
    }
    const user=await User.findOne({email});
    if(user&& (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({user:{
            username:user.username,
            email:user.email,
            id:user.id,
        },
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"15m"});
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Invalid Credentials");
    }
    res.json({ message: "login the user" });
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { userRegister, userLogin, currentUser };
