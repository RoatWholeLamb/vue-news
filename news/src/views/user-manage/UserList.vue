<template>
  <div id="user-list">
    <el-card>
      <!-- 页头 -->
      <el-page-header content="用户管理" title="用户列表" class="page-header" />
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="avatar" label="头像">
          <template slot-scope="scope">
            <div v-if="scope.row.avatar.includes('/avataruploads')">
              <el-avatar
                :size="50"
                :src="'http://localhost:3000' + scope.row.avatar"
              />
            </div>
            <div v-else>
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="身份">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.role === 1" type="danger">管理员</el-tag>
            <el-tag v-else type="success">编辑员</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index)"
              >编辑</el-button
            >
            <el-popconfirm
              class="popconfirm"
              @confirm="handleDelete(scope.row.id)"
              title="确定要删除吗？"
            >
              <template slot="reference">
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="不填视为不修改密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="role">
          <el-select v-model="ruleForm.role">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="编辑" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserList",

  data() {
    return {
      tableData: [],
      dialogVisible: false,
      ruleForm: {
        username: "",
        role: "",
        password: "",
        id:'',
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        password: [{ required: false, trigger: "blur" }],
        role: [{ required: true, message: "请选择身份", trigger: "blur" }],
      },
    };
  },

  created() {
    // 调用获取用户信息方法
    this.userGet();
  },

  methods: {
    // 获取用户信息
    userGet() {
      this.$api.user.userGet().then((result) => {
        if (result.data.message === "ok") {
          this.tableData = result.data.data;
        } else {
          this.$message.error("获取用户信息失败");
        }
      });
    },
    // 编辑
    handleEdit(index) {
      this.ruleForm = {
        username: this.tableData[index].username,
        role: this.tableData[index].role + "",
        id:this.tableData[index].id,
      };
      this.dialogVisible = true;
    },
    // 确认修改
    changeUser() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$api.user.userEdit(this.ruleForm).then((result) => {
            if (result.data.message === "ok") {
              this.$message({
                type: "success",
                message: "编辑成功!",
              });
              // 刷新数据
              this.userGet();  
               this.dialogVisible=false;
            } else {
              this.$message.error('编辑失败!');
            }
          });
        }
      });
    },
    // 删除
    handleDelete(id) {
      this.$api.user.userDel(id).then((result) => {
        if (result.data.message === "ok") {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 刷新数据
          this.userGet();
        } else {
          this.$message.error('删除失败!');
        }
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
/* 隐藏箭头 */
::v-deep .el-icon-back {
  display: none;
}

.page-header {
  margin-bottom: 20px;
}

.popconfirm {
  margin-left: 5px;
}
</style>