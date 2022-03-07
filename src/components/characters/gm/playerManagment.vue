<template>
    <el-container v-if="this.$store.state.isLogin=='true'" direction="vertical">
      <el-row :gutter="2">
      <el-col :span="4" v-for="(player, index) in players" :key="index" :offset="index > 0 ? 2 : 0">
      <el-card :body-style="{ padding: '0px' }" :shadow="'hover'">
          <img
            :src="player.pimgurl"
            class="image"
          />
          <div style="padding: 14px">
            <el-descriptions
              :title="player.uname"
              direction="vertical"
              :column="1"
              :size="'mini'"
              border
            >
              <el-descriptions-item label="球衣号码">{{player.pnum}}</el-descriptions-item>
              <el-descriptions-item label="球员薪资">{{player.psalary}}</el-descriptions-item>
              <el-descriptions-item label="合同剩余年限">{{player.pyear}}</el-descriptions-item>
              <el-descriptions-item label="位置">{{player.ppos}}</el-descriptions-item>
            </el-descriptions>
            <div class="bottom">

              <el-button type="text" class="button1" @click="bounce(player.uid)">交易</el-button>
              <el-button type="text" class="button2" @click="buyout(player.uid)">买断</el-button>
            
            </div>
          </div>
        </el-card>
      </el-col>
      </el-row>
      
      <el-footer style="text-align:center;">
        <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total,jumper,prev, pager, next"
        :total="files_count"
      ></el-pagination>
      </el-footer>
      <el-dialog title="购买详情" :visible.sync="dialogFormVisible" :append-to-body="true">
                  <span></span>
                  <el-form :model="form" :rules="rules">
                    <el-form-item label="" :label-width="formLabelWidth" prop="tno">
                      <el-select v-model="form.tno" clearable placeholder="请选择意向球队">
                        <el-option
                          v-for="item in teams"
                          :key="item.tno"
                          :label="item.tname"
                          :value="item.tno">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取消</el-button>
                      <el-button type="primary" @click="trade(form.tno)"
                        >确认</el-button
                      >
                    </span>
                  </template>
                </el-dialog>
    </el-container>
</template>

<script>
export default {
  data() {
    return {
        rules: {
          tno: [{ required: true, message: '请选择意向球队', trigger: 'blur'}],
        },
        form: {
          tno: '',
        },
        players: [

        ],
        teams: [

        ],
        currentPage:1,
        pageSize:4,
        files_count:0,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        
    };
 },
 methods: {
  bounce(id) {
    this.dialogFormVisible = true;
    this.form.pid = id;
    console.log(this.dialogFormVisible);
  }
  ,
  handleCurrentChange(currentPage) {
    this.currentPage = currentPage;
    this.getCoach();
  },
  getCoach() {
    this.$axios.post('http://127.0.0.1:5000/test/data/getPlayersOfOneTeam', 
            {
                uid: this.$store.state.uid,
                isLogin: this.$store.state.isLogin,
                identity: this.$store.state.identity,
                currentPage: this.currentPage,
                pageSize: this.pageSize,
            }).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
                        this.files_count = parseInt(res.data.count_files);
                        this.players = res.data.players;
                    }
                    else{
                        console.log('请求失败');
                    }
                    }).catch(error => {
                        alert('接口连接错误');
                        console.log(error);
                    }
            )
  },
  trade(no) {
    this.$confirm('此操作将交易球员是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('http://127.0.0.1:5000/test/action/gmTradePlayer', 
            {
                uid: this.$store.state.uid,
                isLogin: this.$store.state.isLogin,
                tno: no,
                pid: this.form.pid
            }).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
                        this.getCoach();
                        this.$message({
                          message: '申请提交成功',
                          type: 'success'
                        });
                    }
                    else{
                        console.log('请求失败');
                        this.$message({
                          message: '申请提交失败',
                          type: 'warning'
                        });
                    }
                    }).catch(error => {
                        this.$message.error('接口连接错误');
                        console.log(error);
                    }
            )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    
  },
  buyout(id) {
    this.$confirm('此操作将买断该球员，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('http://127.0.0.1:5000/test/action/gmKickPlayer', 
            {
                uid: this.$store.state.uid,
                isLogin: this.$store.state.isLogin,
                pid: id,

            }).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
                        this.getCoach();
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
    
  },
  getTeams() {
        this.$axios.post('http://127.0.0.1:5000/test/data/teams', 
        {
            uid: this.$store.state.uid,
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
  },
 },
 created() {
    this.getCoach();
    this.getTeams();
  },
}
</script>

<style>

 
 .bottom {
  margin-top: 25px;
  line-height: 15px;
 }

 .button1 {
  padding: 0;
  float: right;
 }

  .button2 {
  padding: 0;
  float: left;
 }

 .image {
  width: 100%;
  display: block;
 }

 .clearfix:before,
 .clearfix:after {
   display: table;
   content: "";
 }
 
 .clearfix:after {
   clear: both
 }
</style>