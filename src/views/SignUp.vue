<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign up</h1>
                    <p class="text-xs-center">
                        <router-link to="/login">Have an account?</router-link>
                    </p>

                    <ErrorMsg :error="error" />

                    <form v-on:submit.prevent="registerUser">
                        <fieldset class="form-group">
                            <input
                                    class="form-control form-control-lg"
                                    type="text"
                                    v-model="username"
                                    placeholder="Your Name">
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                    class="form-control form-control-lg"
                                    type="text"
                                    v-model="email"
                                    placeholder="Email">
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                    class="form-control form-control-lg"
                                    type="password"
                                    v-model="password"
                                    placeholder="Password">
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            Sign up
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import store from "../store";
    import router from "../router";
    import ErrorMsg from "../components/ErrorMsg";
    export default {
        name: "SignUp",
        components: {ErrorMsg},
        store,
        data: function () {
            return{
                username: '',
                email: '',
                password: '',
                error: []
            }
        },
        methods: {
            registerUser(){
                let newData = {
                    user: {
                        username: this.username,
                        email: this.email,
                        password: this.password
                    }
                }
                this.$store.dispatch('users/registerUser',newData)
                    .then(response => {
                        this.$store.dispatch('users/loginWith',response.data);
                        router.push('/');
                    }).catch(reason => {
                        this.error = reason.errors;
                });
            }
        }
    }
</script>

<style scoped>

</style>