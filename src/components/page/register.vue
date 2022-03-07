<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-form">
      <h2 class="login-title">交易平台</h2>
      <el-form-item label="id" prop="uid">
        <el-input v-model="form.uid"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="uname">
        <el-input v-model="form.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="upwd">
        <el-input  type="password" v-model="form.upwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="urpwd">
        <el-input  type="password" v-model="form.urpwd"></el-input>
      </el-form-item>
      <el-form-item label="注册身份" prop="identity">
         <el-select v-model="form.identity" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <div>
      <div v-if="form.identity=='gm'" >
        <el-form-item label="所属球队" prop="gm.tno">
          <el-select v-model="form.gm.tno" clearable placeholder="请选择">
            <el-option
              v-for="item in teams"
              :key="item.tno"
              :label="item.tname"
              :value="item.tno">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div v-if="form.identity=='coach'">
        <el-form-item label="合同年限" prop="coach.cyear">
          <el-input v-model="form.coach.cyear"></el-input>
        </el-form-item>
        <el-form-item label="年薪" prop="coach.csalary">
          <el-input v-model="form.coach.csalary"></el-input>
        </el-form-item>
        <el-form-item label="所属球队" prop="coach.tno">
          <el-select v-model="form.coach.tno" clearable placeholder="请选择">
            <el-option
              v-for="item in teams"
              :key="item.tno"
              :label="item.tname"
              :value="item.tno">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div v-if="form.identity=='player'" >
        <el-form-item label="位置" prop="player.ppos">
          <el-select v-model="form.player.ppos" clearable placeholder="请选择">
            <el-option
              v-for="item in positions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属球队" prop="player.tno">
          <el-select v-model="form.player.tno" clearable placeholder="请选择">
            <el-option
              v-for="item in teams"
              :key="item.tno"
              :label="item.tname"
              :value="item.tno">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="球衣号码" prop="player.pnum">
          <el-input v-model="form.player.pnum"></el-input>
        </el-form-item>
        <el-form-item label="年薪" prop="player.psalary">
          <el-input v-model="form.player.psalary"></el-input>
        </el-form-item>
        <el-form-item label="合同年限" prop="player.pyear">
          <el-input v-model="form.player.pyear"></el-input>
        </el-form-item>
      </div>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        teams: [

        ]
        ,
        form: {
          mode: '',
          uid: '',
          uname: '',
          upwd: '',
          urpwd: '',
          identity: '',
          gm: {
            tno: '',
          },
          player: {
            pnum: '',
            psalary: '',
            tno: '',
            pyear: '',
            pdeny: '',
            ppos: '',
          },
          coach: {
            csalary: '',
            tno: '',
            cyear: '',
          }
        },
        positions: [
          {
            label:'前锋',
            value:'前锋',
          },
          {
            label:'后卫',
            value:'后卫',
          },
          {
            label:'中锋',
            value:'中锋',
          },
        ]
        ,
        options: [
          {
            label:'',
            value:'',
          },
          {
            label:"经理",
            value:"gm"
          },
          {
            label:"教练",
            value:"coach"
          },
          {
            label:"球员",
            value:"player"
          },
        ],
        rules: {
          uid: [{ required: true, message: '请输入用户id', trigger: 'blur'}],
          uname: [{ required: true, message: '请输入用户名', trigger: 'blur'}],
          upwd: [{ required: true, message: '请输入用户密码', trigger: 'blur'}],
          urpwd: [{ required: true, message: '请确认密码', trigger: 'blur'}],
          identity: [{ required: true, message: '请选择用户类型', trigger: 'blur'}],
          info: [{ required: true, message: '请输入用户类型信息', trigger: 'blur'}],
          'gm.tno': [{ required: true, message: '请输入用户类型信息', trigger: 'blur'}],
          'player.tno': [{ required: true, message: '请输入用户类型信息', trigger: 'blur'}],
          'coach.tno': [{ required: true, message: '请输入用户类型信息', trigger: 'blur'}],
          'player.ppos': [{ required: true, message: '请输入用户类型信息', trigger: 'blur'}],
          'player.pnum': [{ required: true, message: '请输入用户类型信息', trigger: 'blur'}],
          'player.psalary': [{ required: true, message: '请输入用户类型信息', trigger: 'blur'}],
          'player.pyear': [{ required: true, message: '请输入用户类型信息', trigger: 'blur'}],
          'coach.cyear': [{ required: true, message: '请输入用户类型信息', trigger: 'blur'}],
          'coach.csalary': [{ required: true, message: '请输入用户类型信息', trigger: 'blur'}],
        }
      }
    },
    methods: {
      onSubmit() {
        if (this.username === '' || this.password === '' || this.form.identity === '') {
          alert("信息不能为空！");
        }
        else {
          //根据api接口获取token
          this.$axios.post('http://127.0.0.1:5000/test/register/', this.form).then(
            res => {
              console.log(res);
              if(res.status===200 && res.data.status == 'success') {
                alert('注册成功')
                this.$router.push({ name:'login' });
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
      getTeams() {
        this.$axios.post('http://127.0.0.1:5000/test/data/rteams', 
        {
          uid: '',
        }).then(
            res => {
              console.log(res);
              if(res.status === 200 && res.data.success == 'true') {
                  this.teams = res.data.teams;
              }
              else{
                console.log('请求失败');
              }
            }).catch(error => {
            alert('接口连接错误');
            console.log(error);
          });
      }
    },
    mounted() {
      this.getTeams();  
    }
    
  }
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
  border-radius: 10px; /* 圆角 */
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
