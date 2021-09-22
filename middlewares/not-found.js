const notFound = (req, res) => {
  return res.status(404).render("not-found");
};

module.exports = notFound;
