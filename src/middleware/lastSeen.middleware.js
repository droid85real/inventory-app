// lastSeen.middleware.js

//configure cookie
const setLastVisit = (req, res, next) => {
  if (req.cookies.lastSeen) {//1. if user req have cookie, then add a local variable with last seen time data
    res.locals.lastSeen = new Date(req.cookies.lastSeen).toLocaleString();
  }
  //res.cookie(nameOfCookie,Data,options)
  res.cookie("lastSeen", new Date().toISOString(), {//when user is visiting first time and hence no cookies,so set cookies or to update cookie
    maxAge: 2 * 24 * 60 * 60 * 1000, //2 days
  }); 
  next(); //calling next middleware
};

export default setLastVisit;
