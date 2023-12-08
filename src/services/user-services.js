import jwt from 'jsonwebtoken';

export const genrateToken = async ({ payload, ExpiratioTime }) => {
    return await jwt.sign(payload, "HellothereThisisatestproject123456789012", {
      expiresIn: 24*24*1000,

    });
  };


export const verifyToken = async(token )=>{
    return await jwt.verify(token, "HellothereThisisatestproject123456789012");
    
}