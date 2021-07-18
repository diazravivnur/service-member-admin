const { user, child, profile } = require("../../../models");


exports.getUserByAdmin = async (req, res) =>{
    try {
        const getUsers = await user.findAll({
            ...req.body,
            include : [
             {
                model : profile,
                as : "profile",
             },
             {
                model : child,
                as : "children"
             }
           ],
            attributes : {
                exclude : ["password"]
            }
        });
        if(!getUsers){
            return res.status(404).send({
                status : "failed",
                message : "users not found"
            })
        };
        res.send({
            status : "success",
            data : {
                user : getUsers
            }
        })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error"
        })
    }
}

exports.getDetailUserByAdmin = async (req, res) =>{
    try {
        const {id} = req.params;
        const getUsers = await user.findOne({
            ...req.body,
            include : [
             {
                model : profile,
                as : "profile",
             },
             {
                model : child,
                as : "children"
             }
           ],
            attributes : {
                exclude : ["password"]
            }
        });
        if(!getUsers){
            return res.status(404).send({
                status : "failed",
                message : "users not found"
            })
        };
        res.send({
            status : "success",
            data : {
                user : getUsers
            }
        })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error"
        })
    }
}


exports.getAllChildrenByAdmin = async (req, res) => {
    try {
        const getChildren = await child.findAll({
            ...req.body
        });
        if(!getChildren){
            return res.status(404).send({
                status : "failed",
                message : "child not found"
            })
        };

        res.send({
            status : "success",
            data : {
                child : getChildren
            }
        })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error"
        })
    }
}


exports.getDetailChildrenByAdmin = async (req, res) => {
    try {
        const {id} = req.params;
        const getChildren = await child.findOne({
            where : {id},
            ...req.body
        });
        if(!getChildren){
            return res.status(404).send({
                status : "failed",
                message : "child not found"
            })
        };

        res.send({
            status : "success",
            data : {
                child : getChildren
            }
        })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error"
        })
    }
}


exports.getChildrenOfParentByAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const getChilds = await child.findAll({
            where : {user_id : id},
        });
        if(!getChilds){
            return res.status(404).send({
                status : "failed",
                message : "child not found"
            })
        };
        res.send({
            status : "success",
            data : {
                child : getChilds
            }
        })
    } catch (error) {
       res.status(500).send({
           status : "success",
           message : "server error"
       }) 
    }
}

exports.registerAdmin = async (req, res) => {
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
            type_user : "admin",
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

exports.loginAdminWithEmails = async (req, res) => {
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