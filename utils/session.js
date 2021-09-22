const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session")(session);

const sessionHandler = () => {
  const store = new mongoDBSession({
    uri: process.env.MONGO_URI,
    collection: "sessions",
  });
  const session_options = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  };

  return session(session_options);
};

module.exports = sessionHandler;
