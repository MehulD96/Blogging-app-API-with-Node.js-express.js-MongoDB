import {getUser} from '../middleware/cookie.js';

export async function loggedInUserOnly(req,res, next) {
    //console.log(req);
    const userUid = req.cookies.uid;

    if(!userUid) {
        return res.status(400).json({message:"you're not logged in"}) //redirect user to login page through res.render
    }

    const user = getUser(userUid);

    if(!user) return res.status(400).json({message:"you are not logged in"});

    req.user = user;
    next();
}