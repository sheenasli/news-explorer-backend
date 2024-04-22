const Article = require("../models/article");
const InvalidError = require("../utils/errors/InvalidError");
const NotFoundError = require("../utils/errors/NotFound");
const ForbiddenError = require("../utils/errors/ForbiddenError");

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send(articles))
    .catch((next) => {});
};

const addArticle = (req, res, next) => {
  const owner = req.user._id;
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((article) => {
      console.log(article);
      res.send({ data: article });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === `ValidationError`) {
        next(new InvalidError("Invalid Credentials"));
      }
      next(err);
    });
};

const removeArticle = (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  Article.findById(articleId)
    .select("+owner")
    .orFail(() => new NotFoundError("Article ID cannot be found"))
    .then((article) => {
      if (userId !== article.owner.toString()) {
        throw new ForbiddenError("You are not the owner of this article");
      }
      return Article.findByIdAndRemove(articleId)
        .orFail(() => new NotFoundError("Article ID cannot be found"))
        .then((removedArticle) => res.send(removedArticle))
        .catch(next);
    })
    .catch(next);
};

module.exports = { getArticles, addArticle, removeArticle };
