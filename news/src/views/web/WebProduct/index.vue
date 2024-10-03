<template>
  <div id="product">
    <el-carousel
      height="calc(100vh - 61px)"
      direction="vertical"
      :autoplay="true"
    >
      <el-carousel-item v-for="item in product" :key="item.id">
        <div
          class="product-cover"
          :style="{
            backgroundImage: `url(http://localhost:3000${item.cover})`,
          }"
        >
          <el-card class="box-card">
            <h2>{{item.productname}}</h2>
             <el-divider><i class="el-icon-caret-bottom"></i></el-divider>
            <div v-html="item.complex"></div>
          </el-card>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "WebProduct",

  data() {
    return {
      product: [],
    };
  },

  created() {
    this.getProduct();
  },

  methods: {
    // 获取产品
    getProduct() {
      this.$api.product.webProductGet().then((result) => {
        if (result.data.message === "ok") {
          this.product = result.data.product;
        } else {
          this.$message.error("获取产品失败");
        }
      });
    },
  },
};
</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.product-cover {
  width: 100%;
  height: calc(100vh - 61px);
  background-size: 100% 100%;
}

.box-card{
  width: 50%;
  height: 100%;
  padding-top: 20px;
  background-color: rgba(255, 255, 255, 0.7);
}
</style>