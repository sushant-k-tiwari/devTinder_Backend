const adminAuth = (req, res, next) => {
  console.log("Admin is getting checked!!");
  const token = "abc";
  const isAdminAuthorized = token === "abc";
  if (!isAdminAuthorized) {
    return res.status(401).send("Unauthorized Access Denied!");
  } else {
    next();
  }
};

module.exports = { adminAuth };
