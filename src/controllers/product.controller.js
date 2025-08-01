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
    return res.render("new-product");
  }

  addNewForm(req, res) {
    // let products = ProductModel.get();
    // console.log(req.body);
    ProductModel.add(req.body);

    // res.render("products", { products: products });
    res.redirect("/"); //redirect after post to prevent resubmission on refresh
  }
}
