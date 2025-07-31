import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from "path";
import expressEjsLayouts from 'express-ejs-layouts';

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
server.use(express.static('src/views'));

//create an instance of Product Controller
const productController=new ProductController();

server.get('/',productController.getProducts);

server.listen(3000,()=>{
    console.log("Server listening to 3000");
});