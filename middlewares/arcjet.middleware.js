import aj from '../config/arcjet.js'

const arcjetMiddleware = async (req,res,next) => {
  try{
    const decision = await aj.protect(req , {requested: 1});

    if(decision.isDenied()){
      if(decision.reason.isRateLimited()) return res.status(429).json({message: "Too many requests"});
      if(decision.reason.isBot()) return res.status(403).json({message: "Bot detected"});


      return res.status(403).json({message: "Access denied"});
    }

    next();
  }catch(error){
    console.log(`Arcjet middle ware error : ${error}`);
    next(error);
  }
}

export default arcjetMiddleware;