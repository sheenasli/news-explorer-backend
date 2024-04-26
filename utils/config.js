const { JWT_SECRET = "dev-secret", NODE_ENV, CONNECTION } = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  CONNECTION,
};
