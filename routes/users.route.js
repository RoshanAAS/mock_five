

const express=require('express')

const {UserModel}=require("../model/users.model")

const userRouter=express.Router()

const bcrypt=require("bcrypt")

const jwt=require('jsonwebtoken')


 userRouter.post('/signup',async(req,res)=>{
       

    const {Email,Password,Confirm_Password}=req.body

      console.log(Email,Password,Confirm_Password)
    try {
         
         const finduser= await UserModel.find({Email})
    
           if(finduser.length>0){
               
                res.status(200).json({msg:"This email id alredy exist please try with diffrent email"})
           }else{

               bcrypt.hash(Password,5,async(err,hash)=>{
                   
                   if(err){
                      res.status(200).json({msg:err.message})
                   }else{
                      const user= new UserModel({Email,Password:hash,Confirm_Password:hash})
                      user.save()
                   }
               })
      
               res.status(200).json({"msg":"The new user has been registered","registeredUser":req.body})
           }
          
        
       } catch (error) {
          res.status(400).json({error:error.message})
       }
       
 })


 userRouter.post("/login",async(req,res)=>{
        
    const {Email,Password}=req.body
    try {
    

        const user= await UserModel.findOne({Email})
        if(user){


        bcrypt.compare(Password, user.Password, function(err, result) {
        

           if(result){
              var token = jwt.sign({ course: 'backend' }, 'masai');
         
              res.status(200).json({msg:"Login Successful",token})
           }else{
              res.status(200).json({msg:"Wrong Credentials!!"}) 
           }
      });
         
        }else{
          res.status(200).json({msg:"Wrong Credentials!!"})
        }
    } catch (error) {
       res.status(400).json({meg:error.message})
    }
 })

 module.exports={userRouter}