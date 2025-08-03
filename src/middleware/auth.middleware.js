// auth.middleware.js

const auth=(req,res,next)=>{
    if(req.session && req.session.user){
        next(); //calls next middleware in pipeline
    }else{
        res.redirect("/login");
    }
};

export default auth;