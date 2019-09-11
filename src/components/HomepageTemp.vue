<template>
    <div class="home-page">
        <div class="banner">
            <div class="container">
                <h1 class="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>
        <div class="container page">
            <div class="row">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomepageTemp"
    }
</script>

<style scoped>

</style>