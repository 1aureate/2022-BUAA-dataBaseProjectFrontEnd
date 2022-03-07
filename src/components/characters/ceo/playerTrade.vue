<template>
    <el-container direction="vertical" v-if="this.$store.state.isLogin=='true'">
        <span>球队交易</span>
        <el-table
            :data="tableData1"
            style="width: 100%"
        >
            <el-table-column prop="pttid" label="申请编号" width="180" />
            <el-table-column prop="tstart" label="申请时间" width="180" />
            <el-table-column prop="uname" label="球员" />
            <el-table-column prop="tname" label="意向球队" />
            <el-table-column prop="tpos" label="意向位置" />
            <el-table-column prop="tapplayer" label="申请人" />
            <el-table-column prop="tend" label="处理时间" width="180" />
            <el-table-column prop="tstatus" label="处理阶段" width="180" />
            <el-table-column label="" align="center" width="80">
                <template slot-scope="scope">
                <el-button  type="success" size="mini" :disabled="scope.row.tstatus=='拒绝' || scope.row.tstatus=='通过' || formal==false" @click="handleRefusePTT(scope.row.pttid)"> {{scope.row.confirm?'已否决':'否决'}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-footer style="text-align:center;">
            <el-pagination
            background      
            @current-change="handleCurrentChange1"
            :current-page="currentPage1"
            :page-size="pageSize1"
            layout="total,jumper,prev, pager, next,sizes"
            :total="count_files1"
            ></el-pagination>
        </el-footer>
        <span>球队聘用</span>
        <el-table
            :data="tableData2"
            style="width: 100%"
        >
            <el-table-column prop="tpeid" label="申请编号" width="180" />
            <el-table-column prop="pname" label="球员" width="180"/>
            <el-table-column prop="tstart" label="提交时间" width="180" />
            <el-table-column prop="tpesalary" label="年薪" width="180" />
            <el-table-column prop="tpeyear" label="合同年限" width="180" />
            <el-table-column prop="tpos" label="意向位置" width="180" />
            <el-table-column prop="tname" label="意向球队" width="180" />
            <el-table-column prop="tend" label="处理时间" width="180" />
            <el-table-column prop="tstatus" label="审批状态" width="180" />
            <el-table-column label="" align="center" width="80">
                <template slot-scope="scope">
                <el-button  type="success" size="mini" :disabled="scope.row.tstatus=='拒绝' || scope.row.tstatus=='通过' || formal==false" @click="handleRefuseTPE(scope.row.tpeid)"> {{scope.row.confirm?'已否决':'否决'}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-footer style="text-align:center;">
            <el-pagination
            background      
            @current-change="handleCurrentChange2"
            :current-page="currentPage2"
            :page-size="pageSize2"
            layout="total,jumper,prev, pager, next,sizes"
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
            this.$axios.post('http://127.0.0.1:5000/test/data/ceoPTT', 
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
            this.$axios.post('http://127.0.0.1:5000/test/data/ceoTPE', 
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
                        this.tableData2 = res.data.tpes;
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
        handleRefusePTT(id) {
            this.$axios.post('http://127.0.0.1:5000/test/action/ceoRefusePTT', 
            {
                pttid: id,
                isLogin: this.$store.state.isLogin,
            }).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
                        this.getTableData1();
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        })
                    }
                    else{
                        console.log('请求失败');
                        this.$message({
                            type: 'warning',
                            message: '操作失败!'
                        })
                    }
                    }).catch(error => {
                        alert('接口连接错误');
                        console.log(error);
                    }
            )
        },
        handleRefuseTPE(id) {
            this.$axios.post('http://127.0.0.1:5000/test/action/ceoRefuseTPE', 
            {
                tpeid: id,
                isLogin: this.$store.state.isLogin,
            }).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
                        this.getTableData2();
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        })
                    }
                    else{
                        console.log('请求失败');
                        this.$message({
                            type: 'warning',
                            message: '操作失败!'
                        })
                    }
                    }).catch(error => {
                        alert('接口连接错误');
                        console.log(error);
                    }
            )
        }
        
    },
    created() {
        this.getTableData1();
        this.getTableData2();
    },
    computed: {
        formal(){
            return localStorage.getItem('formal');
        }
    }
    ,
}
</script>

<style>

</style>