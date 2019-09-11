<template>
    <div class="article-preview">
        <div class="article-meta">
            <router-link :to="profileLink"><img :src="articleData.author.image"/></router-link>
            <div class="info">
                <router-link :to="profileLink" class="author">{{articleData.author.username}}</router-link>
                <span class="date">{{getArticleDate}}</span>
            </div>
            <button
                class="btn btn-sm pull-xs-right"
                @click="toggleLike"
                :class="{
                  'btn-outline-primary': !articleData.favorited,
                  'btn-primary': articleData.favorited}">
                <i class="ion-heart"></i> {{articleData.favoritesCount}}
            </button>
        </div>
        <router-link :to="getArticleLink" class="preview-link">
            <h1>{{articleData.title}}</h1>
            <p>{{articleData.description}}</p>
            <span>Read more...</span>
            <ul class="tag-list">
                <li v-for="tag in articleData.tagList"
                    class="tag-default tag-pill tag-outline"
                    :key="tag">
                    {{tag}}
                </li>
            </ul>
        </router-link>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import FormattedArticleDate from "../common/date.helper";

    export default {
        name: "ArticlePreview",
        props: ['articleData'],
        computed: {
            getArticleDate(){
                return FormattedArticleDate(this.articleData.createdAt);
            },
            getArticleLink(){
                return '/article/'+this.articleData.slug;
            },
            profileLink(){
                return '/profile/'+this.articleData.author.username;
            },
            ...mapGetters('users',['getIsAuth','getUserData']),
        },
        methods: {
            toggleLike(){
                if (!this.getIsAuth) {
                    this.$router.push({ name: "login" });
                    return;
                }
                if(this.articleData.favorited){
                    this.$store.dispatch('article/unfavArticle', this.articleData.slug);
                } else {
                    this.$store.dispatch('article/favArticle', this.articleData.slug);
                }
            }
        }
    }
</script>