const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Controller {
    static register(req,res){
        let checkname = req.body.name.length
        let checkemail = validateEmail(req.body.email)
        let checkpassword = req.body.password.length

        // cek panjang input name dan password
        if(checkname < 4 || checkpassword < 4){
            res.status(400).json({
                message : 'Minimum name & password length is 4'
            })
        }

        // cek format email
        if(checkemail !== true){
            res.status(400).json({
                message : 'Invalid email format'
            })
        }
        
        bcrypt.hash(req.body.password, 10).then(function(hash) {
            User.create({
                name : req.body.name,
                email : req.body.email,
                password : hash,
                oauth : false
            })
            .then((result)=>{
                res.status(201).json({
                    data : result,
                    message : 'Registration Success! you can use your email and password to log in' 
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    error : err,
                    message : 'Internal Server Error, Register Failed'
                })
            })
        });
    }

    static gsignin(req,res){
        console.log('req body',req.body)
        console.log('masuk ke controller gsignin')
        console.log('====')
        console.log(process.env.CLIENT_ID)
        console.log('===')

        client.verifyIdToken({
            idToken: req.body.gtoken,
            audience: process.env.CLIENT_ID
            
        },function(err,result){
            console.log('result',result)
            let pEmail = result.payload.email
            let pName = result.payload.name

            User.findOne({
                email : pEmail
            },function(err,result){
                
                if(result === null){
                    User.create({
                        name : pName,
                        email : pEmail,
                        oAuth : true,
                        password : null
                    },function(err,response){
                        if(err){
                            res.status(500)({
                                message : 'Internal Server Error'
                            })
                        }else{
                            const token = jwt.sign({_id: response._id, name : response.name , email : response.email},process.env.secret_key)
                            res.status(200).json({
                                token : token,
                                userId : response._id
                            })
                        }
                    })
                }else if(err){
                    res.status(500).json({
                        message : 'Internal Server Error'
                    })
                }else{
                    const token = jwt.sign({_id: result._id, name : result.name , email : result.email},process.env.secret_key)
                    res.status(200).json({
                        token : token,
                        userId : result._id
                    })
                }
            })
        });
    }

    static login(req,res){
        if(req.body.email.length < 1 || req.body.password.length < 1){
            res.status(500).json({
                message : 'Invalid Email / Password'
            })
        }

        User.findOne({
            email : req.body.email
        })
        .then((user)=>{
            bcrypt.compare(req.body.password, user.password)
            .then(function(result) {
                if(result === true){
                    let token = jwt.sign({
                        id : user._id,
                        name : user.name,
                        email : user.email
                    },process.env.secret_key)   

                    res.status(200).json({
                        token : token,
                        userId : user._id
                    })
                }else{
                    res.status(500).json({
                        message : 'Invalid Password'
                    })
                }
            })
            .catch((err)=>{
                res.status(500).json({
                    error : err,
                    message : 'Internal Server Error'
                })
            })
        })
        .catch((err)=>{
            res.status(500).json({
                error : err,
                message : `Invalid Email`
            })
        })
    }

    static read(req,res){
        User.findOne({
            _id : req.userId //dari middleware
        })
        .populate('todo_list')
        .then((profile)=>{
            res.status(200).json(profile)
        })
        .catch((err)=>{
            res.status(500).json({
                error : err,
                message : 'Failed to retrieve user data'
            })
        })
    }
}



module.exports = Controller