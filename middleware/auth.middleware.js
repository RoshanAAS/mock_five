
const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{

    const token=req.headers.authorization?.split(" ")[1]

      try {
        if(token){
           const decode=jwt.verify(token,"masai")

           if(decode){
             next()
           }else{
             res.status(200).json({msg:"token not reconized"})
           }
        }
      } catch (error) {
        res.status(400).json({mgg:error.message})
      }
}

module.exports={auth}