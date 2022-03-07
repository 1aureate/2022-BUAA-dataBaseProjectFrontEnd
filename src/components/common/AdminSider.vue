<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
       
            <el-menu-item  index="1">
                <i class="el-icon-setting"></i>
                <span slot="title"><router-link to="/home/createTeam">注册球队</router-link></span>
            </el-menu-item>
          <el-menu-item  index="2">
            <i class="el-icon-setting"></i>
            <span slot="title"><router-link to="/home/createUser">添加用户</router-link></span>
          </el-menu-item>
          <el-menu-item  index="3">
            <i class="el-icon-setting"></i>
            <span slot="title"><router-link to="/home/manageUser">管理用户</router-link></span>
          </el-menu-item>
          <el-menu-item  index="3">
            <i class="el-icon-setting"></i>
            <span slot="title"><router-link to="/home/manageTeam">管理球队</router-link></span>
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
