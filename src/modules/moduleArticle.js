import ApiService, {ArticleServices} from "../common/api.service";
const initialArticle = {
    title: "",
    description: "",
    body: "",
    tagList: []
};
const moduleArticle = {
    namespaced: true,
    state: {
        articlesData: [],
        currentArticle: {
            title: "",
            description: "",
            body: "",
            tagList: []
        },
        currentPage: 1
    },
    mutations: {
        setArticlesData(state, data){
            state.articlesData = data;
        },
        setArticleData(state, data){
            state.currentArticle = data.article;
        },
        setCurrentPage(state,data){
            state.currentPage = data;
        },
        addTag(state, tag){
            state.currentArticle.tagList = state.currentArticle.tagList.concat([tag]);
        },
        removeTag(state, tag){
            state.currentArticle.tagList = state.currentArticle.tagList.filter(tags => tags !== tag);
        },
        resetArticle(state){
            state.currentArticle = initialArticle;
        },
        updateArticleList(state, data){
            if(state.articlesData.articles){
                state.articlesData.articles = state.articlesData.articles.map(article => {
                    if(article.slug !== data.slug){
                        return article;
                    }
                    article.favorited = data.favorited;
                    article.favoritesCount = data.favoritesCount;
                    return article;
                })
            } else {
                state.currentArticle = data;
            }
        },
        updateAuthor(state, data){
            state.currentArticle.author = data;
        }
    },
    actions: {
        getArticlesData({commit}, filter=''){
            return new Promise((resolve,reject) =>{
                ArticleServices.get(filter).then(response =>{
                    commit('setArticlesData',response.data);
                    resolve();
                }).catch(error =>{
                    reject(error);
                })
            })
        },
        getSingleArticle(context, slug){
          return new Promise((resolve, reject) => {
              ArticleServices.get(slug).then(response => {
                  context.commit('setArticleData',response.data);
                  resolve(response.data);
              }).catch(error => {
                  reject(error);
              })
          })
        },
        createArticle(context){
            return new Promise((resolve,reject) => {
                let payload = {
                    article: context.state.currentArticle
                };
                ArticleServices.post(payload).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error.data);
                })
            })
        },
        updateArticle(context){
            return new Promise((resolve,reject) => {
                let payload = {
                    article: context.state.currentArticle
                };
                ArticleServices.put(payload.article.slug, payload).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error.data);
                })
            })
        },
        deleteArticle(context, slug){
            return new Promise((resolve, reject) => {
                ApiService.delete('articles/'+slug).then(response => {
                    resolve(response);
                }).catch(reason => {
                    reject(reason);
                })
            })
        },
        removeTag({commit}, tag){
            commit('removeTag',tag);
        },
        addTag({commit}, tag){
            commit('addTag', tag);
        },
        clearCurrent({commit}){
            commit('resetArticle');
        },
        clearArticleList({commit}){
            commit('setArticlesData', []);
        },
        updateAuthor({commit},data){
            commit('updateAuthor',data);
        },
        favArticle(context,slug){
            return new Promise((resolve,reject) =>{
                ArticleServices.favArticle(slug).then(response =>{
                    context.commit('updateArticleList', response.data.article);
                    resolve(response);
                }).catch(error =>{
                    reject(error);
                })
            })
        },
        unfavArticle(context,slug){
            return new Promise((resolve,reject) =>{
                ArticleServices.unfavArticle(slug).then(response =>{
                    context.commit('updateArticleList', response.data.article);
                    resolve(response);
                }).catch(error =>{
                    reject(error);
                })
            })
        },
    },
    getters: {
        articlesData(state){
            return state.articlesData;
        },
        currentPage(state){
            return state.currentPage;
        },
        currentArticle(state){
            return state.currentArticle;
        }
    }
}

export default moduleArticle;