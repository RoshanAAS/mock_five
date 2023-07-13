
const express=require('express')
 const {EmpModel}=require("../model/emp.model")
 const {auth}=require("../middleware/auth.middleware")

   const empRouter=express.Router()


   empRouter.post("/employees",auth,async(req,res)=>{
       
    try {
        const user= new EmpModel(req.body)
           
          await user.save()
      
        res.status(200).json({"msg":"Employee has been added","New_emp":req.body})
       } catch (err) {
   
           res.status(400).json({err:err.message})
       }
       
   })

   module.exports={empRouter}

