import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req,res,next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });
        res.status(201).json({success: true, data: subscription});
    }catch(error){
        next(error);
    }
}

exportconst getUserSubscription = async (req,res,next) => {
    try{
        if(req.user.id !== req.params.id){}
    }catch(e){
        next(e);
    }
}