<template>
    <el-container direction="vertical" v-if="this.$store.state.isLogin=='true'">
        <span>队内申请</span>
        <el-table
            :data="tableData1"
            style="width: 100%"
        >
            <el-table-column prop="pttid" label="申请编号" width="180" />
            <el-table-column prop="tstart" label="申请时间" width="180" />
            <el-table-column prop="uname" label="球员" />
            <el-table-column prop="tname" label="球队" />
            <el-table-column prop="tapplayer" label="申请者" width="180" />
            <el-table-column prop="tpos" label="位置" width="180" />
            <el-table-column prop="tend" label="处理时间" width="180" />
            <el-table-column prop="tstatus" label="处理阶段" width="180" />
            <el-table-column label="" align="center" width="80">
                <template slot-scope="scope">
                <el-button  type="success" size="mini" :disabled="scope.row.tstatus!='本队经理审核' || formal==false" @click="confirmHandlePTT(scope.row.pttid, 'accept')"> {{scope.row.tstatus=='意向球队经理审批' || scope.row.tstatus=='同意' ?'已同意':'同意'}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="" align="center" width="80">
                <template slot-scope="scope">
                <el-button  type="success" size="mini" :disabled="scope.row.tstatus!='本队经理审核' || formal==false" @click="confirmHandlePTT(scope.row.pttid, 'refuse')"> {{scope.row.tstatus=='拒绝' ?'已拒绝':'拒绝'}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-footer style="text-align:center;">
            <el-pagination
            background      
            @current-change="handleCurrentChange1"
            :current-page="currentPage1"
            :page-size="pageSize1"
            layout="total,jumper,prev, pager, next"
            :total="count_files1"
            ></el-pagination>
        </el-footer>
        <span>教练申请</span>
        <el-table
            :data="tableData2"
            style="width: 100%"
        >
            <el-table-column prop="ctid" label="申请编号" width="180" />
            <el-table-column prop="cname" label="教练" width="180"/>
            <el-table-column prop="cttime" label="提交时间" width="180" />
            <el-table-column prop="cstatus" label="审批状态" width="180" />
            <el-table-column prop="tname" label="球队" width="180" />
            <el-table-column prop="tmaincoach" label="主教练" width="180" />
            <el-table-column label="" align="center" width="80">
                <template slot-scope="scope">
                <el-button  type="success" size="mini" :disabled="scope.row.cstatus!='总经理确认' || !formal " @click="confirmHandleCT(scope.row.ctid, 'accept')"> {{scope.row.tstatus=='意向球队经理审批' || scope.row.tstatus=='同意' ?'已同意':'同意'}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="" align="center" width="80">
                <template slot-scope="scope">
                <el-button  type="success" size="mini" :disabled="scope.row.cstatus!='总经理确认' || !formal " @click="confirmHandleCT(scope.row.ctid, 'refuse')"> {{scope.row.tstatus=='拒绝' ?'已拒绝':'拒绝'}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-footer style="text-align:center;">
            <el-pagination
            background      
            @current-change="handleCurrentChange2"
            :current-page="currentPage2"
            :page-size="pageSize2"
            layout="total,jumper,prev, pager, next"
            :total="count_files2"
            ></el-pagination>
        </el-footer>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            currentPage1:1,
            pageSize1: 4,
            count_files1: 0,
            currentPage2:1,
            pageSize2: 4,
            count_files2: 0,
            tableData1: [],
            tableData2: [],
        }
    },
    methods: {
        getTableData1() {
            this.$axios.post('http://127.0.0.1:5000/test/data/pttradeGm', 
            {
                uid: this.$store.state.uid,
                isLogin: this.$store.state.isLogin,
                identity: this.$store.state.identity,
                currentPage: this.currentPage1,
                pageSize: this.pageSize1,
            }).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
                        this.count_files1 = parseInt(res.data.count_files);
                        this.tableData1 = res.data.ptts;
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
        ,
        getTableData2() {
            this.$axios.post('http://127.0.0.1:5000/test/data/ctGm', 
            {
                uid: this.$store.state.uid,
                identity: this.$store.state.identity,
                isLogin: this.$store.state.isLogin,
                currentPage: this.currentPage2,
                pageSize: this.pageSize2,
            }).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
                        this.count_files2 = parseInt(res.data.count_files);
                        console.log(this.count_files2);
                        this.tableData2 = res.data.cts;
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
        ,
        handleCurrentChange1(currentPage1) {
            this.currentPage1 = currentPage1;
            this.getTableData1();
        },
        handleCurrentChange2(currentPage2) {
            this.currentPage2 = currentPage2;
            this.getTableData2();
        },
        confirmHandlePTT(id, res) {
            this.$axios.post('http://127.0.0.1:5000/test/action/gmHandlePTT', 
            {
                pttid: id,
                isLogin: this.$store.state.isLogin,
                result: res,
            }).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
                        this.$message({
                          message: '申请处理成功',
                          type: 'success'
                        });
                        this.getTableData1();
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
        confirmHandleCT(id, res) {
            this.$axios.post('http://127.0.0.1:5000/test/action/gmHandleCTT', 
            {
                ctid: id,
                isLogin: this.$store.state.isLogin,
                result: res,
            }).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
                        this.$message({
                          message: '申请处理成功',
                          type: 'success'
                        });
                        this.getTableData2();
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
    computed: {
        formal(){
            return localStorage.getItem('formal');
        }
    }
    ,
    created() {
        this.getTableData1();
        this.getTableData2();
    },
}
</script>

<style>

</style>