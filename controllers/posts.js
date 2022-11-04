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

    findOnePost = async (req, res, next) => {
        const {postId} = req.params;
        const findOnePosts = await this.postsService.findOnePost(postId);
        res.json({ data : findOnePosts })
    }

    updatePost = async (req, res, next) => {
        const { postId } = req.params;
        const { userId } = res.locals.user;
        const { title, content, location, cafe, date, time, map, partyMember } = req.body
        await this.postsService.updatePost(postId, userId, title, content, location, cafe, date, time, map, partyMember);
        res.json({ message : "게시물 수정을 완료하였습니다."})
    }

    deletePost = async(req, res, next) => {
        const { postId } = req.params;
        const { userId } = res.locals.user;
        await this.postsService.deletePost(postId, userId);
        res.json({message:"게시물 삭제를 완료하였습니다."})
    }
}

module.exports = PostsController;