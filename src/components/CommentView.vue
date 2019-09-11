<template>
    <div class="card">
        <div class="card-block">
            <p class="card-text">{{comment.body}}</p>
        </div>
        <div class="card-footer">
            <a href="" class="comment-author">
                <img :src="comment.author.image" class="comment-author-img" />
            </a>
            &nbsp;
            <a href="" class="comment-author">{{comment.author.username}}</a>
            <span class="date-posted">{{getDate(comment.createdAt)}}</span>
            <span class="mod-options" v-if="isSameUser()">
              <i @click="deleteComment" class="ion-trash-a" ></i>
            </span>
        </div>
    </div>

<!--    <div class="card">-->
<!--        <div class="card-block">-->
<!--            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>-->
<!--        </div>-->
<!--        <div class="card-footer">-->
<!--            <a href="" class="comment-author">-->
<!--                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />-->
<!--            </a>-->
<!--            &nbsp;-->
<!--            <a href="" class="comment-author">Jacob Schmidt</a>-->
<!--            <span class="date-posted">Dec 29th</span>-->
<!--            <span class="mod-options">-->
<!--              <i class="ion-edit"></i>-->
<!--              <i class="ion-trash-a"></i>-->
<!--            </span>-->
<!--        </div>-->
<!--    </div>-->
</template>

<script>
    import FormattedArticleDate from "../common/date.helper";
    export default {
        name: "CommentView",
        props: {
            comment:{
                required: true
            },
            slug: {
                required: true
            },
            username: {
                required: true
            }
        },
        methods: {
            getDate(rawDate){
                return FormattedArticleDate(rawDate);
            },
            isSameUser(){
                return this.comment.author.username === this.username;
            },
            deleteComment(){
                const payload = {
                    commentId: this.comment.id,
                    slug: this.slug
                }
                this.$store.dispatch('comment/deleteComment', payload );
            }
        }
    }
</script>

<style scoped>

</style>