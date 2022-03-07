<template>
   <el-container v-if="this.$store.state.isLogin=='true'">
     
    <el-table 
    :data="players.filter(
        (data) =>
          !search || data.uname.toLowerCase().includes(search.toLowerCase())
                  || data.uname.toLowerCase().includes(search.toLowerCase())
                  || data.uname.toLowerCase().includes(search.toLowerCase())
        )" 
    style="width: 100%"
    :row-key="row => { return row.uid }"
    :expand-row-keys="expandKeys"
    @expand-change="expandChange"
    >
        <el-table-column type="expand">
        <template #default="props">
            <!-- <img :src="props.row.imgUrl"/> -->
            <div>
              <div style="width:200px;height:200px;float:left;margin-right:80px">
                <el-skeleton
                  style="width: 240px; margin-top:20px"
                  :loading="false"
                  animated
                  :throttle="500"
                >
                  <template slot="template">
                    <el-skeleton-item
                      variant="image"
                      style="width: 240px; height: 240px;"
                    />
                  </template>
                  <template>
                    <img
                      :src="props.row.pimgurl"
                      class="image"
                    />
                  </template>
                </el-skeleton>
              </div>
              <div style="width:500px;height:200px;float:left;margin-right:20px">
                <el-descriptions class="margin-top" title="球员概况" :column="4" direction="horizontal">
                  <el-descriptions-item label="生日" :span="2">{{props.row.pbirthday}}</el-descriptions-item>
                  <el-descriptions-item label="经历" :span="2">{{props.row.pexp}}年</el-descriptions-item>
                  <el-descriptions-item label="身高" :span="2">{{props.row.pheight}}米</el-descriptions-item>
                  <el-descriptions-item label="体重" :span="2">{{props.row.pweight}}公斤</el-descriptions-item>
                  <el-descriptions-item label="场均得分" :span="2">{{props.row.pavgscore}}</el-descriptions-item>
                  <el-descriptions-item label="场均助攻" :span="2">{{props.row.pavgassists}}</el-descriptions-item>
                  <el-descriptions-item label="场均篮板" :span="2">{{props.row.pavgrebonds}}</el-descriptions-item>
                </el-descriptions>
              </div>
              <div style="height: 250px;width:300px;float:left" :ref="'echarts'+props.row.uid"></div>
            </div>            
            <!-- 想搞一个服役历史 -->
            <!-- <p>Address: {{ props.row.address }}</p>
            <p>Zip: {{ props.row.zip }}</p> -->
        </template>

        </el-table-column>
        <el-table-column label="姓名" prop="uname" />
        <el-table-column label="球队" prop="tname" />
        <el-table-column label="年薪" prop="psalary" sortable/>
        <el-table-column label="合同年限" prop="pyear" sortable/>
        <el-table-column align="right">
        
        <template #header>
          <el-input @keyup.enter.native="Search" v-model="srch" size="mini" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button type="primary" :disabled="formal=='false'" @click="Purchase(scope.row)"
            >购买</el-button
          >
        </template>
        </el-table-column>
    </el-table>
    <el-footer style="text-align: center;">
        <el-pagination
        background      
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total,jumper,prev, pager, next"
        :total="count_files"
        ></el-pagination>
    </el-footer>
   </el-container>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      form: {
        uid: '',
        pid: '',
        tno: '',
        tcyear: '',
        tsalary: '',
        tpos: '',
        isLogin: '',
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
      players: [
      
      ],
      search: '',
      srch: '',
      currentPage: 1,
      pageSize: 8,
      count_files: 0,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      expandKeys: [],
    }
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getCoach();
    },
    Search() {
      this.search = this.srch;
    }
    ,
  getCoach() {
    this.$axios.post('http://127.0.0.1:5000/test/data/getNotFreePlayers', 
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
                        this.count_files = parseInt(res.data.count_files);
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
    Purchase(row) {
      console.log(this.formal)
      if (this.formal == 'true') {
        this.$confirm('是否确认购买该球员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.isLogin = this.$store.state.isLogin;
          this.form.tcyear = row.pyear;
          this.form.tsalary = row.psalary;
          this.form.tpos = row.ppos;
          this.form.pid = row.uid;
          this.form.uid = this.$store.state.uid;
          this.dialogFormVisible = true;
          this.confirmPurchase();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      } else {
        this.$message({
          type:'warning',
          message: '您的账号尚未验证'
        })
      }
      
    }
    ,
    confirmPurchase() {
      this.$axios.post('http://127.0.0.1:5000/test/action/gmTradePlayer', 
            this.form
            ).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
                        this.$message({
                            message: '申请提交成功',
                            type: 'success'
                          });
                        this.getCoach();
                    }
                    else{
                      this.$message({
                            message: '申请提交失败，存在对该球员未处理的申请',
                            type: 'success'
                          });
                        console.log('请求失败');
                    }
                    }).catch(error => {
                        alert('接口连接错误');
                        console.log(error);
                    }
            )
    },
    expandChange(row,expandRows) {
      console.log(row);
      this.getEcharts(row);
    }
    ,
    getEcharts(row) {
      var echarts = require('echarts');
      setTimeout(_ => {
        var chartDom = this.$refs['echarts' + row.uid];
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: ''
          },
          legend: {
            data: ['球员表现', '联盟平均']
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '场均得分', max: row.info.maxavgscore },
              { name: '场均助攻', max: row.info.maxavgassists },
              { name: '场均篮板', max: row.info.maxavgrebonds },
              { name: '罚球率', max: row.info.maxfreethrowrating },
              { name: '三分率', max: row.info.maxthreepointrating },
            ]
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: [row.info.pavgscore, row.info.pavgassists, row.info.pavgrebonds, row.info.pfreethrowrating, row.info.pthreepointrating],
                  name: '球员表现'
                },
                {
                  value: [row.info.avgscore, row.info.avgassists, row.info.avgrebonds, row.info.freethrowrating, row.info.threepointrating],
                  name: '联盟平均'
                }
              ]
            }
          ]
        };

        option && myChart.setOption(option);

        window.addEventListener("resize", () => {
          myChart.resize();
        });
    },1000)
    }
  },
  created() {
    this.getCoach();
  },
  computed: {
        formal(){
            console.log(localStorage.getItem('formal'))
            return localStorage.getItem('formal');
        }
    }
  // mounted() {
  //  this.init()
  // },
}
</script>