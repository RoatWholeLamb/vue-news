<template>
  <div id="nav-menu" v-if="showNav">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="/webhome">首页</el-menu-item>
      <el-menu-item index="/webnews">新闻</el-menu-item>
      <el-menu-item index="/webproduct">产品</el-menu-item>
      <el-menu-item index="/login">登录</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavMenu",

  data() {
    return {
      activeIndex: this.$route.path,
    };
  },
  methods: {},

  computed: {
    // 是否显示导航栏
    showNav() {
      return this.$store.state.isNav;
    },
  },
};
</script>

<style scoped>
.el-menu-demo {
  padding-left: 50px;
}
</style>