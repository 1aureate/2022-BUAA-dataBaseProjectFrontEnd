<template>
    <el-container direction="vertical" v-if="this.$store.state.isLogin=='true'">
        <span>聘用历史</span>
        <el-table
            :data="tableData1"
            style="width: 100%"
        >
            <el-table-column prop="tcid" label="申请编号" width="180" />
            <el-table-column prop="tstart" label="申请时间" width="180" />
            <el-table-column prop="tno" label="意向位置" />
            <el-table-column prop="tname" label="球队" />
            <el-table-column prop="tcsalary" label="年薪" width="180" />
            <el-table-column prop="tcyear" label="合同年限" width="180" />
            <el-table-column prop="tcmain" label="是否为主教练" width="180" />
            <el-table-column prop="tend" label="处理时间" width="180" />
            <el-table-column prop="tstatus" label="处理阶段" width="180" />
            <el-table-column label="" align="center" width="80">
                <template slot-scope="scope">
                <el-button  type="success" size="mini" :disabled="scope.row.tstatus!='等待教练确认' || formal=='false'"  @click="confirmHandle(scope.row.tcid, 'accept')"> {{scope.row.tstatus=='通过'?'已同意':'同意'}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="" align="center" width="80">
                <template slot-scope="scope">
                <el-button  type="success" size="mini" :disabled="scope.row.tstatus!='等待教练确认' || formal=='false'" @click="confirmHandle(scope.row.tcid, 'refuse')"> {{scope.row.tstatus=='拒绝'?'已拒绝':'拒绝'}}</el-button>
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
        <span>辞退历史</span>
        <el-table
            :data="tableData2"
            style="width: 100%"
        >
            <el-table-column prop="ctid" label="申请编号" width="180" />
            <el-table-column prop="cctime" label="提交时间 " width="180" />
            <el-table-column prop="tname" label="意向球队" width="180" />
            <el-table-column prop="tmaincoach" label="主教练" width="180" />
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
            pageSize1: 10,
            count_files1: 0,
            currentPage2:1,
            pageSize2: 10,
            count_files2: 0,
            tableData1: [],
            tableData2: [],
        }
    },
    methods: {
        getTableData1() {
            this.$axios.post('http://127.0.0.1:5000/test/data/tc', 
            {
                uid: this.$store.state.uid,
                isLogin: this.$store.state.isLogin,
                currentPage: this.currentPage1,
                pageSize: this.pageSize1,
            }).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
                        this.count_files1 = res.data.count_files1;
                        this.tableData1 = res.data.tcs;
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
            this.$axios.post('http://127.0.0.1:5000/test/data/coachCT', 
            {
                uid: this.$store.state.uid,
                isLogin: this.$store.state.isLogin,
                currentPage: this.currentPage2,
                pageSize: this.pageSize2,
            }).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
                        this.count_files2 = res.data.count_files2;
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
        confirmHandle(id, res) {
            this.$axios.post('http://127.0.0.1:5000/test/action/coachHandleTC', 
            {
                tcid: id,
                isLogin: this.$store.state.isLogin,
                result: res,
            }).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
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