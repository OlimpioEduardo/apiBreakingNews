import User from "../models/User.js";
import jwt from "jsonwebtoken";

const loginService = (email) => User.findOne({email: email}).select('+password')
// Guardar a sessao do usuario usando o token
const generateToken = (id)=> jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn:86400})

export {loginService, generateToken}