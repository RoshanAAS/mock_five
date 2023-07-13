
  const express=require('express')

  const {connection}=require("./db")

  const {userRouter}=require('./routes/users.route')
  const {empRouter}=require("./routes/employee.routes")
  const jwt=require("jsonwebtoken") 
  const cors=require("cors")
  const app=express()
  
  app.use(express.json())

  app.use(cors())
  
 
     app.use('/users',userRouter)
     app.use("/add",empRouter)




    app.listen(process.env.port,async(req,res)=>{
       try {
         await connection
         console.log("mongoDB connected")
       } catch (error) {
        console.log(error.message)
       }
   })

