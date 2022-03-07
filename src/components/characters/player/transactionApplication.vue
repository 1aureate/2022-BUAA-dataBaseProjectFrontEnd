<template>
    <el-container direction="vertical" v-if="this.$store.state.isLogin=='true'">
        <span>申请历史</span>
        <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName"
        >
            <el-table-column prop="pttid" label="申请编号" width="180" />
            <el-table-column prop="tstart" label="申请时间" width="180" />
            <el-table-column prop="tpos" label="意向位置" width="180" />
            <el-table-column prop="pname" label="球员名称" width="180" />
            <el-table-column prop="tapplyer" label="申请人" width="180" />
            <el-table-column prop="tname" label="意向球队" width="180" />
            <el-table-column prop="tend" label="处理时间" width="180" />
            <el-table-column prop="tstatus" label="处理阶段" width="180" />
        </el-table>
        <el-footer style="text-align:center;">
        <el-pagination
        background      
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total,jumper,prev, pager, next"
        :total="count_files"
        ></el-pagination>
        </el-footer>
        <span>交易申请</span>
        <el-form ref="form" :model="form" :teams="teams" label-width="300px">
            <el-form-item label="意向位置">
            <el-select v-model="form.ppos" clearable placeholder="请选择你的意向位置">
                <el-option v-for="(pos ,i) in positions" :key="i" :label=pos.label :value=pos.value></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="意向队伍">
            <el-select v-model="form.tno" clearable placeholder="请选择你的意向队伍">
            <el-option
              v-for="item in teams"
              :key="item.tno"
              :label="item.tname"
              :value="item.tno">
            </el-option>
          </el-select>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" :disabled="this.$store.state.formal==false" @click="onSubmit">提交申请</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            
            form: {
                ppos: "",
                uid: localStorage.getItem('uid'),
                tno: "",
            },
            teams: [

            ],
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
            tableData: [
                
            ],
            currentPage: 1,
            pageSize: 10,
            count_files: 0,
        }
    },
    methods: {
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.getTableData();
        }
        ,
        onSubmit() {
            if (this.formal == 'true') {
                this.$confirm('此操作将提交申请，确认继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$axios.post('http://127.0.0.1:5000/test/action/playerSubmitPTT', 
                    {
                        uid: this.$store.state.uid,
                        isLogin: this.$store.state.isLogin,
                        ppos: this.form.ppos,
                        tno: this.form.tno,
                    }).then(
                        res => {
                        console.log(res);
                        if(res.status === 200 && res.data.success == 'true') {
                            this.$message({
                                type: 'success',
                                message: '提交成功!'
                            });
                            this.getTableData();
                            console.log('球员申请表提交成功')
                        }
                        else{
                            console.log('请求失败');
                        }
                        }).catch(error => {
                        alert('接口连接错误');
                        console.log(error);
                    });
                
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
                
            
        }, 
        tableRowClassName({ row, rowIndex }) {
            
            if (row.tend != '' && row.tresult === '同意') {
                return 'success-row'
            } else if (row.tend != '' && (row.tresult === '拒绝' )) {
                return 'failure-row'
            } else {
                return 'warning-row'
            }
            return ''
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
                    } else{
                        console.log('请求失败');
                    }
                }).catch(error => {
                alert('接口连接错误');
                console.log(error);
            });
        },
        getTableData() {
            this.$axios.post('http://127.0.0.1:5000/test/data/pttradePlayer', 
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
                        this.tableData = res.data.ptts;
                    }
                    else{
                        console.log('请求失败');
                    }
                    }).catch(error => {
                        alert('接口连接错误');
                        console.log(error);
                    }
            )
        }
    },
    created() {
        console.log(this.$store.state.formal)
        this.getTeams();
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

<style>
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