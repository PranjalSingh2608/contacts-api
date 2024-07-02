const asyncHandler=require("express-async-handler");

const userRegister=asyncHandler(async (req,res)=>{
    res.json({message:"Register the user"});
}
);

const userLogin=asyncHandler(async (req,res)=>{
    res.json({message:"login the user"});
}
);

const currentUser=asyncHandler(async (req,res)=>{
    res.json({message:"Current user"});
}
);
module.exports={userRegister,userLogin,currentUser};