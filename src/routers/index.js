const express = require('express');
const router = express.Router();
/*controllers */

//router admin

//users
const { getUserByAdmin,
    getAllChildrenByAdmin, 
    getDetailChildrenByAdmin,
    getChildrenOfParentByAdmin,
    getDetailUserByAdmin,
    registerAdmin,
    loginAdminWithEmails
   } = require('../controllers/admin/admin');

// Profile Admin
const { getDetailAdmin, updatedProfileAdmin } = require("../controllers/admin/profile")


// contents
const {
    createContent,
    getContents,
    getContentDetail,
    updateContent,
    deleteContent,
  } = require("../controllers/admin/content");

//plans
const { 
  createSubsciptionPlan, 
  getSubscribtionPlan, 
  addFeature, 
  getAllFeature, 
  editFeature, 
  getDetailSubscribtionPlan, 
  getDetailFeature, 
  editSubsciptionPlan,
  deletePlan, 
  deleteFeature } = require('../controllers/admin/plan');  

//router users
const {
    registers, 
    loginWithEmails, 
    loginWithPhones, 
    checkAuth, 
    updatedPasswords
} = require("../controllers/auth");
const {
    updatedProfiles,  
    updatedPhotoProfiles, 
    getAllUsers,
    getDetailUsers
} = require('../controllers/profile');
const {
    addChildren, 
    getAllChildren, 
    getChildrenOfParent, 
    updatedChildren, 
    updatedPhotoChildren, 
    deleteChildrens,
} = require("../controllers/children");

  const {
    createPaket,
    getPakets,
    getPaketDetail,
    updatePaket,
    deletePaket,
  } = require("../controllers/paket");
//middlewares
const {
     auth
} = require("../middlewares/auth");
//add photo user
const {
    uploadFileUser
} = require("../middlewares/uploadFIleUser");

const { uploadFileContent } = require('../middlewares/uploadContent');


/* just for users */
/*routers */
//auth
router.post("/registers/post", registers);
router.post("/login/email/post", loginWithEmails);
router.post("/login/phone/post", loginWithPhones);
router.get("/check-auth", auth, checkAuth)
router.patch("/password/:id/post",auth, updatedPasswords);

//profile parent
router.patch("/user/profile/:id/post", auth, updatedProfiles);
router.patch("/user/profile/photo/:id/post", auth,  uploadFileUser("imageFile"), updatedPhotoProfiles);
router.get("/users", auth, getAllUsers);
router.get("/users/:id", auth, getDetailUsers);

//children
router.post("/child/:id/post", auth, addChildren);
router.get("/childs",auth, getAllChildren);
router.get("/child/:id",auth, getChildrenOfParent);
router.patch("/child/:parentId/:childId/post",auth, updatedChildren);
router.patch("/child/photo/:parentId/:childId/post",auth, uploadFileUser("imageFile"), updatedPhotoChildren);
router.delete("/child/:parentId/:childId/delete",auth, deleteChildrens);



/*just for Admin */
// auth admin
router.post("/admin/register/post", registerAdmin);
router.post("/admin/login/email/post", loginAdminWithEmails);

// profile admin
router.get("/admin/profile/:id", getDetailAdmin)
router.patch("/admin/profile/:id/post", updatedProfileAdmin)


//user
router.get("/admin/users", getUserByAdmin);///mendapatkan semua user
router.get("/admin/user/:id", getDetailUserByAdmin);//mendapatkan detail user
router.get("/admin/childrens", getAllChildrenByAdmin)//mendapatkan semaua chidl 
router.get("/admin/parent/:id/children", getChildrenOfParentByAdmin);//mendapatkan child dari id orang tua
router.get("/admin/:id/children", getDetailChildrenByAdmin);//mendapatkan detail children


//plan
router.post("/admin/plan/post", createSubsciptionPlan);//embuat subscibtion plan
router.get("/admin/plans", getSubscribtionPlan);//mendapatkan semua subscibtion plan
router.get("/admin/plan/:id", getDetailSubscribtionPlan);//mendapatkan detail subscibtion plan
router.patch("/admin/plan/:id/update", editSubsciptionPlan);//edit detail subscibtion plan melalui id plan
router.delete("/admin/plan/:id/delete", deletePlan);//delete plan where id
router.post("/admin/feature/post", addFeature);//menambahkan feature
router.get("/admin/features", getAllFeature);//mendapatkan semua feature
router.get("/admin/feature/:id", getDetailFeature);//mendapatkan  feature detial melaluii id
router.patch("/admin/feature/:id/update", editFeature)//edit feature
router.delete("/admin/feature/:id/delete", deleteFeature);//delete plan where id

// content
router.post("/admin/content/post", uploadFileContent("imageFile"), createContent);
router.get("/admin/contents", getContents);
router.get("/admin/content/:id", getContentDetail);
router.patch("/admin/content/:id/update", uploadFileContent("imageFile"), updateContent);
router.delete("/admin/content/:id/delete", deleteContent);

// paket
router.post("/addpaket/post", createPaket);
router.get("/getpakets", getPakets);
router.get("/getpaket/:id", getPaketDetail);
router.patch("/updatepaket/:id", updatePaket);
router.delete("/deletepaket/:id", deletePaket);


module.exports = router;

