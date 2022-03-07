<template>
  <el-header style="height:60px">
    <div class="header">
      <div class="header_title">
        交易平台
      </div>
      <div v-if="this.$store.state.isLogin=='true'">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"><span>{{"你好, " + this.$store.state.username}}</span></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item  @click.native="JumpTo('/center')"> 个人中心 </el-dropdown-item>
              <el-dropdown-item  @click.native="JumpTo('/center')">我的通知</el-dropdown-item> -->
              <el-dropdown-item @click.native="LogOut()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right">你好，请登录</i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="LogIn()"> 登录 </el-dropdown-item>
            <el-dropdown-item  @click.native="JumpTo('/register')"> 注册 </el-dropdown-item>         
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<script>
  export default {
    props: {
      logged: Boolean,
    },
    data() {
      return {

      }
    },
    
    methods: {
      LogOut() {
        this.$store.commit('$_removeStorage');    // 清除登录信息
        this.$router.push({
            name:'login'
        });
      },
      LogIn() {
        this.$router.push('/login');
      },
      JumpTo(url) {
        this.$router.push(url);
      }
      ,
      logStateChange(state) {
        this.$emit("logStateChange", state);
      }
    }
  }
</script>

<style>
  .header_title {
    float: left;
    width: 250px;
    line-height: 60px;
  }

  .el-dropdown{
    position: absolute;
    right: 0px;
    width: 150px;
    line-height: 60px;
    padding: 10px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-header {
     box-shadow: 0 0 5px 1px #999    
  }
</style>
