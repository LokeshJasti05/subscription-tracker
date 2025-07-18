import jwt from 'jsonwebtoken'; 
import { JWT_EXPIRES_IN } from "../config/env";
import User from '../models/user.model';

const authorize = async(req,res,next) => {
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) return res.status(401).json({message: 'Unauthorized'});

        const decoded = jwt.verify(token, JWT_EXPIRES_IN);

        const user = await User.findById(decoded.userId);

        if(!user) return res.status(401).json({message: 'Unauthorized'}); 

        req.user = user;
        next();
    }catch(error){
        res.status(401).json({message: 'Unauthorized', error: error.message});

    }
}

//1:56:41
export default authorize;