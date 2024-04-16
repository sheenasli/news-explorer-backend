const User = require("../models/user");
const InvalidError = require("../utils/errors/InvalidError");
const NotFoundError = require("../utils/errors/NotFound");
const ConflictError = require("../utils/errors/ConflictError");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("No user with matching ID found");
      }
      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!email) {
        // throw new Error("Enter a valid email");
        return next(new InvalidError("Enter a valid email"));
      }
      if (user) {
        // throw new Error("Email is already in use");
        return next(new ConflictError("Email is already in use"));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      const userPayload = user.toObject();
      delete userPayload.password;
      res.status(201).send({
        data: userPayload,
      });
    })

    .catch((err) => {
      console.error(err);
      if (err.name === `ValidationError`) {
        next(new InvalidError("Invalid Request Error on createUser"));
      } else if (err.message === "Enter a valid email") {
        next(new InvalidError("Invalid Error on createUser"));
      } else if (err.message === "Email is already in use") {
        next(new ConflictError(`Email ${email} already registered`));
      } else {
        next(err);
      }
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new InvalidError("Invalid Credentials"));
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Invalid Credentials"));
      } else {
        next(err);
      }
    });
};

module.exports = { getCurrentUser, createUser, loginUser };
