<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-10 offset-md-1 col-xs-12">
                    <ErrorMsg :error="error" />
                    <form @submit.prevent="publishArticle">
                        <fieldset>
                            <fieldset class="form-group">
                                <input type="text" v-model='currentArticle.title' class="form-control form-control-lg" placeholder="Article Title">
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" v-model="currentArticle.description" class="form-control" placeholder="What's this article about?">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea class="form-control" v-model="currentArticle.body" rows="8" placeholder="Write your article (in markdown)"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" v-model="curTag" @keydown.enter.prevent="addTag" class="form-control" placeholder="Enter tags">
                                <div class="tag-list">
                                    <span
                                       class="tag-default tag-pill"
                                       v-for="tag in currentArticle.tagList"
                                       :key="tag">
                                        <i class="ion-close-round" @click="removeTag(tag)"></i>
                                        {{tag}}
                                    </span>
                                </div>
                            </fieldset>
                            <button class="btn btn-lg pull-xs-right btn-primary">
                                Publish Article
                            </button>
                        </fieldset>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import ErrorMsg from "../components/ErrorMsg";
    import router from "../router";

    export default {
        name: "Editor",
        components: {ErrorMsg},
        data: function(){
          return{
              curTag: '',
              error: []
          }
        },
        computed: {
            ...mapGetters('article',['currentArticle']),
            ...mapGetters('users',['getUserData'])
        },
        methods: {
            removeTag(tag){
                this.$store.dispatch('article/removeTag',tag);
            },
            addTag(){
                this.$store.dispatch('article/addTag',this.curTag);
                this.curTag = '';
            },
            publishArticle(){
                if(this.$route.name === 'slug'){
                    this.$store.dispatch('article/updateArticle')
                        .then(response => {
                            router.push('/article/'+response.data.article.slug);
                        })
                        .catch(reason => {
                            this.error =  reason.errors;
                        })
                } else {
                    this.$store.dispatch('article/createArticle')
                        .then(response => {
                            router.push('/article/'+response.data.article.slug);
                        })
                        .catch(reason => {
                            this.error =  reason.errors;
                        })
                }
            },
        },
        mounted() {
            if(this.$route.name === 'slug'){
                let slug = '/'+ this.$route.params.slug;
                this.$store.dispatch('article/getSingleArticle',slug)
                    .then(response => {
                        this.article = response.article;
                    })
                    .catch(error => {
                        alert(error);
                    })
            } else {
                this.$store.dispatch('article/clearCurrent');
            }
        }
    }
</script>

<style scoped>

</style>