<template>
  <div id="menu">
    <!--侧边导航栏-->
    <el-aside :width="collapse ? '64px' : '200px'">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        :collapse="collapse"
        :collapse-transition="false"
        :router="true"
      >
        <!-- 首页 -->
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <!-- 个人中心 -->
        <el-menu-item index="/center">
          <i class="el-icon-s-custom"></i>
          <span slot="title">个人中心</span>
        </el-menu-item>

        <!-- 用户管理 -->
        <el-submenu v-if="showManage" index="/user-manage">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
            <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 新闻管理 -->
        <el-submenu index="/news-manage">
          <template slot="title">
            <i class="el-icon-receiving"></i>
            <span>新闻管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/news-manage/addnews">创建新闻</el-menu-item>
            <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 产品管理 -->
        <el-submenu index="/product-manage">
          <template slot="title">
            <i class="el-icon-reading"></i>
            <span>产品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/product-manage/addproduct"
              >添加产品</el-menu-item
            >
            <el-menu-item index="/product-manage/productlist"
              >产品列表</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <!-- 返回新闻页面 -->
        <el-menu-item index="/webhome">
          <span slot="title">新闻首页</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "Menu",

  data() {
    return {};
  },

  mounted() {},

  methods: {},

  computed: {
    // 控制导航栏显示隐藏
    collapse() {
      return this.$store.state.collapse;
    },
    //导航栏高亮显示
    defaultActive() {
      return this.$route.path;
    },
    // 是否显示用户管理
    showManage() {
      if (this.$store.state.userInfo.role === 1) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
/* 左侧导航栏高度 */
.el-aside,
.el-menu {
  height: 100vh;
}
</style>