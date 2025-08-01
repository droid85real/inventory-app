// index.js
import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from "path";
import expressEjsLayouts from 'express-ejs-layouts';
import valdationMiddleware from "./src/middleware/validation.middleware.js";

const server=express();

// server.get('/',(req,res)=>{
//     res.send("Welcome to inventory app");
// });

//setup view engine
server.set('view engine','ejs'); //tells which view engine
server.set('views',path.join(path.resolve(), "src", "views")); //where to look for views

//setup ejslayout
server.use(expressEjsLayouts);//use ejs layout (middleware)
server.set('layout','layout'); //default layout

//to serve static file like css
server.use(express.static(path.join(path.resolve(), "src", "public")));

//create an instance of Product Controller
const productController=new ProductController();

server.get('/',productController.getProducts); //calling getProducts to get products

server.get('/new-product',productController.getAddForm); //calling so user can get add product form

//parse form data
server.use(express.urlencoded({extended:true}));

server.post('/',valdationMiddleware,productController.addNewForm); //to submit new product
//validationMiddleware for validation of post data from new-product.ejs

server.listen(3000,()=>{
    console.log("Server listening to 3000");
});