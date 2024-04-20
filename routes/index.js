const router = require("express").Router();
const userRouter = require("./users");
const articleRouter = require("./articles");
const { loginUser, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signup", createUser);
router.post("/signin", loginUser);

router.use(auth.handleAuthorization);

router.use("/users", userRouter);
router.use("/articles", articleRouter);

module.exports = router;
