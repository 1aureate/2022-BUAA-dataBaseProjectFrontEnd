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
              <span>交易事项</span>
            </template>
            <el-menu-item >
              <span slot="title"><router-link to="/home/transactionApplication">交易申请</router-link></span>
              </el-menu-item>
            <el-menu-item >
              <span slot="title"><router-link to="/home/transactionIntention">交易意向</router-link></span>
              </el-menu-item>
          </el-submenu>
          <el-menu-item  index="2">
            <i class="el-icon-document"></i>
            <span slot="title"><router-link to="/home/contract">个人信息</router-link></span>
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
