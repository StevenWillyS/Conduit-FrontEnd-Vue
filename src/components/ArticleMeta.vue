<template>
    <div class="article-meta">
        <template v-if="article.author">
            <router-link :to="profileLink"><img :src="article.author.image" /></router-link>
            <div class="info">
                <router-link :to="profileLink" class="author">{{article.author.username}}</router-link>
                <span class="date">{{getFormattedDate()}}</span>
            </div>
            <router-link :to="editLink" class="btn btn-sm btn-outline-secondary" v-if="isSameUser">
                <i class="ion-edit"></i>
                &nbsp;
                Edit Article
            </router-link>
            <button class="btn btn-sm btn-outline-secondary" @click="toggleFollow" v-else>
                <i class="ion-plus-round"></i>
                &nbsp;
                {{article.author.following? 'Unfollow': 'Follow'}} {{article.author.username}}
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-danger"
                    @click="deleteArticle"
                    v-if="isSameUser">
                <i class="ion-trash-a"></i>
                &nbsp;
                Delete Article
            </button>
            <button class="btn btn-sm"
                    v-else
                    @click="toggleLike"
                    :class="{'btn-outline-primary': !article.favorited,
                             'btn-primary': article.favorited}">
                <i class="ion-heart"></i>
                &nbsp;
                Favorite Post <span class="counter">({{article.favoritesCount}})</span>
            </button>
        </template>
    </div>
</template>

<script>
    import FormattedArticleDate from "../common/date.helper";
    import {mapGetters} from "vuex";
    import router from "../router";

    export default {
        name: "ArticleMeta",
        props: {
            article: {
                required: true,
                type: Object
            }
        },
        methods: {
            getFormattedDate(){
                return FormattedArticleDate(this.article.createdAt);
            },
            deleteArticle(){
                this.$store.dispatch('article/deleteArticle', this.article.slug)
                    .then(() => {
                        router.push(this.profileLink);
                    })
                    .catch(error => {
                        alert(error);
                    })
            },
            toggleLike(){
                if (!this.getIsAuth) {
                    this.$router.push({ name: "login" });
                    return;
                }
                if(this.article.favorited){
                    this.$store.dispatch('article/unfavArticle', this.article.slug)
                        .catch(error => {
                            alert(error);
                    });
                } else {
                    this.$store.dispatch('article/favArticle', this.article.slug)
                        .catch(error => {
                            alert(error);
                    });
                }
            },
            toggleFollow(){
                if (!this.getIsAuth) {
                    this.$router.push({ name: "login" });
                    return;
                }
                if(this.article.author.following){
                    this.$store.dispatch('profile/unfollowUser', this.article.author)
                        .then(response => {
                            this.$store.dispatch('article/updateAuthor',response.data.profile);
                        }).catch(error => {
                            alert(error);
                    })
                } else {
                    this.$store.dispatch('profile/followUser', this.article.author)
                        .then(response => {
                            this.$store.dispatch('article/updateAuthor',response.data.profile);
                        }).catch(error => {
                        alert(error);
                    })
                }
            }
        },
        computed: {
            isSameUser(){
                return this.article.author.username === this.getUserData.username;
            },
            profileLink(){
                return '/profile/'+this.article.author.username;
            },
            editLink(){
                return '/editor/'+this.article.slug;
            },
            ...mapGetters('users',['getUserData','getIsAuth'])
        }
    }
</script>

<style scoped>

</style>