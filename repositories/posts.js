const { Posts } = require("../models");

class PostsRepository {
    
    createPosts = async( postId, userId, nickname, title, content, location, cafe, date, time, map, partyMember ) => {
        await Posts.create({ postId,userId, nickname, title, content, location, cafe, date, time, map, partyMember });
        return;
    };

    findAllPosts = async() => {
        const findAllPosts = await Posts.findAll();
        return findAllPosts;
    }
    
    findOnePosts = async(postId) => {
        const findOnePosts = await Posts.findOne({where:{postId}})
        return findOnePosts;
    }
}

module.exports = PostsRepository;