const PostsRepository = require("../repositories/posts");

class PostsService {
    postsRepository = new PostsRepository();

    createPosts = async(postId, userId, nickname, title, content, location, cafe, date, time, map, partyMember) => {
        await this.postsRepository.createPosts(
            postId, userId, nickname, title, content, location, cafe, date, time, map, partyMember
        )
        return;
    }

    findAllPosts = async() => {
        const findAllPosts = await this.postsRepository.findAllPosts();
        return findAllPosts;
    }
}

module.exports = PostsService;