<template>
  <div id="home">
    <el-carousel  height="calc(100vh - 61px)">
      <el-carousel-item :key="1">
        <div
          :style="{
            backgroundImage: `url(${require('@/assets/苹果.jpg')})`,
          }"
        ></div>
      </el-carousel-item>
      <el-carousel-item :key="2">
        <div
          :style="{
            backgroundImage: `url(${require('@/assets/西瓜.jpg')})`,
          }"
        ></div>
      </el-carousel-item>
      <el-carousel-item :key="3">
        <div
          :style="{
            backgroundImage: `url(${require('@/assets/哈密瓜.jpg')})`,
          }"
        ></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "WebHome",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel div {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
</style>