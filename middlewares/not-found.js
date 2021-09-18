const path = require("path");
const notFound = (req, res) => {
  const filePath = path.resolve(__dirname + "/../views/not-found.html");
  return res.status(404).sendFile(filePath);
};

module.exports = notFound;
