const {user, profile, child} = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.registers = async (req, res) => {
    try {
        const { email, password} = req.body; 
        //validate
        const schema = joi.object({
            name : joi.string().min(4).required(),
            email : joi.string().email().min(6).required(),
            code_country : joi.string().required(),
            country : joi.string().min(3).required(),
            mobile : joi.string().min(5).required(),
            password : joi.string().min(6).required(),
            status_user : joi.string().min(6).required(),
        });
        const { error } = await schema.validate(req.body);
        if(error){
            return res.status(404).send({
                status : "failed",
                message : error.details[0].message,
            })
        }

        if(!password.match(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/))){
            return res.send({
                status : "failed",
                message : "Password should be min 6 alpanumeric character with 1 upper case character"
            })
        }
        //check Users
        const checkUsers = await user.findOne({
            where : { email }
        });
        if(checkUsers){
            return res.send({
                status : "failed",
                message : "email & password already registered",
            })
        }; 
         //enkripsy password
        const passwordStrength = 10;
        const passwordHashed = await bcrypt.hash(password, passwordStrength);
        //create user  
        const createUser = await user.create({
            ...req.body,
            password : passwordHashed,
            status_user : "active"
        });
        const createProfile = await profile.create({
            ...req.body,
            type_user : "parent",
            user_id : createUser.id,
        });
        //token 
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({id : createUser.id}, secretKey)
        res.send({
            status : "success",
            data : {
                user : createUser,
                token
            }
        })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error",
        })
    }
}

exports.loginWithEmails = async (req, res) => {
        try {
            const {email, password } = req.body;
                const schema = joi.object({
                    email : joi.string().email().min(6).required(),
                    password : joi.string().min(6).required(),
                });
                const { error } = await schema.validate(req.body);
                if(error){
                    return res.status(404).send({
                        status : "failed",
                        message : error.details[0].message,
                    })
                }
                const getUsers = await user.findOne({
                    where : {email},
                });
                if(!getUsers){
                    return res.status(404).send({
                        status : "failed",
                        message : "email and password don't match"
                    });    
                }
                //compare password
                const isValidPassword = await bcrypt.compare(password, getUsers.password);
                if(!isValidPassword){
                    return res.status(400).send({
                        status : "failed",
                        message : "password salah"
                    })
                };
                const secretKey = process.env.SECRET_KEY;
                const token = jwt.sign({id : getUsers.id}, secretKey)
                res.send({
                    status : "success",
                    data : {
                        user : getUsers,
                        token
                    }
                });
        } catch (error) {
            res.status(500).send({
                status : "error",
                message : "server error"
            })
        }   
}

exports.loginWithPhones = async (req, res) => {
    try {
        const { mobile, password } = req.body;
            const schema = joi.object({
                 mobile : joi.string().min(6).required(),
                 password : joi.string().min(6).required(),
            });
            const { error } = await schema.validate(req.body);
            if(error){
                return res.status(404).send({
                    status : "failed",
                    message : error.details[0].message,
                })
            }
            const getUsers = await user.findOne({
                where : { mobile },
            });
            if(!getUsers){
                return res.status(404).send({
                    status : "failed",
                    message : "phone and password don't match"
                });    
            }
            //compare password
            const isValidPassword = await bcrypt.compare(password, getUsers.password);
            if(!isValidPassword){
                return res.status(400).send({
                    status : "failed",
                    message : "password salah"
                })
            };
            const secretKey = process.env.SECRET_KEY;
            const token = jwt.sign({ id : getUsers.id }, secretKey)
            res.send({
                status : "success",
                data : {
                    user : getUsers,
                    token
                }
            })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error"
        })
    }   
} 

exports.updatedPasswords = async (req, res) =>{
    try {
      const { id } = req.params;
      const { password } = req.body;
      const schema = joi.object({
        password : joi.string().min(8).required(),
    });
    const { error } = await schema.validate(req.body);
    if(error){
        return res.status(404).send({
            status : "failed",
            message : error.details[0].message,
        })
    }
      const checkUsers = await user.findOne({
          where : {id}
      });
      if(!checkUsers){
          return res.send({
              status : "failed",
              message  : "user not found"
          })
      };
      if(!password.match(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/))){
        return res.send({
            status : "failed",
            message : "Password should be min 6 alpanumeric character with 1 upper case character"
        })
    }
     const getData = {
        ...req.body, 
    } 
    const update = await user.update(getData,{
        where : {id},
    });
    res.send({
        status : "successs",
        data : {
            user : update,
        }
    })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error"
        })
    }
}
      
exports.checkAuth = async (req, res) => {
    try {
        const id = req.userId;

        const dataUser = await user.findOne({
            where: {
                id
            },
            include : [
                {
                    model : profile,
                    as : "profile"
                },
                {
                    model : child,
                    as  : "children"
                } 
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', "password"]
            }
        });
        if (!dataUser) {
            return res.status(404).send({
                status: "Failed"
            })
        }
        res.send({
            status: "success",
            message: "user valid",
            data: {
                user: dataUser
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            message: "server error"
        });
    }
}