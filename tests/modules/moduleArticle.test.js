import article from '@/modules/moduleArticle';
import {ArticleServices} from "@/common/api.service";
test('mutations', () => {
    const initialArticle = {
        title: "",
        description: "",
        body: "",
        tagList: []
    };
    const author = {
        username: 'test'
    };
    const state = {
        articlesData: [],
        currentArticle: initialArticle,
        currentPage: 1
    };

    const articleData = {
        article: {
            title: 'A',
            description: 'B',
            body: 'C',
            tagList: ['D','E']
        }
    };

    const fullData = {
      article: {
          title: 'Z',
          description: 'Y',
          body: 'X',
          tagList: ['W','V'],
          slug: 'aa',
          favorited: false,
          favoritesCount: 0
      }
    };

    const updatedData = {
        article: {
            title: 'Z',
            description: 'Y',
            body: 'X',
            tagList: ['W','V'],
            slug: 'aa',
            favorited: true,
            favoritesCount: 1
        }
    };
    const multipleData = {
        articles: [
            articleData.article,
            fullData.article
        ]
    };
    const updatedMultipleData = {
        articles: [
            articleData.article,
            fullData.article
        ]
    };
    article.mutations.setCurrentPage(state, 5);
    expect(state.currentPage).toEqual(5);

    article.mutations.updateArticleList(state, updatedData.article);
    expect(state.currentArticle).toEqual(updatedData.article);

    article.mutations.setArticleData(state, articleData);
    expect(state.currentArticle).toEqual(articleData.article);

    article.mutations.setArticlesData(state, multipleData);
    expect(state.articlesData).toEqual(multipleData);

    article.mutations.addTag(state, 'F');
    expect(state.currentArticle.tagList).toEqual(['D','E','F']);

    article.mutations.removeTag(state, 'F');
    expect(state.currentArticle.tagList).toEqual(['D','E']);

    article.mutations.resetArticle(state);
    expect(state.currentArticle).toEqual(initialArticle);

    article.mutations.updateArticleList(state, updatedData.article);
    expect(state.articlesData).toEqual(updatedMultipleData);

    article.mutations.updateAuthor(state, author);
    expect(state.currentArticle.author).toEqual(author);

});

test('getters', () => {
    const state = {
        articlesData: [],
        currentArticle: {
            title: "",
            description: "",
            body: "",
            tagList: []
        },
        currentPage: 1
    };
   expect(article.getters.articlesData(state)).toEqual(state.articlesData);

   expect(article.getters.currentPage(state)).toEqual(1);

   expect(article.getters.currentArticle(state)).toEqual(state.currentArticle);
});

// test('action getArticlesData', ()=>{
//
// });

test('action removeTag', ()=>{
    const commit = jest.fn();
    const tag = 'test';
    article.actions.removeTag({commit}, tag);
    expect(commit).toHaveBeenCalledWith('removeTag',tag);
});

test('action addTag', ()=>{
    const commit = jest.fn();
    const tag = 'test';
    article.actions.addTag({commit}, tag);
    expect(commit).toHaveBeenCalledWith('addTag',tag);
});

test('action clearCurrent', ()=>{
   const commit = jest.fn();
   article.actions.clearCurrent({commit});
   expect(commit).toHaveBeenCalledWith('resetArticle');
});

test('action clearArticleList', ()=>{
   const commit = jest.fn();
   article.actions.clearArticleList({commit});
   expect(commit).toHaveBeenCalledWith('setArticlesData', []);
});

test('action updateAuthor', ()=>{
   const commit = jest.fn();
   const data = 'a';
   article.actions.updateAuthor({commit}, data);
   expect(commit).toHaveBeenCalledWith('updateAuthor', data);
});