const { Posts } = require("../models");

class PostsRepository {
    
    createPosts = async( postId, nickname, title, content, location, cafe, date, time, map, partyMember ) => {
        await Posts.create({ postId, nickname, title, content, location, cafe, date, time, map, partyMember });
        return;
    };

    findAllPosts = async() => {
        const findAllPosts = await Posts.findAll();
        return findAllPosts;
    }
    
}

module.exports = PostsRepository;