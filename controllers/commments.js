const CommentsService = require('../services/comments');

class CommentsController {
    commentsService = new CommentsService();
    //전체 댓글 목록 보기
    getComments = async (req, res, next) => {
        const {postId} = req.params;

        try {
            const getAllComments = await this.commentsService.findAllComments(postId);
            res.status(200).json({comments: getAllComments});
        } catch (err) {
            const errormessage = `${req.method} ${req.originalUrl} : ${err.message}`;
            console.log(errormessage);
            res.status(400).json({errormessage});
        }
    };

//신규 댓글!!
    createComment = async (req, res, next) => {
        try {
            const {userId, nickname} = res.locals.user;
            const {postId} = req.params;
            const {comment} = req.body;

            if (!comment) {
                res.status(412).json({errorMessage: '댓글 내용을 입력해주세요😌'});
                return;
            }
            const createComment = await this.commentsService.createComment(postId, userId, nickname, comment);
            res.status(201).json({message: '댓글을 등록했어요😚', createComment});
        } catch (err) {
            if (err.code === -1) {
                res.status(401).send({errorMessage: '댓글 등록 fail,,,'});
            }
            const errormessage = `${req.method} ${req.originalUrl} : ${err.message}`;
            console.log(errormessage);
            res.status(400).json({errormessage});
        }
    };

    //댓글 수정
    updateComment = async (req, res) => {
        try {
            const {userId} = res.locals.user;
            const {comment} = req.body;
            const {commentId} = req.params;

            if (comment === "") {
                res.status(412).json({errorMessage: "댓글 내용을 입력해주세요!"});
            }

            //본인의 댓글 맞는지 확인해보기
            const whoWroteThisComment = await this.commentsService.whoMadeThisComment(commentId);
            if (userId !== whoWroteThisComment.dataValues.userId) {
                return res.status(400).json({errorMessage: "댓글 작성자 본인만 수정할 수 있어요~!"});
            }

            const updateComment = await this.commentsService.updateComment(userId, commentId, comment);
            res.status(200).json(updateComment);
        } catch (err) {
            if (err.code === -1) {
                res.status(401).send({errorMessage: '댓글 수정 fail,,,'});
            }
            const errormessage = `${req.method} ${req.originalUrl} : ${err.message}`;
            console.log(errormessage);
            res.status(400).json({errormessage});
        }
    };

    //댓글 삭제
    deleteComment = async (req, res) => {
        try {
            const {userId} = res.locals.user;
            const {commentId} = req.params;

            const deleteComment = await this.commentsService.deleteComment(userId, commentId);
            if (deleteComment === 0) {
                return res.status(400).json({errorMessage: "댓글 작성자 본인만 삭제할 수 있어요~!"});
            }
            res.status(200).json({message: "댓글 삭제 완료!!"})
        } catch (err) {
            if (err.code === -1) {
                const errormessage = `${req.method} ${req.originalUrl} : ${err.message}`;
                console.log(errormessage);
                res.status(400).json({errormessage});
            }
        }
    };
}

module.exports = CommentsController;