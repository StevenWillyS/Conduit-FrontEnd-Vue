<template>
    <div class="article-page">

        <div class="banner">
            <div class="container">

                <h1>{{currentArticle.title}}</h1>

                <ArticleMeta :article="currentArticle" />

            </div>
        </div>

        <div class="container page">

            <div class="row article-content">
                <div class="col-md-12">
                    <div>{{currentArticle.body}}</div><br>
                    <ul class="tag-list">
                        <li v-for="tag in currentArticle.tagList"
                            class="tag-default tag-pill tag-outline"
                            :key="tag">
                            {{tag}}
                        </li>
                    </ul>
                </div>

            </div>

            <hr />

            <div class="article-actions">
                <ArticleMeta :article="currentArticle" />
            </div>

            <div class="row">
                <CommentComponent :articleSlug="currentArticle.slug" />
            </div>

        </div>

    </div>
</template>

<script>
    import ArticleMeta from "../components/ArticleMeta";
    import CommentComponent from "../components/CommentComponent";
    import {mapGetters} from 'vuex';

    export default {
        name: "ArticleDetail",
        components: {CommentComponent, ArticleMeta},
        mounted() {
            this.$store.dispatch('article/clearArticleList');
            let slug = '/'+ this.$route.params.slug;
            this.$store.dispatch('article/getSingleArticle',slug)
                .then(() => {

                })
                .catch(error => {
                    alert(error);
                })
        },
        computed: {
            ...mapGetters('article',['currentArticle'])
        },
    }
</script>

<style scoped>

</style>