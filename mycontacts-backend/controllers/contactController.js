// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContact=(req,res)=>{
    res.json({message:"Get all contacts"});
}

// @desc create contacts
// @route POST /api/contacts
// @access public
const createContact=(req,res)=>{
    console.log("The request body is: ",req.body);
    const {name,contact}=req.body;
    if(!name||!contact){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    res.json({message:"Create contacts"});
}

// @desc Update all contacts
// @route PUT /api/contacts/:id
// @access public
const updateContact=(req,res)=>{
    res.json({message:`Upate contact for ${req.params.id}`});
}

// @desc delete contacts
// @route DELETE /api/contacts:id
// @access public
const deleteContact=(req,res)=>{
    res.json({message:`delete contact for ${req.params.id}`});
}

// @desc Get particular contacts
// @route GET /api/contacts/:id
// @access public
const getContactbyid=(req,res)=>{
    res.json({message:`Get contact for ${req.params.id}`});
}

module.exports={getContact,createContact,updateContact,deleteContact,getContactbyid};