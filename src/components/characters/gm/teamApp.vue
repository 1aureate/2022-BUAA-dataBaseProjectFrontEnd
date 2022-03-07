<template>
    <el-container v-if="this.$store.state.isLogin=='true'">
        <h1>外队交易申请</h1>
        <el-table
            :data="players"
            style="width: 100%"
            :row-class-name="tableRowClassName"
        >
            <el-table-column prop="pttid" label="申请编号" width="180" />
            <el-table-column prop="tstart" label="申请时间" width="180" />
            <el-table-column prop="tpos" label="意向位置" />
            <el-table-column prop="uname" label="球员" width="180" />
            <el-table-column prop="tname" label="意向球队" />
            <el-table-column prop="tend" label="处理时间" width="180" />
            <el-table-column prop="tapplyer" label="处理时间" width="180" />
            <el-table-column prop="tstatus" label="处理阶段" width="180" />
            <el-table-column label="" align="center" width="80">
                <template slot-scope="scope">
                <el-button  type="success" size="mini" :disabled="scope.row.tstatus!='意向经理审核'" @click="confirmHandlePTT(scope.row.pttid, 'accept')"> {{scope.row.tstatus=='意向球队经理审批' || scope.row.tstatus=='同意' ?'已同意':'同意'}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="" align="center" width="80">
                <template slot-scope="scope">
                <el-button  type="success" size="mini" :disabled="scope.row.tstatus!='意向经理审核'" @click="confirmHandlePTT(scope.row.pttid, 'refuse')"> {{scope.row.tstatus=='拒绝' ?'已拒绝':'拒绝'}}</el-button>
                </template>
            </el-table-column>
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
        <h1>聘请自由人申请</h1>
        <el-table
            :data="tpes"
            style="width: 100%"
            :row-class-name="tableRowClassName"
        >
            <el-table-column prop="tpeid" label="申请编号" width="180" />
            <el-table-column prop="tstart" label="开始时间" width="180" />
            <el-table-column prop="tpos" label="意向位置" />
            <el-table-column prop="pname" label="球员" width="180" />
            <el-table-column prop="tname" label="意向球队" />
            <el-table-column prop="tend" label="结束时间" width="180" />
            <el-table-column prop="tapplayer" label="申请人" width="180" />
            <el-table-column prop="tstatus" label="处理阶段" width="180" />
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
        players: [

        ],
        tpes: [

        ],
        currentPage:1,
        pageSize:4,
        currentPage2:1,
        pageSize2:4,
        files_count:0,
        files_count2:0,
    };
 },
 methods: {
    handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getPlayer();
    },
    handleCurrentChange2(currentPage) {
        this.currentPage2 = currentPage;
        this.getTpe();
    },
    getTpe() {
        this.$axios.post('http://127.0.0.1:5000/test/data/tpeGm', 
                {
                    uid: this.$store.state.uid,
                    isLogin: this.$store.state.isLogin,
                    identity: this.$store.state.identity,
                    currentPage: this.currentPage2,
                    pageSize: this.pageSize2,
                }).then(
                    res => {
                        console.log(res);
                        if(res.status === 200 && res.data.success == 'true') {
                            this.files_count2 = parseInt(res.data.count_files);
                            this.tpes = res.data.tpes;
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
    getPlayer() {
        this.$axios.post('http://127.0.0.1:5000/test/data/pttradeGmOuter', 
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
                            this.players = res.data.ptts;
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
    tableRowClassName({ row, rowIndex }) { 
        if (row.tstatus == '通过') {
            return 'success-row'
        } else if ((row.tstatus == '拒绝' )) {
            return 'failure-row'
        } else {
            return 'warning-row'
        }
        return ''
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
                        this.getPlayer();
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
        this.getPlayer();
        this.getTpe();
    },
}
</script>


<style>
  .el-table .warning-row {
    background: rgb(226, 187, 114);
  }
 
  .el-table .success-row {
    background: #86d45c;
  }

   .el-table .failure-row {
    background: #f37474;
  }
</style>