<template>
  <div id="user-add">
    <!-- 页头 -->
    <el-page-header content="用户管理" title="添加用户" />
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="ruleForm.role">
          <el-option label="管理员" value="1"></el-option>
          <el-option label="编辑" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleChange"
        >
          <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          添加
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "UserAdd",

  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        role: "2",
        avatar: "",
        file: null,
        gender: 0,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
      },
    };
  },

  mounted() {},

  methods: {
    // 显示表单头像
    handleChange(file) {
      this.ruleForm.avatar = URL.createObjectURL(file.raw);
      this.ruleForm.file = file.raw;
    },
    // 更新
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送数据
          this.$api.user.userAdd(this.ruleForm).then((result) => {
            if (result.data.message === "ok") {
              this.$router.push('/user-manage/userlist')
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
/* 隐藏箭头 */
::v-deep .el-icon-back {
  display: none;
}

.demo-ruleForm {
  margin-top: 50px;
}

/* 头像上传 */
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>