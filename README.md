## Inventory App Project
used
+ express
+ ejs (for dynamic content)
+ ejs-layout (to separate web page components)
+ mvc pattern
+ express-validator (for form validation)
+ multer (to upload file)
+ express-session (for session)

Start
+ `npm init` to initialise app 
+ `npm i express` we will we working with express.js
+ create file structure where index.js is main entry point.
+ change `"type": "module",` in `package.json` and stick with ES6 import/Export 

For template literals in product.html to dynamically load data we use `npm ejs`
https://www.npmjs.com/package/ejs
+ `npm i ejs` to install 
+ then setup view engine in index.js
+ also rename `product.html` to `product.ejs`
+ and use `res.render(view,data)` to send data dynamically in `product.controller.js`
+ `res.render(view,data)` in here data is key value pair and is optional
+ use `<%= %>` to assign variable in `product.ejs`

Separate `nav` from `main` in `product.ejs`
https://www.npmjs.com/package/express-ejs-layouts
+ `npm i express-ejs-layouts` To install ejs layout
+ setup `express-ejs-layout` in index.js
+ split `product.ejs` into `nav.ejs` and `layout.ejs` in views
+ to include nav and body in `layout.ejs` use
	+ `<%- include('nav') %>` for nav
	+ `<%- body %>` for rest of body

Add new product form
+ inside product.controler.js we make another `getAddForm` (function) so user can get form to add product in product.controller.js
+ then, in index.js set routing using `server.get(route,functioncall)` in index.js
+ add another function `addNewForm(req,res)` which submit new product in product.controller.js
+ then add routing `server.post('/',productController.addNewForm)` in index.js
+ parse data and update on submit
	+ to parse `server.use(express.urlencoded({extended:true}));` in index.js
	+ and to add data we create `static add()` in product.model.js
	+ and pass data to it we use `addNewForm()` in product.controller.js and call it at index.js
	+ and to input data we used `new-product.ejs` using form html

Validating form data, server side and html form and also repopulate on error
+ validating data at `addNewForm()` in product.controller.js
+ and then passing `errorMessage` and `formData` (to repopulate) if error>0, through `getAddForm()` to `new-product.ejs` using `res.render(route,data)` in product.controller.js
+ also passing `errorMessage` and `formData` initially as null and empty in `getAddForm()` in product.controller.js
+ and looping over `errorMessage` and set `formData` in value of form to repopulate in `new-product.ejs`

Shifting validation code to middleware level
+ for SOP and lose coupling
+ shift validation code from `addNewForm()` (product.controller.js) to validate.middleware.js
+ and add middleware in index.js
	+  `server.post('/',valdationMiddleware,productController.addNewForm); `

Using express-validator for validating data instead of our own validator
https://www.npmjs.com/package/express-validator
+ `npm i express-validator` To install express validator
+ remove old validation code in validate.middleware.js and 
+ express validator requires three steps 
1.setup rules
+ using `body` object from `express-validator`
2.run those rules
+ running rules can be async so we use promise
+ `Promise.all()` it takes an array of promises and execute all of them and `await` is for waiting for execution to end
+ and `await` requires `async`
3.check if there any errors after running the rules
+ using `validationResult` from express-validator
+ `validationResult` return all the errors that appeared while running the rules 
+ and then pass that error to `new-product.ejs` through `errorMessage` in `res.render()` in `validation.middleware.js`

Update Product that already exist
+ `getUpdateProductView()` in product.controller.js so if product exist it return view or else error
	+ we used `req.params.id` to get access to id parameter
+ create static `getProductById()` in product.model.js to return product by id
+ create `update-product.ejs` in views
	+ it shows old data of product and have id input hidden
+ and provide routing in index.js i.e. `server.get("/update-product:id,middleware")`
+ add update button in `product.ejs`
	+  which send id embedded with URL

+ and now to update the data 
+ create `server.post("/update-product",productController.postUpdateProduct);` in index.js
+ in `update-product.ejs` in form action 
	+ `<form action="/update-product" method="post">`
+ in product.controller.js create `postUpdateProduct()` to pass data and redirect
+ in product.model.js create `static update()` to update the product data

Adding Delete product button and functionality
+ add delete button in `products.ejs`
+ add routing in index.js `server.get("/delete-product/:id",productController.deleteProduct);`
+ add `deleteProduct()` in product.controller.js which checks if product is present then delete or else throw status code 401 not found
+ add `static delete()` in product.model.js

