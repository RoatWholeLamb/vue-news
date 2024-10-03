<template>
  <div id="home">
    <!-- 页头 -->
    <el-page-header content="首页" title="企业门户网站管理系统" />
    <!-- 欢迎用户 -->
    <el-card class="box-card">
      <el-row>
        <el-col :span="4"
          ><el-avatar :size="100" :src="avatarUrl"></el-avatar
        ></el-col>
        <el-col :span="20"
          ><h3>欢迎 {{ username }} 回来,{{ message }}</h3></el-col
        >
      </el-row>
    </el-card>
    <!-- 公司产品 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>公司产品</span>
      </div>
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="item in production" :key="item.id">
          <div
            class="productCover"
            :style="{
              backgroundImage: `url(http://localhost:3000${item.cover})`,
            }"
          ></div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      production: [],
    };
  },

  created() {
    this.productGet();
  },

  methods: {
    // 获取产品
    productGet() {
      this.$api.product.productGet().then((result) => {
        if (result.data.message === "ok") {
          this.production = result.data.product;
        }
      });
    },
  },

  computed: {
    // 头像
    avatarUrl() {
      return this.$store.state.userInfo.avatar
        ? "http://localhost:3000" + this.$store.state.userInfo.avatar
        : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    },
    // 用户名
    username() {
      return this.$store.state.userInfo.username;
    },
    // 温馨提示
    message() {
      const time = new Date().getHours();
      return time < 12 ? "每一天都要开心。" : "休息一下吧。";
    },
  },
};
</script>

<style scoped>
/* 隐藏箭头 */
::v-deep .el-icon-back {
  display: none;
}

/* 卡片 */
.box-card {
  margin-top: 40px;
}

::v-deep .el-row {
  display: flex;
  align-items: center;
}

/*  走马灯*/
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.productCover {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
</style>