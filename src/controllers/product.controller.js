// product.controller.js
// import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    // console.log(product)
    res.render("products", { products: products }); //render products dynamically
    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "products.html")
    // );
  }

  //this function, so user can get form
  getAddForm(req, res) {
    return res.render("new-product", { errorMessage: null, formData: {} }); //rendering new-product.ejs page
  }

  addNewForm(req, res) {
    // let products = ProductModel.get();
    // console.log(req.body);

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

    ProductModel.add(req.body); //passing data we received

    // res.render("products", { products: products });
    res.redirect("/"); //redirect after post to prevent resubmission on refresh
  }
}
