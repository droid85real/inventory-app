import express from 'express';
import ProductController from './src/controllers/product.controller.js';

const server=express();

// server.get('/',(req,res)=>{
//     res.send("Welcome to inventory app");
// });

//create an instance of Product Controller
const productController=new ProductController();

server.get('/',productController.getProducts)


server.listen(3000,()=>{
    console.log("Server listening to 3000");
});