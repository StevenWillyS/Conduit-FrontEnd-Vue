<template>
  <div class="about">
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div class="container page">
        <div class="row">
          <div class="col-md-12" style="text-align: center">
            <h1>
              <p>BitCoin</p>
              <p v-if="isLoading">Loading...</p>
              <div v-else>
                <span>{{bitCoinData.description}}: </span>
                <span v-html="bitCoinData.symbol"></span>{{bitCoinData.rate_float.toFixed(2)}}
                <hr>
                Rp{{Number(bitCoinData.rate_float*14209).toLocaleString()}}
              </div>
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import store from '../store';

  export default {
    name: "CAbout",
    store,
    data: function () {
      return{
         isLoading: true
      };
    },
    computed: mapState([
            'bitCoinData'
    ]),
    mounted() {
      this.$store.dispatch('getBCData').then(()=>{
        this.isLoading = false;
      });
    },
  }
</script>
