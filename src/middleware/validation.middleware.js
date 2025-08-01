const validateReq = (req, res, next) => {
  //validate data
  const { name, description, price, imageUrl } = req.body;
  let errors = [];
  if (!name || name.trim() == "") {
    errors.push("Name is required");
  }

  if (!description || description.trim() == "") {
    errors.push("Description is reqrired");
  }

  if (!price || parseFloat(price) < 1) {
    errors.push("Price must be positive");
  }

  try {
    new URL(imageUrl);
  } catch (err) {
    errors.push("Image url is invalid");
  }

  if (errors.length > 0) {
    return res.render("new-product", {
      errorMessage: errors, //passing error msg to new-product.ejs
      formData: req.body, //to repopulate with old data when error occur
    });
  }
  next(); //calling next middleware in the pipeline
};
export default validateReq;