<template>
  <el-container v-if="this.$store.state.isLogin=='true'">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-form">
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
         <el-select v-model="form.identity" placeholder="请选择">
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
          <el-select v-if="this.show"  v-model="form.gm.tno" clearable placeholder="请选择">
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
          <el-select v-if="this.show" v-model="form.coach.tno" clearable placeholder="请选择">
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
          <el-select v-if="this.show" v-model="form.player.tno" clearable placeholder="请选择">
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
      <div v-if="form.identity=='ceo'" >
      </div>
      </div>
      <el-form-item>
        <el-button type="primary"  @click="onSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        show:false,
        teams:[],
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
        form: {
          mode: 'admin',
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
            pdeny: ''
          },
          coach: {
            csalary: '',
            tno: '',
            cyear: '',
          }
        },
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
          {
              label:"总裁",
              value:"ceo",
          }
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
                  alert('创建成功')
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
          uid: this.$store.state.uid,
        }).then(
            res => {
              console.log(res);
              if(res.status === 200 && res.data.success == 'true') {
                  console.log(res.data.teams);
                  console.log(this.form);
                  this.show = true;
                  this.teams = res.data.teams;
                  console.log(this.teams[0]);
              }
              else{
                console.log('请求失败');
              }
            }).catch(error => {
            alert('接口连接错误');
            console.log(error);
          });
      },
    },
    created() {
      this.getTeams();
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
