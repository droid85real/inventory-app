// userRegisterValidation.middleware.js
import {body,validationResult} from "express-validator";
//express validator have body object and validationResult

const validateReq=async(req,res,next)=>{
    // validate data

    // 1. setup rules for validation
    const rules=[
        body("name").notEmpty().withMessage("Name is required"),
        body("email").notEmpty().withMessage("Email is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ];

    // 2. run rules
    await Promise.all(rules.map(rule=>rule.run(req)));

    // 3. check if there any error after running the rules
    var valdationErrors=validationResult(req);

    if(!valdationErrors.isEmpty()){
        return res.render("register",{
            errorMessage: valdationErrors.array(), //passing error msg to register.ejs
            formData: req.body,//to repopulate with old data when error occur
        });
    }
    next(); //calling next middleware in the pipeline
};
export default validateReq;