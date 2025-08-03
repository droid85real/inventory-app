//user.controller.js
import UserModel from "../models/user.model.js";

export default class UserController {
  //render register.ejs
  getRegistrationForm(req, res) {
    res.render("register", { errorMessage: null, formData: {} });
  }

  //submit registration and redirect to login
  postRegistrationForm(req, res) {
    const userFound = UserModel.getUserByEmail(req.body.email);

    if (userFound) {
      // res.status(409).send("email already used");
      res
        .status(409)
        .render("register", {
          errorMessage: [{ msg: "email already used" }],
          formData: req.body,
        });
    } else {
      UserModel.addUser(req);
      res.redirect("/login");
    }
  }

  //render login.ejs
  getLogin(req, res) {
    res.render("login",{ errorMessage: null, formData: {} });
  }

  //to check posted data and grant login
  postLogin(req, res) {
    const userFound = UserModel.check(req.body);

    if (userFound) {
      req.session.user={ //store user data in session
        id:userFound.id,
        email: userFound.email,
      };
      res.redirect("/");
    } else {
      // res.status(422).send("user not found");
      res
        .status(422)
        .render("login", {
          errorMessage: [{ msg: "User not found or wrong credentials" }],
          formData: req.body,
        });
    }
  }

  //to logout
  logout(req,res){
    req.session.destroy((err)=>{ //destroy session
      if(err){
        console.log(err);
      }else{
        res.redirect("/login");
      }
    });
  }
}
