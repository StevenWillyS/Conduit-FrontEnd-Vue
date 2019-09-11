import ApiService from "../common/api.service";

const moduleComment = {
    namespaced: true,
    state : {
        comment: {},
        commentList: []
    },
    mutations: {
        setComment(state, commentData){
            state.comment = commentData;
        },
        setCommentList(state, commentListData){
            state.commentList = commentListData;
        },
        removeComment(state, commentId){
            state.commentList = state.commentList.filter(comment => comment.id !== commentId );
        },
        addComment(state, comment){
            state.commentList = [comment].concat(state.commentList);
        },
        clearComment(state){
            state.commentList = [];
        }
    },
    actions: {
        getArticleComments(context, slug){
            return new Promise((resolve, reject) => {
                const link = 'articles/'+ slug + '/comments';
                ApiService.get(link).then(response => {
                    context.commit('setCommentList',response.data.comments);
                    resolve(response);
                }).catch(reason => {
                    reject(reason);
                })
            })
        },
        deleteComment(context, payload){
            return new Promise((resolve, reject) => {
                const link = 'articles/'+payload.slug+'/comments/'+payload.commentId;
                ApiService.delete(link).then(response => {
                    context.commit('removeComment',payload.commentId);
                    resolve(response);
                }).catch(reason => {
                    reject(reason);
                })
            })
        },
        addComment(context, payload){
            // console.log(payload);
            return new Promise((resolve, reject) => {
                const link = 'articles/'+payload.slug+'/comments';
                ApiService.post(link,payload.comment).then(response => {
                    console.log(response);
                    context.commit('addComment',response.data.comment);
                    resolve(response);
                }).catch(reason => {
                    reject(reason);
                })
            })
        },
        clearComment(context){
            context.commit('clearComment');
        }
    },
    getters: {
        comment(state){
            return state.comment;
        },
        commentList(state){
            return state.commentList;
        }
    }
};

export default moduleComment;