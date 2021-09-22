const routeAccessControl = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).render("unauth");
  }
  const { userID, isAuth, isAdmin } = req.session.user;
  if (userID !== "Admin" || !isAuth || !isAdmin) {
    return res.status(401).render("unauth");
  }

  next();
};

module.exports = routeAccessControl;
