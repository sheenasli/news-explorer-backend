const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
  expiresIn: "7d",
});

// const { JWT_SECRET = "dev-secret", NODE_ENV } = process.env;

// module.exports = {
//   JWT_SECRET,
//   NODE_ENV,
// };
