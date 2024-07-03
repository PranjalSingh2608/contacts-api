const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");




// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContact=asyncHandler(async (req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.json(contacts);
}
)
// @desc create contacts
// @route POST /api/contacts
// @access private
const createContact=asyncHandler(async (req,res)=>{
    console.log("The request body is: ",req.body);
    const {name,email,phone}=req.body;
    const contact=await Contact.create({name,email,phone,user_id:req.user.id});
    res.status(201).json(contact);
})

// @desc Update all contacts
// @route PUT /api/contacts/:id
// @access private
const updateContact=asyncHandler(async (req,res)=>{
    const contacts=await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contacts.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("Not authorized to update this contact");
    }
    const updateContact=await Contact.findByIdandUpdate(req.params.id,req.body,{new:true});
    res.json(updateContact);
}
)
// @desc delete contacts
// @route DELETE /api/contacts:id
// @access private
const deleteContact=asyncHandler(async (req,res)=>{
    const contacts=await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contacts.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete this contact");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.json(contacts);
}
)
// @desc Get particular contacts
// @route GET /api/contacts/:id
// @access private
const getContactbyid=asyncHandler(async (req,res)=>{
    const contacts=await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.json(contacts);
})

module.exports={getContact,createContact,updateContact,deleteContact,getContactbyid};