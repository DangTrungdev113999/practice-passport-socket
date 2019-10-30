import { validationResult } from "express-validator";
import { auth } from "./../services/index";
import { transSuccess } from "../../lang/vi";

let index = (req, res) => {
  res.render(
    "auth/master", 
    { 
      errors:  req.flash("errors"), 
      success: req.flash("success") 
    }
  )
};

let postRegister = async (req, res) => {
  let errorArr = [];
  let successArr = [];
  let validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach( error => {
      errorArr.push(error.msg);
    })
    req.flash("errors", errorArr)
    return res.redirect("/login-register");
  }

  try {
    let result = await auth.register(
      req.body.username,
      req.body.email,
      req.body.password,
    );
    successArr.push(result);
    req.flash("success", successArr);
    res.redirect("/login-register");

  } catch (error) {
    console.log(error);
    errorArr.push(error);
    req.flash("errors", errorArr)
  }
};

let logout = (req, res) => {
  req.logout();
  req.flash("success", transSuccess.logout_success);
  res.redirect("/login-register");
};

let checkLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login-register");
  }
  next();
};

let checkLogout = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return next();
}



module.exports = {
  index,
  postRegister,
  logout,
  checkLogin,
  checkLogout
}