<template>
    <el-container>
        <el-table
            v-if="this.show"
            :data="tableData.filter(
              (data) =>
              !search || data.uid.toLowerCase().includes(search.toLowerCase()
                      || data.uname.toLowerCase().includes(search.toLowerCase())
                      || data.identity.toLowerCase().includes(search.toLowerCase())
                      )
            )" 
            style="width: 100%"
        >
            <el-table-column prop="uid" label="用户id" width="180" sortable/>
            <el-table-column prop="uname" label="用户名" width="180" />
            <el-table-column prop="identity" label="身份" width="180" />
            <el-table-column label="Operations">
            <template #header>
              <el-input @keyup.enter.native="Search" v-model="srch" size="mini" placeholder="Type to search" />
            </template>

            <el-dialog :visible.sync="dialogFormVisible" :append-to-body="true" title="审批">
                    <el-form :model="form" :rules="rules">
                      <el-form-item label="身高" :label-width="formLabelWidth" prop="height">
                        <el-input v-model="form.height" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="体重" :label-width="formLabelWidth" prop="weight">
                        <el-input v-model="form.weight" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="经历" :label-width="formLabelWidth" prop="exp">
                        <el-input v-model="form.exp" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="生日" :label-width="formLabelWidth" prop="birthday">
                        <el-input v-model="form.birthday" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="头像" :label-width="formLabelWidth" prop="imgUrl">
                        <el-input v-model="form.imgUrl" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="场均得分" :label-width="formLabelWidth" prop="avgScore">
                        <el-input v-model="form.avgScore" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="场均助攻" :label-width="formLabelWidth" prop="avgAssists">
                        <el-input v-model="form.avgAssists" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="场均篮板" :label-width="formLabelWidth" prop="avgRebounds">
                        <el-input v-model="form.avgRebounds" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="罚球率" :label-width="formLabelWidth" prop="freeThrowRating">
                        <el-input v-model="form.freeThrowRating" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="三分率" :label-width="formLabelWidth" prop="threePointRating">
                        <el-input v-model="form.threePointRating" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取消</el-button>
                      <el-button type="primary"  @click="handleConfirmCheck"
                        >确认</el-button
                      >
                    </span>
                  </template>
            </el-dialog>
            <template #default="scope">
              
                <el-button
                size="mini"
                type="danger" 
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
                >
                <el-button
                size="mini"
                type="danger"
                @click="handleCheck(scope.$index, scope.row)"
                :disabled="scope.row.formal"
                >审核</el-button
                >
                <!-- 可以改成导入数据 & 上传头像 -->
                
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
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            rules: {
              imgUrl: [{ required: true, message: '请输入球员照片', trigger: 'blur'}],
              avgScore: [{ required: true, message: '请输入平均得分', trigger: 'blur'}],
              avgAssists: [{ required: true, message: '请输入平均助攻', trigger: 'blur'}],
              avgRebounds: [{ required: true, message: '请输入平均篮板', trigger: 'blur'}],
              freeThrowRating: [{ required: true, message: '请输入罚球率', trigger: 'blur'}],
              threePointRating: [{ required: true, message: '请输入三分率', trigger: 'blur'}],
              weight: [{ required: true, message: '请输入体重', trigger: 'blur'}],
              height: [{ required: true, message: '请输入身高', trigger: 'blur'}],
              birthday: [{ required: true, message: '请输入生日', trigger: 'blur'}],
              exp: [{ required: true, message: '请输入经历', trigger: 'blur'}],
            },
            show: false,
            tableData: [
            ],
            form: {
              height: '',
              imgUrl: '',
              avgAssists: '',
              avgScore: '',
              avgRebounds: '',
              freeThrowRating: '',
              threePointRating: '',
              weight: '',
              exp: '',
              birthday: '',

            },
            pageSize: 10,
            currentPage: 1,
            files_count: 0,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            search: '',
            srch: '',
            row: {},
        }
    },
     methods: {
        Search() {
          this.search = this.srch;
        }
        ,
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.getTableData();
        },
        handleCheck(index, row) {
          
          if (row.identity != 'player') {
            this.confirmCheck(row, 0);
          } else {
            this.row = row;
            this.dialogFormVisible = true;
          }
          console.log(row);
        },
        handleConfirmCheck() {
          this.dialogFormVisible = false;
          this.confirmCheck(this.row, 0);
        }
        ,
        confirmCheck(row, index) {
          console.log(row);
            this.$axios.post('http://127.0.0.1:5000/test/action/adminCheckUser', 
            {
                uid: row.uid,
                isLogin: localStorage.getItem('isLogin'),
                info: this.form,
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
                this.dialogFormVisible = false;
              }
              else{
                console.log('加载球队列表失败');
              }
            }).catch(error => {
            alert('接口连接错误');
            console.log(error);
          });

        }
        ,
        handleDelete(index, row) {
            this.$axios.post('http://127.0.0.1:5000/test/action/adminDeletePlayer', 
            {
                uid: row.uid,
                isLogin: localStorage.getItem('isLogin'),
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
        getTableData() {
            this.$axios.post('http://127.0.0.1:5000/test/data/getPlayerInfoAdmin/', 
            {
                mode: 'admin',   
                isLogin: localStorage.getItem('isLogin'),
                currentPage: this.currentPage,
                pageSize: this.pageSize,
            }).then(
            res => {
              console.log(res);
              if(res.status===200 && res.data.success === 'true') {    //若code=1则验证成功
                this.files_count = parseInt(res.data.count_files);
                this.show = true;
                this.tableData = res.data.tableData;
              }
              else{
                console.log('加载球队列表失败');
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