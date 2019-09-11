<template>
    <ul class="pagination">
        <li v-for="page in parseInt(totalPage)" :key="page" :class="pageClass(page)" @click="changePage(page)">
            <a class="page-link" href="#">{{page}}</a>
        </li>
    </ul>
</template>

<script>
    import store from "../store";
    export default {
        name: "Pagination",
        store,
        props:{
            currentPage: {
                type: Number,
                required: true
            },
            totalPage: {
                type: Number,
                required: true
            }
        },
        methods: {
            pageClass(page){
                if(page===parseInt(this.currentPage)){
                    return 'page-item active'
                } else {
                    return 'page-item'
                }
            },
            changePage(page){
                if(this.currentPage===page) return;
                this.$store.commit("article/setCurrentPage",page);
                this.$emit('pageChanged');
            }
        }
    }
</script>