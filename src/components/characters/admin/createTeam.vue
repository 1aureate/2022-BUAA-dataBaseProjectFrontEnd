<template>
  <el-container v-if="this.$store.state.isLogin=='true'">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-form">
      <el-form-item label="球队名称" prop="tname">
        <el-input v-model="form.tname"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          tname: '',
        },
        rules: {
          tname: [{ required: true, message: '请输入用户名', trigger: 'blur'}],
        }
      }
    },
    methods: {
      clear() {
        this.form.tname = ''
      }
      ,
      onSubmit() {
        if (this.username === '' || this.password === '' || this.form.identity === '') {
          alert("信息不能为空！");
        }
        else {
          //根据api接口获取token
          this.$axios.post('http://127.0.0.1:5000/test/registerTeam/', this.form).then(
            res => {
              console.log(res);
              if(res.status===200 && res.data.success == 'true') {
                alert('注册成功');
                this.clear();
              }
              else{
                alert('注册失败')
              }
            }).catch(error => {
            alert('接口连接错误');
            console.log(error);
          });
        }
      },
    }
  }
</script>

<style acoped>
.login-form {
  width: 450px;
  margin: auto; /* 上下间距160px，左右自动居中*/
  padding: 30px;
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* 标题 */
.login-title {
  color: #303133;
  text-align: center;
}
</style>