const { UnauthenticatedError } = require("../errors");
const path = require("path");
const routeAccessControl = (req, res, next) => {
  if (!req.session.user) {
    const filePath = path.resolve(__dirname + "/../views/unauth.html");
    return res.status(401).sendFile(filePath);
  }
  const { userID, isAuth, isAdmin } = req.session.user;
  if (userID !== "Admin" || !isAuth || !isAdmin) {
    const filePath = path.resolve(__dirname + "/../views/unauth.html");
    return res.status(401).sendFile(filePath);
  }

  next();
};

module.exports = routeAccessControl;
