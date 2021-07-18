const { plan, feature, featureplan } = require("../../../models");


exports.createSubsciptionPlan = async (req, res) => {
    const { 
        feature_name : featureName, 
     } = req.body;
    try {
        const product = await plan.create({
            ...req.body,
         });
          const featured = await feature.findOne({
            where: {
              feature_name : featureName
            },
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
          });
          if(featured) {
            product.setFeatures(featured);
          } else {
            product.createFeature({ feature_name : featureName });
          }
        res.send({
            status : "success",
            data : {
                plan
            }
        })
    } catch (error) {
        res.status(404).send({
            status : "error",
            message : "server not found"
        })
    }
}

exports.editSubsciptionPlan = async (req, res) => {
    const { id } = req.params; 
    const { 
        feature_name : featureName, 
     } = req.body;
    try {
        const getPlan = await plan.findOne({
            where : {id},
        })
        if(!getPlan){
            return res.status(404).send({
                status : "failed",
                message : "data not found"
            })
        }
        const data = {
            ...req.body
        }
        const product = await plan.update(data,{
            where : {id},
         });
          const featured = await feature.findOne({
            where: {
              feature_name : featureName
            },
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
          });
          if(featured) {
            getPlan.setFeatures(featured);
          } else {
            getPlan.createFeature({ feature_name : featureName });
          }
        res.send({
            status : "success",
            data : {
                plan : featured
            }
        })
    } catch (error) {
        res.status(404).send({
            status : "error",
            message : "server not found"
        })
    }
}


exports.getSubscribtionPlan = async (req, res)=>{
    try {
        const getSubscribtionPlan = await plan.findAll({
            ...req.body,
            include : {
                model  : feature,
                as : "features",
                through : {
                    model : featureplan,
                    as : "conjunction"
                }
            }
        });
        res.send({
            status : "success",
            data : {
                plan : getSubscribtionPlan
            }
        })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error"
        })
    }
} 


exports.getDetailSubscribtionPlan = async (req, res)=>{
    try {
        const { id } = req.params;
        const getSubscribtionPlan = await plan.findOne({
            where : {id},
            ...req.body,
            include : {
                model  : feature,
                as : "features",
                through : {
                    model : featureplan,
                    as : "conjunction"
                }
            }
        });
        res.send({
            status : "success",
            data : {
                plan : getSubscribtionPlan
            }
        })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error"
        })
    }
} 


exports.addFeature = async (req, res) =>{
    const {
        feature_name 
    } = req.body;
    try {
        const getFeature = await feature.findOne({
            where : {
                feature_name : feature_name
            }
        });
        if(getFeature){
            return res.send({
                status : "failed",
                message : "fiture already created"
            })
        }
        const createFeature = await feature.create({
            ...req.body,
        });

        res.send({
            status : "success",
            data : {
                feature : createFeature,
            }
        })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error"
        })
    }
}


exports.getAllFeature = async (req, res) =>{
    try {
        const getFeature = await feature.findAll({
           ...req.body
        });
        res.send({
            status : "success",
            data : {
                feature : getFeature,
            }
        })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error"
        })
    }
}

exports.getDetailFeature = async (req, res) =>{
    try {
        const { id } = req.params;
        const getFeature = await feature.findOne({
            where : {id},
           ...req.body
        });
        if(!getFeature){
            return res.status(404).send({
                status : "failed",
                message : "data not found"
            })
        }
        res.send({
            status : "success",
            data : {
                feature : getFeature,
            }
        })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error"
        })
    }
}


exports.editFeature = async (req, res)=>{
    try {
        const {id} = req.params;
        const getFeature = await feature.findOne({
            where : {id}
         });
         if(!getFeature){
            return res.status(404).send({
                status : "failed",
                message : "data not found"
            })
         };
         const data = {
             ...req.body,
         }
         const editFeature = await feature.update(data,{
             where : {id}
         });
         res.send({
             status : "success",
             data : {
                 feature : data,
             }
         })
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : "server error"
        })
    }
}




exports.deletePlan = async (req, res) =>{
    try {
        const {id} = req.params;
        const checkPlan = await plan.findOne({
            where : {id},
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
        });
        if(!checkPlan){
            return res.send({
                status : 'failed',
                message : "data not found"
            })
        };
        await plan.destroy({
            where : {id}
        });
        res.send({
            status : "success",
            film : checkPlan
        })
    } catch (error) {
        res.status(500).send({
            status : 'error',
            message : "server not found",
        })
    }
}


exports.deleteFeature = async (req, res) =>{
    try {
        const {id} = req.params;
        const checkPlan = await feature.findOne({
            where : {id},
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
        });
        if(!checkPlan){
            return res.send({
                status : 'failed',
                message : "data not found"
            })
        };
        await feature.destroy({
            where : {id}
        });
        res.send({
            status : "success",
            film : checkPlan
        })
    } catch (error) {
        res.status(500).send({
            status : 'error',
            message : "server not found",
        })
    }
}