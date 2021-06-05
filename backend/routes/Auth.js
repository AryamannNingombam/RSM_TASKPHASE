require('dotenv').config({path:__dirname+'/.env'});
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/sign-in',async(req,res,next)=>{
    const email = req.body.email;
    password = req.body.password;
    
    const userTest = await User.findOne({email:email});
    if (!userTest){
        return res.json({
            success:false,
            message:"EMAIL_NOT_FOUND"
        })
    };
    bcrypt.compare(password,userTest.password,(err,response)=>{
            if (err){
                return res.json({
                    success:false,
                    message:err.message
                })
            }
            if (!response){
                return res.json({
                success:false,
                message:"WRONG_PASSWORD"
            });
        }
        const token = jwt.sign({
            email:email
        },process.env.JWT_TOKEN,{
            expiresIn:"3h"
        });
        return res.json({
            success:true,
            token:token,
            userData : {
                email
            }
        })


    })


})








router.post('/sign-up',async(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    if (password != req.body.password2){
        return res.json({
            success:false,
            message:"PASSWORDS_DONT_MATCH"
        })
    };
    const emailCheck = await User.findOne({email:email});
    if (emailCheck){
        return res.json({
            success:false,
            message : "EMAIL_EXISTS"
        })
    };

    //all tests cleared, let's go
    bcrypt.hash(password,10,(err,enc)=>{
        if (err){
            return res.json({
                success:false,
                message :"SERVER_ERROR"
            })
        };
        //saving the user;
        User.create({email:email,password:enc}).then(response=>{
            console.log("User created!");
            
            console.log("Signing in the user...");
            const token = jwt.sign({
                email:email
            },process.env.JWT_TOKEN,{
                expiresIn:"3h"
            });
            return res.json({
                success:true,
                token : token,
                userData : {
                    email
                }
            })
        


        }).catch(err=>{
            console.log("Error making user!");
            return res.json({
                success:false,
                message:"SERVER_ERROR"
            })
        })


    })




})



module.exports = router;