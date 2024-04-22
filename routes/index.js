const router = require("express").Router();
const userRouter = require("./users");
const articleRouter = require("./articles");
const { loginUser, createUser } = require("../controllers/users2");
const {
  validateCreateUser,
  validateLoginUser,
} = require("../middlewares/validation");
const NotFoundError = require("../utils/errors/notFound");
// const auth = require("../middlewares/auth");
// router.use(auth.handleAuthorization);

router.use("/users", userRouter);
router.use("/articles", articleRouter);

router.post("/signup", validateCreateUser, createUser);
router.post("/signin", validateLoginUser, loginUser);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;
