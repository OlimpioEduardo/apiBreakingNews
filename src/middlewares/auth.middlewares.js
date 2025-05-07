import dotenv from "dotenv"
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js"


dotenv.config()

export const authMiddleware =(req, res, next) =>{
try {

    const { authorization } = req.headers

    if (!authorization){
        return res.status(401).send({message: "Unaurization"})
    }
    
    const parts = authorization.split(" ")
// Schema e o nosso bearer no thunder client e o token e o token a ser validado

    const [schema, token] = parts
//Validacao do Token
   if (schema !=="Bearer") {
    return res.status(401).send({message:"Token Invalid"})
   }
   //verificando o TOKEN

   jwt.verify(token, process.env.SECRET_JWT, async (error, decoded)=>{
    if (error){
        return res.send(401).send({message: "Invalid token"})
    }

    const user = await userService.findByIdService(decoded.id)

    if(!user || !user.id){
        return res.status(401).send({message: "Invalid token!"})
       }
    
       req.userId = user.id

       return  next()
    
   });

} catch (error){
    res.status(500).send({message:error.message})
}
}



