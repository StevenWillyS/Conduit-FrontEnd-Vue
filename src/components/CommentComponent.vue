<template>
    <div class="col-xs-12 col-md-8 offset-md-2">

        <form class="card comment-form">
            <div class="card-block">
                <textarea v-model="comment" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
                <img :src="getUserData.image" class="comment-author-img" />
                <button @click.prevent="addComment" class="btn btn-sm btn-primary">
                    Post Comment
                </button>
            </div>
        </form>
        <CommentView v-for="comment in commentList" :comment="comment" :slug="articleSlug" :username="getUserData.username" />
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import CommentView from "./CommentView";

    export default {
        name: "CommentComponent",
        components: {CommentView},
        data: function(){
          return {
              comment: ''
          }
        },
        props: {
          articleSlug: {
              required: true
          }
        },
        computed: {
          ...mapGetters('comment',['commentList']),
          ...mapGetters('users',['getUserData','getIsAuth'])
        },
        watch: {
            articleSlug: function(newVal){
                this.$store.dispatch('comment/getArticleComments', newVal);
            }
        },
        methods: {
            addComment(){
                const payload = {
                    comment: {
                        body: this.comment
                    },
                    slug: this.articleSlug
                };
                this.$store.dispatch('comment/addComment', payload);
                this.comment = '';
            }
        },
        beforeDestroy() {
            this.$store.dispatch('comment/clearComment');
        }
    }
</script>

<style scoped>

</style>