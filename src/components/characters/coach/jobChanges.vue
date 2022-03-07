<template>
  <el-form ref="form" :model="form" label-width="120px" v-if="this.$store.state.isLogin=='true'">
    <el-form-item label="我已确认需要离职">
      <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :disabled="formal=='false' || tno"  @click="onSubmit">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        delivery: false,
      },
      info: {}
    }
  },
  methods: {
    getInfo() {
        this.$axios.post('http://127.0.0.1:5000/test/data/userInfo', {uid: this.$store.state.uid, identity: this.$store.state.identity, isLogin:this.$store.state.isLogin}).then(
        res => {
          console.log(res);
          if(res.status===200 && res.data.success == 'true') {    //若code=1则验证成功
            this.info = res.data.info;
          } 
        }).catch(error => {
        console.log(error);
      });
    },
    onSubmit() {
      if (this.form.delivery === false) {
          alert('请确认是否离职')
      } else {
          this.$confirm('此操作将递交辞职申请, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.post('http://127.0.0.1:5000/test/action/coachSubmitCT', 
            {
                uid: this.$store.state.uid,
                isLogin: this.$store.state.isLogin,
            }).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
                        this.$message({
                          type: 'success',
                          message: '辞职成功!'
                        });
                    }
                    else{
                        console.log('请求失败');
                    }
                    }).catch(error => {
                        alert('接口连接错误');
                        console.log(error);
                    }
            )
            
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
          
      }
    },
  },
  computed: {
        formal(){
          console.log(localStorage.getItem('formal'))
            return localStorage.getItem('formal');
        },
        tno() {
          return this.info.tno == "0";
        }
    }
  ,
  mounted() {
    this.getInfo();
  }

}
</script>
