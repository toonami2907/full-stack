import Jwt  from "jsonwebtoken";
import errorHandler from "./error.js";

export const veriftToken = (req, res, next) =>{
    const token = req.cookies.access_token;

    if(!token) return next(errorHandler(401, 'Access Denied'));
    Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler(401, 'Token is not Valid'));
        req.user = user;
        next();
    })
}