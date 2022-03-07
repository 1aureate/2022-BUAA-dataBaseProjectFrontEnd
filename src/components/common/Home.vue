<template>
  <div class="homeWrap">
      <el-container style="height: 100%; border: 1px solid #eee" class="container" direction="vertical">
        <vHeader></vHeader>
        <el-container class="container">
          <vSider></vSider>
          <el-main class="main-content">
              <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
  import vHeader from './Header.vue';
  import vSider from './Sider.vue';
  export default {
      data() {
          return {
            // player coach ceo gm not-login
          }
      },
      props: {
        
      },
      components: {
        vHeader,
        vSider,
      },
      methods: {
      }
  };
</script>

<style acoped>
  .homeWrap {
    box-shadow: 0 0 5px 1px #999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  },
  .container {
    height: 100%;
  }
  .main-content {
    height: 100%;
  }
</style>
