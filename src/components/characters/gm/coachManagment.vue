<template>
    <el-container direction="vertical" v-if="this.$store.state.isLogin=='true'">
      <el-row>
      <el-col :span="4" v-for="(coach, index) in coachs" :key="index" :offset="index > 0 ? 2 : 0">
      <el-card :body-style="{ padding: '0px' }" :shadow="'hover'">
          <img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0828%2F7820392cj00qyjo5q000vc000dw00ktm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643359514&t=b6f197c9958620e4b70332c2a3286a7b"
            class="image"
          />
          <span></span>
          <div style="padding: 14px">
            <el-descriptions
              :title="coach.cname"
              direction="vertical"
              :column="1"
              :size="'mini'"
              border
            >
              <el-descriptions-item label="年薪">{{coach.csalary}}</el-descriptions-item>
              <el-descriptions-item label="所属球队">{{coach.tname}}</el-descriptions-item>
              <el-descriptions-item label="合同剩余年限">{{coach.cyear}}</el-descriptions-item>
            </el-descriptions>
            <div class="bottom">
              <el-button type="primary" :disabled="!formal" @click="kick(coach.uid)" class="button2">辞退</el-button>
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
    </el-container>
</template>


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

<script>
export default {
  data() {
    return {
        coachs: [
          
        ],
        currentPage:1,
        pageSize:10,
        files_count: 0,
    };
 },
 methods: {
  handleCurrentChange(currentPage) {
    this.currentPage = currentPage;
    this.getCoach();
  },
  getCoach() {
    this.$axios.post('http://127.0.0.1:5000/test/data/getCoachsOfOneTeam', 
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
                        this.coachs = res.data.coachs;
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
  kick(id) {
    this.$confirm('此操作将辞退该教练?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('http://127.0.0.1:5000/test/action/gmKickCoach', 
            {
                uid: this.$store.state.uid,
                isLogin: this.$store.state.isLogin,
                cid: id,
            }).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
                        this.getCoach();
                        this.$message({
                          message: '辞退成功',
                          type: 'success'
                        });
                    }
                    else{
                      this.$message({
                          message: '辞退失败',
                          type: 'warning'
                        });
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
  
},
  created() {
    this.getCoach();
  },
    computed: {
        formal(){
            return localStorage.getItem('formal');
        }
    }
}
</script>