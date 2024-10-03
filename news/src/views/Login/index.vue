<template>
  <!-- 粒子背景 -->
  <div id="login">
    <vue-particles
      class="login-bg"
      color="#39AFFD"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#8DD1FE"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>

    <!-- 表单 -->
    <div class="formContainer">
      <h3>企业门户网站管理系统</h3>
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
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {
    this.$nextTick(() => {
      if (localStorage.getItem("token")) {
        this.$router.replace("/home").catch((err) => {
          console.log(err);
        });
      }
    });
  },

  methods: {
    submitForm(formName) {
      // 校验表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 设置token
          this.$api.user
            .userLogin(this.ruleForm.username, this.ruleForm.password)
            .then((result) => {
              if (result.data.message === "用户名密码不匹配") {
                this.$message.error("用户名和密码不匹配");
              } else {
                // 保存用户信息
                this.$store.commit("changeUserInfo", result.data.data);
                // 提交数据
                this.$router.replace("/home").catch((err) => {
                  console.log(err);
                });
              }
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
}

/* 粒子背景 */
.login-bg {
  width: 100%;
  height: 100%;
  background: #2d3a4b;
  position: fixed;
}

/* 表单 */
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  background: rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  padding: 20px;
  padding-right: 40px;
}
::v-deep .el-form-item__label {
  color: rgb(255, 255, 255);
}
h3 {
  font-size: 30px;
}
.demo-ruleForm {
  margin-top: 20px;
}
</style>