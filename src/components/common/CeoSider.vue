<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>交易记录</span>
            </template>
            <el-menu-item><router-link to="/home/playerTrade">球员交易</router-link></el-menu-item>
            <el-menu-item><router-link to="/home/coachTrade">教练交易</router-link></el-menu-item>
          </el-submenu>
          <el-menu-item  index="2">
            <i class="el-icon-setting"></i>
            <span slot="title"><router-link to="/home/settings">交易总览</router-link></span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
  export default {
      data() {
        return {

        }
      },
      props: []
      ,
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },

      }
  }
</script>

<style>
a {
  text-decoration: none;
}
 
.router-link-active {
  text-decoration: none;
}
</style>
