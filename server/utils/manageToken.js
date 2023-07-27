import jwt from "jsonwebtoken";
export const generateToken=(data)=>{
     const token=jwt.sign({data:data},process.env.SECRET_KEY,{expiresIn:"30d"});
     return token;
}
export const decodeToken=(token)=>{
     const decoded=jwt.verify(token,process.env.SECRET_KEY)
     return decoded;
}