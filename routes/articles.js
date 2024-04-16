const router = require("express").Router();
const {
  getArticles,
  addArticle,
  removeArticle,
} = require("../controllers/articles");

router.get("/", getArticles);
router.post("/", addArticle);
router.delete("/articleId", removeArticle);

module.exports = router;
