const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/auth-middleware");
const PostsController =require("../controllers/posts");
const postsController = new PostsController();

router.post("/",authMiddleware, postsController.createPosts);
router.get("/", postsController.findAllPosts);
router.get("/:postId", postsController.findOnePosts);
// router.put("/:postId",authMiddleware, postsController.updateProduct);
// router.delete("/:postId", authMiddleware, postsController.deleteProduct)


module.exports = router;