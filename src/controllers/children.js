const { user,  child } = require("../../models");
const joi = require("joi");
const { calculate_age } = require("../utils/age");


exports.addChildren = async (req, res) => {
    try {
        const { id } = req.params;
        const { dob } = req.body;
        //validate 
        const schema = joi.object({
            name : joi.string().min(4).required(),
            dob : joi.string().required(),
        });
        const {error} = await schema.validate(req.body);
        if(error){
            return res.status(404).send({
                status : "failed",
                message : error.details[0].message
            })
        }
        //get parent
        const getParent = await user.findOne({
            where : {id}
        });
        if(!getParent){
            return res.status(404).send({
                status : "failed",
                message : "user not found"
            })
        };
        const addChilds = await child.create({
            ...req.body,
            user_id : getParent.id,
            age : calculate_age(new Date(dob)),
            type_user : "child" ,
            status_child  : "active"
        })
        res.send({
            status : "success",
            data : {
                child : addChilds
            }
        })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error"
        })
    }
}

exports.getAllChildren = async (req, res) => {
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


exports.getChildrenOfParent = async (req, res) => {
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

exports.updatedChildren = async (req, res) => {
        try {
            const { parentId, childId } = req.params;
            const { dob } = req.body;
            const getChilds = await child.findOne({
                where : {user_id : parentId, id : childId}
            });
            if(!getChilds){
                return res.status(404).send({
                    status : "failed",
                    message : "child not found"
                })
            };
            const data = {
                ...req.body,
                age : calculate_age(new Date(dob)),
            }
            await child.update(data,{
                where : {user_id : parentId, id : childId}
            });
            res.send({
                status : "success",
                data : {
                    child : data
                }
            })
        } catch (error) {
            res.status(500).send({
                status : "error",
                message : "server error"
            })
        }
};

exports.updatedPhotoChildren = async (req, res) => {
    try {
        const { parentId, childId } = req.params;
        const getChilds = await child.findOne({
            where : {user_id : parentId, id : childId}
        });
        if(!getChilds){
            return res.status(404).send({
                status : "failed",
                message : "child not found"
            })
        };
        const image = req.files.imageFile[0].filename;
        const path = process.env.PATH_KEY_USER;
        const data = {
            ...req.body,
            photo : path + image,
        }
        await child.update(data,{
            where : {user_id : parentId, id : childId}
        });
        res.send({
            status : "success",
            data : {
                child : data
            }
        })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error"
        })
    }
};


exports.deleteChildrens = async (req, res) => {
    try {
        const { parentId, childId } = req.params;
        
        const getChild = await child.findOne({
            where : { user_id : parentId, id : childId},
        });
        if(!getChild){
            return res.status(404).send({
                status : "failed",
                message : "child not found",
            })
        };
        const deleteChild = await child.destroy({
            where : { user_id : parentId, id : childId},
        });
        res.send({
            status : "success",
            data : {
                child  : getChild.id
            }
        })
    } catch (error) {
        res.send({
            status : "error",
            message : "server error"
        })
    }
}
