<template>
  <div class="home">
    <HomepageTemp>
      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="getIsAuth">
              <router-link
                      class="nav-link"
                      active-class="active"
                      to="/my-feed">
                Your Feed
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                      class="nav-link"
                      exact-active-class="active"
                      to="/">
                Global Feed
              </router-link>
            </li>
            <li class="nav-item" v-if="tag">
              <router-link
                      class="nav-link"
                      active-class="active"
                      :to="tagAddress(this.tag)">
                {{this.tag}}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="article-preview" v-if="isError || isLoadingArticle">
          <p v-if="isError">Error occured, see console</p>
          <p v-if="isLoadingArticle">Loading Article...</p>
        </div>
        <div v-else>
          <div class="article-preview" v-if="articlesData.articlesCount===0">
            No articles are here... yet.
          </div>
          <ArticlePreview
                  v-for="articleData in articlesData.articles"
                  :article-data="articleData"
                  :key="articleData.slug"/>
          <Pagination :current-page='currentPage' :total-page='getPageCount' @pageChanged="changeArticleData"/>
        </div>
      </div>
      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tag</p>
          <p v-if="isLoadingTags">Loading Tags...</p>
          <div v-else class="tag-list">
            <router-link
                    v-for='tag in tagList'
                    :key='tag'
                    :to="tagAddress(tag)"
                    v-on:click.native="changeArticleDataTag(tag)"
                    class="tag-pill tag-default">
                {{tag}}
            </router-link>
          </div>
        </div>
      </div>
    </HomepageTemp>
  </div>
</template>

<script>
import HomepageTemp from "../components/HomepageTemp";
import ArticlePreview from "../components/ArticlePreview";
import Pagination from "../components/Pagination";
import store from "../store";
import {mapState, mapGetters} from 'vuex';
export default {
  name: 'home',
  store,
  components: {HomepageTemp, ArticlePreview, Pagination},
  data: function () {
    return{
      isLoadingArticle: true,
      isLoadingTags: true,
      isError: false,
      tag: '',
      limit: 10
    }
  },
  mounted() {
    this.loadWithTag();
    this.$store.dispatch("tags/getTags").then(()=>{
      this.isLoadingTags = false;
    });
  },
  beforeDestroy(){
    this.$store.dispatch('article/clearArticleList');
  },
  computed: {
    ...mapState('article', ['articlesData','currentPage']),
    ...mapState('tags', ['tagList']),
    ...mapGetters('users',['getIsAuth','getUserData']),
    getPageCount(){
      return Math.ceil(this.articlesData.articlesCount / this.limit);
    }
  },
  methods: {
    tagAddress(tag){
      return "/tag/"+tag;
    },
    changeArticleDataTag(tag=''){
      this.$store.commit("article/setCurrentPage",1);
      this.changeArticleData(tag);
    },
    changeArticleData(tag=''){
      this.isLoadingArticle = true;
      let filter = '';
      let pageFilter = '';
      let tagFilter = '';
      if(tag!==''){
        this.tag = tag;
      }
      tagFilter='&tag='+this.tag;
      let offset = (this.currentPage - 1) * this.limit;
      pageFilter = '?offset='+offset+'&limit='+this.limit;
      filter= pageFilter+tagFilter;
      if(tag==='!feed'){
        filter = '/feed' + pageFilter;
        this.tag = '';
      }
      this.$store.dispatch("article/getArticlesData",filter).then(()=>{
        this.isLoadingArticle = false;
      }).catch(() => {
        this.isError = true;
        this.isLoadingArticle = false;
      });
    },
    loadWithTag(){
      const path = this.$route.path;
      if(path.indexOf("tag") !== -1){
        this.tag = path.substr(5);
      } else if (path.indexOf("my-feed") !== -1){
        this.tag = '!feed';
      }
      this.changeArticleData(this.tag);
    },
  },
  watch: {
    $route(to){
      if(to.path.length < 2){
        this.tag = '';
        this.$store.commit("article/setCurrentPage",1);
        this.changeArticleData();
      } else if(to.path.indexOf('tag')>-1) {
        this.loadWithTag();
      } else {
        this.tag = '';
        this.$store.commit("article/setCurrentPage",1);
        this.changeArticleData('!feed');
      }
    }
  }
}
</script>
