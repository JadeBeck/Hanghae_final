const PostsService = require("../services/posts")

class PostsController {
    postsService = new PostsService();

    createPosts = async (req, res, next) => {
        const { userId, nickname } = res.locals.user;
        const { postId, title, content, location, cafe, date, time, map, partyMember } =req.body;
        await this.postsService.createPosts( postId,userId, nickname, title, content, location, cafe, date, time, map, partyMember );
        res.json({message:"게시물 생성 완료"})
    }

    findAllPosts = async (req, res, next) => {
        const findAllPosts = await this.postsService.findAllPosts();
        res.json({ data : findAllPosts })
    }

    findOnePosts = async (req, res, next) => {
        const {postId} = req.params;
        const findOnePosts = await this.postsService.findOnePosts(postId);
        res.json({ data : findOnePosts })
    }
}

module.exports = PostsController;