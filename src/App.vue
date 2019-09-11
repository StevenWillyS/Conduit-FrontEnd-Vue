<template>
  <div id="app">
    <HeaderPage />
    <router-view/>
    <FooterPage />
  </div>
</template>

<style>
  @import "https://demo.productionready.io/main.css";
  @import "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css";
  @import "https://fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic";
</style>

<script>
    import HeaderPage from "./components/HeaderPage";
    import FooterPage from "./components/FooterPage";
    export default {
        components: {FooterPage,HeaderPage}
    }

</script>