Confirm before delete
+ `onClick("deleteProduct('')")` in `products.ejs`
+ then add main.js in public
+ link main.js using script tag in `products.ejs`
+ in product.model.js , at `add()` we changed id generator to take current time as id

Add and Upload files instead of image URL using Multer
https://www.npmjs.com/package/multer
+ `npm i multer` To install `multer`
+ make changes in `new-product.ejs` and `add-product.ejs`
	+ changing `<input type="file" accept="images/*" />` to accept only all images
	+ and `<form enctype="multipart/form-data" >` To accept file as well as some text
+ create `upload.middleware.js` and config `multer` so files uploaded are stored inside `public/images` using `diskStorage()`
	+ `diskStorage()` have two call back function , destination(to tell the storage location) and filename (to tell filename)
+ apply middleware in index.js at `server.post('/',uploadFile.single("imageUrl"),valdationMiddleware,productController.addNewForm);`

| `Multer` changes how the uploaded data appears in  |  `req`:     |
| -------------------------------------------------- | ----------- |
| Text fields (e.g., `name`, `description`, `price`) | `req.body`  |
| Single file upload (e.g., `imageUrl`)              | `req.file`  |
| Multiple files (e.g., `images[]`)                  | `req.files` |

+ make changes to product.model.js to accept `imageUrl` from `req.file` instead of `req.body` in `static add()`
+ similar changes to `update-product.ejs` and update in product.model.js and  `postUpdateProduct()` in product.controller.js and also apply middleware in index.js `server.post("/update-product/",uploadFile.single("imageUrl"),productController.postUpdateProduct);`

User registration and login
registration
+ create user.model.js inside it define constructor
+ create `register.ejs` define html form for user registration
+ create user.controller.js and inside it define `getRegistrationForm()` and inside it `res.render("ejs fileName which needs to be rendered")`
+ in index.js create instance of `UserController` and define routing `server.get("/register",usersController.getRegistrationForm);`

+ inside user.controller.js define `postRegistrationForm()` to pass data to `user.model.js` and redirect to login
+ inside user.model.js define `addUser()` to add new user and add user sample data
+ to post data define `server.post("/register",usersController.postRegistrationForm);`

+ create `userRegisterValidation.middleware.js` and setup and configure user validation using `express-validator`
+ make changes to `register.ejs` so it can show error and repopulate old data when error occur
+ in index.js, change to `server.post("/register",userRegisterValidationMiddleware,usersController.postRegistrationForm);`
+ in user.controller.js , change `getRegistrationForm` so it sends `errorMessage` and `formData` initially to `null` and `{}`
+ in user.controller.js ,in `postRegistrationForm()`, check if user already exist .
+ in index.js define `server.post("/login",usersController.postLogin);` to post login data


login
+ similar steps for login
+ create view `login.ejs`
+ create `getLogin()` to render `login.ejs` in user.controller.js
+ in index.js define routing `server.get("/login",usersController.getLogin);`
+ create `postLogin()` in user.Controller.js to check posted data and grant login


Session and logout feature
https://www.npmjs.com/package/express-session
+ `npm i express-session` To install express session
+ in index.js ,setup `express-session`
+ user.controller.js ,in `postLogin()` , save user data to session using `req.session`
+ create auth.middleware.js which check if every request made by client have session id, if not then redirect to login
+ in index.js ,apply middleware to secure add-product, update-product and delete-product request only be done by logged in user
+ add logout button in `nav.ejs` using `locals` of `ejs`
+ place, config `users` globally in `res.locals` for all views, after express-session config in index.js
+ destroy session on `logout()` in user.controller.js
+ and define routing in index.js `server.get("/logout",usersController.logout,);`

Cookies
https://www.npmjs.com/package/cookie-parser
+ `npm i cookie-parser` To install cookie parser
+ create `lastSeen.middleware.js` and inside it setup cookie and `res.cookie(nameOfCookie,Data,options)`
+ in `products.ejs `, make changes to show last seen
+ in index.js before express-session config , config cookie-parser and `setLastVisit` middleware

+ destroy cookie on `logout()` in user.controller.js
+ set cookie on get product request only in index.js

Secure secret key, add .env support
https://www.npmjs.com/package/dotenv
+ `npm install dotenv` To install `dotenv`
+ change security code in session cause it is exposed in git 
+ create .env and setup session-token code there
+ create .`env.example` for example for other dev
+ config `dotenv` in index.js like this `dotenv.config();`
+ and use `secret:process.env.SESSION_SECRET` to secure session secret key in config session in index.js

+ `npm audit` To check for vulnerability

---
---
