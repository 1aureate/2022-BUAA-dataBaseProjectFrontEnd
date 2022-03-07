<template>
    <el-container>
        <el-table
            v-if="this.show"
            :data="tableData.filter(
              (data) =>
              !search || data.tname.toLowerCase().includes(search.toLowerCase()
                      || data.tgm.toLowerCase().includes(search.toLowerCase())
                      || data.tmaincoach.toLowerCase().includes(search.toLowerCase())
                      )
            )" 
            style="width: 100%"
            :default-sort = "{prop: 'tno', order: 'ascending'}"
        >
            <el-table-column prop="tno" label="球队编号" width="180" sortable/>
            <el-table-column prop="tname" label="球队名" sortable/>
            <el-table-column prop="tgm" label="球队经理" />
            <el-table-column prop="tmaincoach" label="球队主教练" width="180" />
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button
                    size="mini"
                    type="danger"
        
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                    >
                </template>
            </el-table-column>
            <template #header>
              <el-input v-model="search" size="mini" placeholder="Type to search" />
            </template>
        </el-table>
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

<script>
export default {
    data() {
        return {
          search: '',
            show: false,
            tableData: [

            ],
            pageSize: 10,
            currentPage: 1,
            files_count: 0,
        }
    },
    methods: {
        handleCurrentChange(currentPage) {
          this.currentPage = currentPage;
          this.getTableData();
        },
        handleDelete(index, row) {
            this.$axios.post('http://127.0.0.1:5000/test/action/adminDeleteTeam', 
            {
                tno: row.tno,
                isLogin: 'true',
            }).then(
            res => {
              console.log(res);
              if(res.status===200 && res.data.success === 'true') {    //若code=1则验证成功
                // 重调接口进行数据更新
                this.getTableData();
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                })
              }
              else{
                console.log('加载球队列表失败');
              }
            }).catch(error => {
            alert('接口连接错误');
            console.log(error);
          });
        },
        getTableData() {
            this.$axios.post('http://127.0.0.1:5000/test/data/getTeamInfoAdmin/', 
            {
                mode: 'admin',   
                isLogin: 'true',
                currentPage: this.currentPage,
                pageSize: this.pageSize,
            }).then(
            res => {
              console.log(res);
              if(res.status===200 && res.data.success === 'true') {    //若code=1则验证成功
                this.show = true;
                this.tableData = res.data.tableData;
                this.files_count = parseInt(res.data.count_files)
              }
              else{
                console.log('加载球队列表失败');
                this.$message({
                  type: 'warning',
                  message: '操作失败!'
                })
              }
            }).catch(error => {
            alert('接口连接错误');
            console.log(error);
          });
        },
    },
    created() {
      this.getTableData();
    }
}
</script>


<style>

</style>