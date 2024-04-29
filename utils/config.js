const { JWT_SECRET = "dev-secret", NODE_ENV, CONNECTION } = process.env;

const { MONGO_DB_CONNECTION = "mongodb://127.0.0.1:27017/news_explorer_db" } =
  process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  CONNECTION,
  MONGO_DB_CONNECTION,
};
