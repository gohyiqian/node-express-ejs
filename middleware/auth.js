const isLoggedIn = (req, res, next) => {
  // authentication purpose
  if (req.header("Authorization") === "Basic emhpcXVhbjphYmNkMTIzNA==") {
    req.user = {
      name: "John",
      age: 24,
      address: "Sentosa",
    };
    next();
  } else {
    res.send("You are not allowed to view this page");
  }

  // security audit purpose
  if (req.url.startsWith("/sensitive")) {
    console.log("Someone accessing sensitive information!");
  }
};

module.exports = isLoggedIn;
