const express=require("express")
const router=express.Router();
const {getContact,createContact,updateContact,deleteContact,getContactbyid} =require("../controllers/contactController");

router.route("/").get(getContact).post(createContact);
router.route("/:id").put(updateContact).delete(deleteContact).get(getContactbyid);
module.exports=router