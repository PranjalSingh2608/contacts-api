const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");




// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContact=asyncHandler(async (req,res)=>{
    const contacts=await Contact.find();
    res.json(contacts);
}
)
// @desc create contacts
// @route POST /api/contacts
// @access public
const createContact=asyncHandler(async (req,res)=>{
    console.log("The request body is: ",req.body);
    const {name,email,phone}=req.body;
    const contact=await Contact.create({name,email,phone});
    res.status(201).json(contact);
})

// @desc Update all contacts
// @route PUT /api/contacts/:id
// @access public
const updateContact=asyncHandler(async (req,res)=>{
    const contacts=await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updateContact=await Contact.findByIdandUpdate(req.params.id,req.body,{new:true});
    res.json(updateContact);
}
)
// @desc delete contacts
// @route DELETE /api/contacts:id
// @access public
const deleteContact=asyncHandler(async (req,res)=>{
    const contacts=await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.remove();
    res.json(contacts);
}
)
// @desc Get particular contacts
// @route GET /api/contacts/:id
// @access public
const getContactbyid=asyncHandler(async (req,res)=>{
    const contacts=await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.json(contacts);
})

module.exports={getContact,createContact,updateContact,deleteContact,getContactbyid};