import Vue from 'vue';
import Vuex from 'vuex';

import moduleArticle from "./modules/moduleArticle";
import moduleTags from "./modules/moduleTags";
import moduleUsers from "./modules/moduleUsers";
import moduleProfile from "./modules/moduleProfile";
import moduleComment from "./modules/moduleComment";

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    article: moduleArticle,
    tags: moduleTags,
    users: moduleUsers,
    profile: moduleProfile,
    comment: moduleComment
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
})
