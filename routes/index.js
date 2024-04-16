const router = require("express").Router();
const userRouter = require("./users");
const articleRouter = require("./articles");
const { loginUser, createUser } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/articles", articleRouter);

router.post("/signup", createUser);
router.post("signin", loginUser);

module.exports = router;
