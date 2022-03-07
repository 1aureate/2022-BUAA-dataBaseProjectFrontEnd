<template>
   <el-container v-if="this.$store.state.isLogin=='true'">
    <el-table 
    :data="
    coachs.filter(
        (data) =>
          !search || data.uname.toLowerCase().includes(search.toLowerCase())
      )
    " 
    style="width: 100%"
    >
        <el-table-column type="expand">
        <template #default="props">
            <img style="height:240px;width:240px" src="https://img2.baidu.com/it/u=2157382562,1179191263&fm=26&fmt=auto"/>
        </template>
        </el-table-column>
        <el-table-column label="姓名" prop="uname" />
        <el-table-column label="队伍" prop="tname" />
        <el-table-column align="right">
          <template #header>
            <el-input v-model="search" size="mini" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-button type="primary" @click="Purchase(scope.row)"
              >购买</el-button
            >
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
    <el-dialog :visible.sync="dialogFormVisible" :append-to-body="true" title="购买详情">
          <el-form :model="form" :rules="rules">
            <el-form-item label="年薪" :label-width="formLabelWidth" prop="tsalary">
              <el-input v-model="form.tsalary" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="合同年限" :label-width="formLabelWidth" prop="tcyear">
              <el-input v-model="form.tcyear" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth" prop="tcmain">
              <el-switch
                v-model="form.tcmain"
                active-text=""
                inactive-text="主教练"
              >
              </el-switch>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="handleConfirmPurchase()"
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
          tcyear: [{ required: true, message: '请输入合同年限', trigger: 'blur'}],
          tsalary: [{ required: true, message: '请输入年薪', trigger: 'blur'}],
          tcmain: [{ required: true, message: '请输入教练位置', trigger: 'blur'}],
        },
      form: {
        uid: '',
        pid: '',
        tno: '',
        tcyear: '',
        tsalary: '',
        tcmain: false,
      },
      coachs: [
      ],
      search: '',
      currentPage: 1,
      pageSize: 8,
      files_count:0,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      row: {},
    }
  },
  methods: {
    Purchase(row) {
      if (this.formal == 'true') {
        this.form.isLogin = this.$store.state.isLogin;
        this.form.pid = row.uid;
        this.form.uid = this.$store.state.uid;
        this.dialogFormVisible = true;
        this.row = row;
      } else {
        this.$message({
          type: 'warning',
          message: '您的账号尚未验证'
        })
      }
      
    }
    ,
    handleConfirmPurchase() {
      this.confirmPurchase()
      this.dialogFormVisible = false;
    } 
    ,
    confirmPurchase() {
      this.$axios.post('http://127.0.0.1:5000/test/action/gmHireCoach', 
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
                        console.log('请求失败');
                    }
                    }).catch(error => {
                        alert('接口连接错误');
                        console.log(error);
                    }
            )
    },
    handleCurrentChange(currentPage) {
    this.currentPage = currentPage;
    this.getCoach();
  },
  getCoach() {
    this.$axios.post('http://127.0.0.1:5000/test/data/getFreeCoachs', 
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
}
</script>