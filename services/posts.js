const PostsRepository = require("../repositories/posts");

class PostsService {
    postsRepository = new PostsRepository();

    createPosts = async(postId,userId, nickname, title, content, location, cafe, date, time, map, partyMember) => {
        await this.postsRepository.createPosts(
            postId,userId, nickname, title, content, location, cafe, date, time, map, partyMember
        )
        return;
    }

    findAllPosts = async() => {
        const findAllPosts = await this.postsRepository.findAllPosts();
        return findAllPosts;
    }

    findOnePost = async(postId) => {
        const findOnePosts = await this.postsRepository.findOnePost(postId);
        return findOnePosts;
    }

    updatePost = async(postId, userId, title, content, location, cafe, date, time, map, partyMember) => {
        await this.postsRepository.updatePost(postId, userId, title, content, location, cafe, date, time, map, partyMember)
        return 
    }
    
    deletePost = async(postId, userId) => {
        await this.postsRepository.deletePost(postId, userId);
        return
    }
}

module.exports = PostsService;