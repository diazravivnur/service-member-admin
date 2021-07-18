const { user, profile, child } = require("../../models");

exports.updatedProfiles = async (req, res) => {
    try {
        const { id } = req.params;
        //check profile 
        const getUsers = await profile.findOne({
            where : { user_id : id} 
        });
        if(!getUsers){
            return res.status(400).send({
                status : "failed",
                message : "user not found"
            })
        };    
        const getData = {
            ...req.body,
            user_id : id,
        } 
        const update = await profile.update(getData,{
            where : {user_id : id},
        });
        res.send({
            status : "success",
            data : {
                user : getData
            }
        })
    } catch (error) {
        res.status({
            status : "error",
            message : "server error",
        })
    }
}

exports.updatedPhotoProfiles = async (req, res) => {
    try {
        const { id } = req.params;
        //check profile 
        const getUsers = await profile.findOne({
            where : { user_id : id} 
        });
        if(!getUsers){
            return res.status(400).send({
                status : "failed",
                message : "user not found"
            })
        };
        //add photo
        const image = req.files.imageFile[0].filename;
        const path = process.env.PATH_KEY_USER;
        getData = {
            ...req.body,
            photo : path + image 
        } 
        const update = await profile.update(getData,{
            where : {user_id : id},
        });
        res.send({
            status : "success",
            data : {
                user : getData
            }
        })
    } catch (error) {
        res.status({
            status : "error",
            message : "server error",
        })
    }
}

exports.getAllUsers = async (req, res) => {
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
            exclude : ["createdAt", "updatedAt", "password"]
        }
        });
        if(!getUsers){
            return res.status(400).send({
                status : "failed",
                message : "user not found"
            })
        }
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



exports.getDetailUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const getUsers = await user.findOne({
            where : {id},
            ...req.body,
            include : [
                {
                model : profile,
                as : "profile",
            },
            {
                model : child,
                as  : "children"
            }
        ],
        attributes : {
            exclude : ["createdAt", "updatedAt", "password"]
        }
        });
        if(!getUsers){
            return res.status(400).send({
                status : "failed",
                message : "user not found"
            })
        }
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


