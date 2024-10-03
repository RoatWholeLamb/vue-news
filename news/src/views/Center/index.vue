<template>
  <div id="center">
    <!-- 页头 -->
    <el-page-header content="个人中心" title="企业门户网站管理系统" />
      <!-- 头像区 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card box-avatar">
          <el-avatar :size="100" :src="avatarLeftUrl" />
          <h3>{{ username }}</h3>
          <h5>{{ role }}</h5>
        </el-card>
      </el-col>
      <!-- 表单 -->
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="ruleForm.username"
                :placeholder="username"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select v-model="ruleForm.gender" >
                <el-option label="保密" value="0"></el-option>
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
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
                <img
                  v-if="ruleForm.avatar"
                  :src="avatarRightUrl"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">
                更新
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Center",

  data() {
    return {
      ruleForm: {
        username:'',
        gender:this.$store.state.userInfo.gender+'',
        avatar:this.$store.state.userInfo.avatar,
        file: null,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
      },
    };
  },

  mounted() {
  },

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
          const data = new FormData();
          for (let i in this.ruleForm) {
            data.append(i, this.ruleForm[i]);
          }
          // 发送数据
          this.$api.user.userChange(data).then((result) => {
            if (result.data.message === "ok") {
              this.$store.commit("changeUserInfo", result.data.data);
              this.$message({
                message: "更新成功",
                type: "success",
              });
            }
          });
        }
      });
    },
  },
  computed: {
    // 左侧头像
    avatarLeftUrl() {
      return this.$store.state.userInfo.avatar
        ? "http://localhost:3000" + this.$store.state.userInfo.avatar
        : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    },
    // 用户名
    username() {
      return this.$store.state.userInfo.username;
    },
    // 身份
    role() {
      return this.$store.state.userInfo.role == 1 ? "管理员" : "编辑";
    },
    // 右侧头像
    avatarRightUrl() {
      const url = this.$store.state.userInfo.avatar;
      return this.ruleForm.avatar.includes("blob")
        ? this.ruleForm.avatar
        : "http://localhost:3000" + url;
    },
  },
};
</script>

<style scoped>
/* 隐藏箭头 */
::v-deep .el-icon-back {
  display: none;
}

::v-deep .el-row {
  margin-top: 50px;
}
.box-avatar {
  text-align: center;
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