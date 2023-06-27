import jwt from "jsonwebtoken";

export const genToken = (id)=>{
    return jwt.sign({id},process.env.SECRET_KEY,{expiresIn: "1d"});
}