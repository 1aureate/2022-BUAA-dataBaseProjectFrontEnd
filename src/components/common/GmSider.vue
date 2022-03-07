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
              <span>申请处理</span>
            </template>
            <el-menu-item ><router-link to="/home/application">队内事务</router-link></el-menu-item>
            <el-menu-item ><router-link to="/home/teamApp">队际申请</router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>球队管理</span>
            </template>
            <el-menu-item ><router-link to="/home/cManagment">教练团队</router-link></el-menu-item>
            <el-menu-item ><router-link to="/home/pManagment">球员阵容</router-link></el-menu-item>
            <el-menu-item ><router-link to="/home/dataAnalysis">数据分析</router-link></el-menu-item>
          </el-submenu>
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>交易市场</span>
            </template>
            <el-menu-item ><router-link to="/home/freePurchase">自由人</router-link></el-menu-item>
            <el-menu-item ><router-link to="/home/coachPurchase">教练人选</router-link></el-menu-item>
            <el-menu-item ><router-link to="/home/teamPurchase">战队现役</router-link></el-menu-item>
          </el-submenu>
          <el-menu-item  index="4">
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