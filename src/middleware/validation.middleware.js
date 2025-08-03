// validation.middleware.js
import { body,validationResult } from "express-validator";
//express validator have body object and validationResult

const validateReq = async(req, res, next) => {
  //validate data

  //   1.setup rules for validation
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be positive value"),
    body("imageUrl").custom((value,{req})=>{
      if(!req.file){
        throw new Error("Image is required");
      }
      return true;
    }),
    // body("imageUrl").isURL().withMessage("invalid URL"),
  ];

  //   2.run those rules
  await Promise.all(rules.map(rule=>
    rule.run(req)
  ));

//   3.check if there are any errors after running the rules
  var validationErrors=validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: validationErrors.array(), //passing error msg to new-product.ejs
      formData: req.body, //to repopulate with old data when error occur
    });
  }
  next(); //calling next middleware in the pipeline
};
export default validateReq;