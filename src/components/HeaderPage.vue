<template>
    <nav class="navbar navbar-light">
        <div class="container">
            <router-link class="navbar-brand" to="/">conduit</router-link>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <router-link
                            class="nav-link"
                            exact-active-class="active"
                            to="/">
                        Home
                    </router-link>
                </li>
                <li class="nav-item" v-if="getIsAuth">
                    <router-link class="nav-link" active-class="active" to="/editor">
                        <i class="ion-compose"></i>New Article
                    </router-link>
                </li>
                <li class="nav-item" v-if="getIsAuth">
                    <router-link class="nav-link" active-class="active" to="/setting">
                        <i class="ion-gear-a"></i>&nbsp;Setting
                    </router-link>
                </li>
                <li class="nav-item" v-if="getIsAuth">
                    <router-link class="nav-link"
                                 :to="profileLink()">
                        {{getUserData.username}}
                    </router-link>
                </li>
                <li class="nav-item" v-if="!getIsAuth">
                    <router-link class="nav-link" active-class="active" to="/register">
                        <i class="ion-compose"></i>Sign up
                    </router-link>
                </li>
                <li class="nav-item" v-if="!getIsAuth">
                    <router-link class="nav-link" active-class="active" to="/login">
                        <i class="ion-compose"></i>Sign in
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import router from "../router";
    import {mapGetters} from "vuex";

    export default {
        name: "HeaderPage",
        computed: {
            ...mapGetters('users',['getIsAuth','getUserData'])
        },
        mounted() {
            if(this.getIsAuth){
                this.$store.dispatch('users/AuthCurrentUser').then(response => {
                    this.$store.dispatch('users/loginWith',response.data);
                }).catch(() => {
                    this.$store.dispatch('users/logout').then(() => {
                        router.push('/');
                    });
                })
            }
        },
        methods: {
            profileLink(){
                return '/profile/'+this.getUserData.username;
            }
        }

    }
</script>
