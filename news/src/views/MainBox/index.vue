<template>
  <div id="mainbox">
    <el-container>
      <Menu />
      <el-container>
        <el-main>
          <Header />
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/mainbox/Header";
import Menu from "@/components/mainbox/Menu";
export default {
  name: "MainBox",
  components: {
    Header,
    Menu,
  },
  data() {
    return {};
  },

  created() {
  },

  methods: {},
};
</script>

<style scoped>
.el-container {
  padding-right: 50px;
}
</style>
