<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="80px" class="login-form" :rules="rules">
      <h2 class="login-title" style="color:white">交易平台</h2>
      <el-form-item label="用户id" prop='uid'>
        <el-input v-model="form.uid" placeholder="请输入用户id"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop='upwd'>
        <el-input type="password" v-model="form.upwd" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button type="text" @click="toRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  export default {
    name: "login",
    data() {
      return {
        form: {
          uid: "",
          upwd: ""
        },
        rules: {
          uid: [
            {
              required: true,
              message: "请输入用户名",
              trigger: "blur",
            }
          ],
          upwd: [
            {
              required: true,
              message: "请输入密码",
              trigger: "blur",
            }
          ]
        }
      };
    },
    methods: {
      toRegister() {
        this.$router.push('/register');
      }
      ,
      onSubmit() {
        if (this.form.uid === '' || this.form.upwd === '') {
          alert("账号或密码不能为空！");
        }
        else {
          //根据api接口获取token
          this.$axios.post('http://127.0.0.1:5000/test/login/', this.form).then(
            res => {
              console.log(res);
              if(res.status===200 && res.data.token == 'success') {    //若code=1则验证成功
                var userInfo = res.data;
                console.log('nmsl')
                console.log(userInfo.info);
                this.$store.commit('$_setStorage', userInfo);
                alert('登录成功')
                this.$router.push({ name:'home' });
              }
              else{
                  alert('登录失败')
              }
            }).catch(error => {
            alert('接口连接错误');
            console.log(error);
          });
        }
      }
    }
 };
</script>

<style acoped>
.login-form {
  width: 350px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(215, 238, 248); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
  opacity: 0.9;
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px; /* 圆角 */
  background: url("https://pic3.zhimg.com/v2-5f4081ea25107218a41d687ca78a9afe_b.jpg") no-repeat 0px 0px;
  background-size: cover;
  opacity: 0.90;
}

/* 标题 */
.login-title {
  color: #303133;
  text-align: center;
}
</style>
