<template>
  <div id="header">
    <el-header>
      <div class="left">
        <i @click="changeCollapse" class="el-icon-menu"></i>
        <span style="margin-left: 10px">企业门户网站管理系统</span>
      </div>
      <div class="right">
        <span>欢迎 {{username}} 回来</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-coordinate"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleLogin"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {};
  },

  mounted() {},

  methods: {
    // 控制导航栏显示隐藏
    changeCollapse() {
      this.$store.commit("changeCollapse");
    },
    // 退出登录
    handleLogin() {
      localStorage.removeItem('token');
      this.$store.commit('clearUserInfo');
      this.$router.push("/webhome");
    },
  },
  computed:{
    // 用户名
    username(){
      return this.$store.state.userInfo.username;
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
}

.el-header {
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
  line-height: 60px;
  background-color: #2d3a4b;
  color: white;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.el-dropdown {
  margin-left: 10px;
  color: aliceblue;
}

.el-icon-coordinate {
  font-size: 25px;
}

.el-icon-menu,
.el-icon-coordinate {
  cursor: pointer;
}
</style>