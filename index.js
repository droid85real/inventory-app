// index.js
import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from "path";
import expressEjsLayouts from 'express-ejs-layouts';
import valdationMiddleware from "./src/middleware/validation.middleware.js";
import uploadFile from './src/middleware/upload.middleware.js';
import UserController from './src/controllers/user.controller.js';
import userRegisterValidationMiddleware from "./src/middleware/userRegisterValidation.middleware.js";
import session from 'express-session';
import authMiddleware from './src/middleware/auth.middleware.js';
import cookieParser from 'cookie-parser';
import setLastVisit from './src/middleware/lastSeen.middleware.js';

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

//setup cookie-parser
server.use(cookieParser());

// server.use(setLastVisit); //set last visit middleware (for cookie setup on every request)

//setup express-session
server.use(session({
  secret:"eaa29fbeb4dbbc568c26929fc9a5117c",
  resave:false,
  saveUninitialized:true, //temporarily,
  cookie:{secure:false} //temp
}));

//set user globally in res.locals for all views
server.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

//to serve static file like css
server.use(express.static(path.join(path.resolve(), "src", "public")));

//create an instance of Product Controller
const productController=new ProductController();

server.get(//calling getProducts to get products
  '/',
  setLastVisit, //set cookie
  productController.getProducts
); 

server.get( //calling so user can get add product form
  '/new-product',
  authMiddleware, //require login to access add product form
  productController.getAddForm
);

//parse form data
server.use(express.urlencoded({extended:true}));

server.post( //to submit new product
    '/',
    authMiddleware,
    uploadFile.single("imageUrl"), //middleware to proces a single file associated with the given form field
    valdationMiddleware, //for validation of post data from new-product.ejs
    productController.addNewForm 
); 

server.get(//to get update.product.ejs form
  "/update-product/:id",
  authMiddleware,
  productController.getUpdateProductView
); 

server.post(// to submit update-product
  "/update-product/",
  authMiddleware,
  uploadFile.single("imageUrl"),
  productController.postUpdateProduct
); 

server.post(//to delete product
  "/delete-product/:id",
  authMiddleware,
  productController.deleteProduct
); 

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

//to logout
server.get(
  "/logout",
  usersController.logout,
);

server.listen(3000,()=>{
    console.log("Server listening to 3000");
});