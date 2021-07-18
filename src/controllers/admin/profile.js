const { user, profile, child } = require("../../../models");

exports.getDetailAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const getAdmin = await user.findOne({
            where : {id},
            ...req.body,
            include : [
                {
                model : profile,
                as : "profile",
            },

        ],
        attributes : {
            exclude : ["createdAt", "updatedAt", "password"]
        }
        });
        if(!getAdmin){
            return res.status(400).send({
                status : "failed",
                message : "user not found"
            })
        }
        res.send({
            status : "success",
            data : { 
                user : getAdmin 
            }
        })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error"
        })
    }
}

exports.updatedProfileAdmin = async (req, res) => {
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
