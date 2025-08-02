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

  //this function, so user can get add new product form and fill it
  getAddForm(req, res) {
    return res.render("new-product", { errorMessage: null, formData: {} }); //rendering new-product.ejs page
  }

  //to add new product (submit and reflect on product list)
  addNewForm(req, res) {
    // let products = ProductModel.get();
    // console.log(req.body);

    ProductModel.add(req.body); //passing data we received

    // res.render("products", { products: products });
    res.redirect("/"); //redirect after post to prevent resubmission on refresh
  }

  //to get the update-product.ejs and pass old data to populate
  getUpdateProductView(req, res, next) {
    //it returns view if product exist
    const id= req.params.id;
    const productFound = ProductModel.getProductById(id);

    if (productFound) {
      //if product found then render view
      res.render("update-product", {
        errorMessage: null,
        formData: productFound, //to repopulate input field with old data
      });
    } else {//else return errors
      res.status(401).send("Product not found");
    }
  }

  //to post (submit and reflect updated data)
  postUpdateProduct(req,res){
    ProductModel.update(req.body);

    res.redirect("/");
  }
  
  //to delete product
  deleteProduct(req,res){
    const id=req.params.id;

    const productFound=ProductModel.getProductById(id);

    if(productFound){
      ProductModel.delete(productFound);
      res.redirect("/");
    }else{
      res.status(401).send("Product not found");
    }
  }
}
