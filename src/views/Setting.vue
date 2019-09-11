<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>
                    <ul class="error-messages">
                        <li v-for="(errorMsg, errorHeader) in error" :key="errorHeader">{{errorHeader}} {{errorMsg[0]}}</li>
                    </ul>
                    <form v-on:submit.prevent="updateUser">
                        <fieldset>
                            <fieldset class="form-group">
                                <input class="form-control"
                                       type="text"
                                       v-model="getUserData.image" placeholder="URL of profile picture">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg"
                                       v-model="getUserData.username" type="text" placeholder="Your Name">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea class="form-control form-control-lg"
                                          v-model="getUserData.bio" rows="8" placeholder="Short bio about you"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg"
                                       v-model="getUserData.email" type="text" placeholder="Email">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg"
                                       v-model="password" type="password" placeholder="Password">
                            </fieldset>
                            <button class="btn btn-lg btn-primary pull-xs-right">
                                Update Settings
                            </button>
                        </fieldset>
                    </form>
                    <hr />
                    <button @click="logout" class="btn btn-outline-danger">
                        Or click here to logout.
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import router from "../router";

    export default {
        name: "Setting",
        data: function(){
          return{
              password: '',
              error: []
          }
        },
        computed:{
            ...mapGetters('users',['getUserData'])
        },
        methods: {
            logout(){
                this.$store.dispatch('users/logout').then(() => {
                    router.push('/');
                });
            },
            updateUser(){
                let data = {
                    user: {
                        username: this.getUserData.username,
                        email: this.getUserData.email,
                        bio: this.getUserData.bio,
                        image: this.getUserData.image,
                    }
                }
                if(this.password){
                    data.user.password = this.password;
                }
                this.$store.dispatch('users/updateUserData', data)
                    .then(response => {
                        this.$store.dispatch('users/loginWith',response.data);
                        router.push('/');
                    }).catch(reason => {
                        this.error = reason.errors;
                })
            }
        }
    }
</script>

<style scoped>

</style>