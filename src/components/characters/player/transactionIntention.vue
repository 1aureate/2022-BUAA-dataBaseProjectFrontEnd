<template>
  <div class="app-container" v-if="this.$store.state.isLogin=='true'">
    <el-table 
    :data="tableData" 
    tooltip-effect="dark" 
    :cell-style="cellStyle"  
    fit highlight-current-row
    :row-class-name="tableRowClassName">
      <el-table-column prop="tpeid" label="意向编号" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="tname" label="球队" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="tpesalary" label="年薪" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="tpeyear" label="合同时长" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="tpos" label="意向位置" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="tstart" label="开始时间" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="tend" label="结束时间" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="tstatus" label="处理阶段" align="center" show-overflow-tooltip></el-table-column>      
      <el-table-column label="" align="center" width="80">
        <template slot-scope="scope">
          <el-button  type="success" size="mini" :disabled="scope.row.tstatus != '等待球员确认'" @click="confirmHandle(scope.row.tpeid, 'accept')"> {{scope.row.tstatus == '同意'?'已同意':'同意'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="" align="center" width="80">
        <template slot-scope="scope">
          <el-button  type="success" size="mini" :disabled="scope.row.tstatus != '等待球员确认'" @click="confirmHandle(scope.row.tpeid, 'refuse')"> {{scope.row.tstatus == '拒绝'?'已拒绝':'拒绝'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-footer style="text-align:center;">
        <el-pagination
        background      
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total,jumper,prev, pager, next,sizes"
        :total="count_files"
        ></el-pagination>
    </el-footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {//初始数据变量
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        count_files: 0,
      }
    },
    methods: {
      cellStyle(row,column,rowIndex,columnIndex){//根据报警级别显示颜色
        // console.log(row);
        // console.log(row.column);
        if(row.column.label==="告警级别"&& row.row.alarmLevel==="紧急告警"){
          return 'color:red'
        }else if(row.column.label==="告警级别"&& row.row.alarmLevel==="一般告警" ){
          return 'color:yellow'
        }
      },
      handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.getTableData();
      }
      ,
      getTableData() {
          this.$axios.post('http://127.0.0.1:5000/test/data/tpemploy', 
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
                      this.tableData = res.data.tpes;
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
        confirmHandle(id, ans) {
          if (this.formal == 'true') {
            this.$axios.post('http://127.0.0.1:5000/test/action/playerHandleTPE', 
              {
                  tpeid: id,
                  isLogin: this.$store.state.isLogin,
                  result: ans,
              }).then(
                  res => {
                      console.log(res);
                      if(res.status === 200 && res.data.success == 'true') {
                          this.getTableData();
                          this.$message({
                            type: 'success',
                            message: '操作成功!'
                          })
                      }
                      else{
                          console.log('请求失败');
                      }
                      }).catch(error => {
                          alert('接口连接错误');
                          console.log(error);
                      }
              )
          } else {
            this.$message({
              type: 'warning',
              message: '您的账号尚未验证'
            })
          }
          
        },
        tableRowClassName({ row, rowIndex }) {
            
            if (row.tend != '' && row.tstatus === '同意') {
                return 'success-row'
            } else if (row.tend != '' && (row.tstatus === '拒绝' )) {
                return 'failure-row'
            } else {
                return 'warning-row'
            }
            return ''
        },
    },
    created() {
      this.getTableData();
    },
    computed: {
        formal(){
            console.log(localStorage.getItem('formal'))
            return localStorage.getItem('formal');
        }
    }
  }
</script>

<style scoped>
 .el-table .warning-row {
    background: oldlace;
  }
 
  .el-table .success-row {
    background: #f0f9eb;
  }

   .el-table .failure-row {
    background: #f31e1e;
  }
</style>


