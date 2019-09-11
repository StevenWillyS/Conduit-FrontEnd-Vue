<template>
    <div class="profile-page">

        <div class="user-info">
            <div class="container">
                <div class="row">

                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img :src="getProfile.image" class="user-img" />
                        <h4>{{getProfile.username}}</h4>
                        <p>
                            {{getProfile.bio}}
                        </p>
                        <div v-if="isCurrentUser()">
                            <router-link class="btn btn-sm btn-outline-secondary action-btn" to="/setting">
                                <i class="ion-gear-a"></i> Edit Profile Settings
                            </router-link>
                        </div>
                        <div v-else>
                            <button @click="toggleFollow" class="btn btn-sm btn-outline-secondary action-btn">
                                <i class="ion-plus-round"></i>
                                &nbsp;
                                {{getProfile.following? 'Unfollow': 'Follow'}} {{getProfile.username}}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">

                <div class="col-xs-12 col-md-10 offset-md-1">
                    <div class="articles-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <router-link class="nav-link" exact-active-class="active" :to="getFavLink(false)">My Articles</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" active-class="active" :to='getFavLink()'>Favorited Articles</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="article-preview" v-if="noArticle">
                        <p>No articles are here... yet.</p>
                    </div>
                    <ArticlePreview
                        v-for="articleData in articlesData.articles"
                        :article-data="articleData"
                        :key="articleData.slug"/>

                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import ArticlePreview from "../components/ArticlePreview";

    export default {
        name: "Profile",
        components: {ArticlePreview},
        data: function(){
          return{
              noArticle: false
          }
        },
        computed: {
            ...mapGetters('users',['getUserData','getIsAuth']),
            ...mapGetters('profile',['getProfile']),
            ...mapGetters('article', ['articlesData','currentPage'])
        },
        mounted() {
            this.$store.dispatch('profile/fetchProfile', this.$route.params).then(()=>{
                this.getArticlesData(false);
            });
        },
        methods: {
            isCurrentUser(){
                if(this.getUserData.username === this.getProfile.username){
                    return true;
                }
                return false;
            },
            getArticlesData(isFavorite){
                let filter = '?author='+this.getProfile.username;
                if(isFavorite){
                    filter ='?favorited='+this.getProfile.username;
                }
                this.$store.dispatch('article/getArticlesData',filter).then(()=>{
                    if(this.articlesData.articlesCount === 0){
                        this.noArticle = true;
                    } else {
                        this.noArticle = false;
                    }
                })
            },
            getFavLink(fav=true){
                if(!fav){
                    return '/profile/' + this.getProfile.username;
                }
                return '/profile/' + this.getProfile.username+'/favorites';
            },
            toggleFollow(){
                if (!this.getIsAuth) {
                    this.$router.push({ name: "login" });
                    return;
                }
                if(this.getProfile.following){
                    this.$store.dispatch('profile/unfollowUser', this.getProfile)
                        .then(response => {
                            console.log(response);
                            // this.$store.dispatch('article/updateAuthor',response.getProfile);
                        }).catch(error => {
                        alert(error);
                    })
                } else {
                    this.$store.dispatch('profile/followUser', this.getProfile)
                        .then(response => {
                            console.log(response);
                            // this.$store.dispatch('article/updateAuthor',response.data.profile);
                        }).catch(error => {
                        alert(error);
                    })
                }
            }
        },
        watch: {
            $route(to){
                let isFavorite = false;
                if(to.name === 'favorites'){
                    isFavorite = true;
                }
                this.getArticlesData(isFavorite);
            }
        }
    }
</script>

<style scoped>

</style>