const express = require("express");
const router = express.Router();

const usersRouter = require("./users.router");
const postsRouter = require("./posts.router");

router.use("/users", usersRouter);
router.use("/posts", postsRouter)

module.exports = router;