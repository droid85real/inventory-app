// index.js
import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from "path";
import expressEjsLayouts from 'express-ejs-layouts';
import valdationMiddleware from "./src/middleware/validation.middleware.js";
import uploadFile from './src/middleware/upload.middleware.js';
import UserController from './src/controllers/user.controller.js';
import userRegisterValidationMiddleware from "./src/middleware/userRegisterValidation.middleware.js";

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

server.post( //to submit new product
    '/',
    uploadFile.single("imageUrl"), //middleware to proces a single file associated with the given form field
    valdationMiddleware, //for validation of post data from new-product.ejs
    productController.addNewForm 
); 


server.get("/update-product/:id",productController.getUpdateProductView); //to get update.product.ejs

server.post("/update-product/",uploadFile.single("imageUrl"),productController.postUpdateProduct); // to submit update-product

server.post("/delete-product/:id",productController.deleteProduct); //to delete product


//create instance of User controller
const usersController=new UserController();

//to get resgistration form on route /register
server.get("/register",usersController.getRegistrationForm);

//to post data from register
server.post(
  "/register",
  userRegisterValidationMiddleware, //form validation using express-validator
  usersController.postRegistrationForm //to add user
);

//to get login form
server.get("/login",usersController.getLogin);

//to post login data
server.post("/login",usersController.postLogin);

server.listen(3000,()=>{
    console.log("Server listening to 3000");
});