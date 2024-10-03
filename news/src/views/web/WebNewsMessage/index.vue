<template>
  <div id="web-news-message">
    <!-- 左侧 -->
    <el-row>
      <el-col :span="18">
        <div>
          <h2>{{ news.title }}</h2>
          <span :style="{ color: 'gray', fontSize: '12px' }">{{
            time.formatTime(news.createTime)
          }}</span>
        </div>
        <el-divider><i class="el-icon-caret-bottom"></i></el-divider>
        <div v-html="news.content"></div>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '20px' }">
          <h4 :style="{marginBottom:'10px'}">最近新闻</h4>
          <div
            @click="toNewsMessage(item.id)"
            class="card-news"
            v-for="item in newsList"
            :key="item.id"
          >
          <div>{{ item.title }}</div>
          <span :style="{ color: 'gray', fontSize: '12px' }">{{
            time.formatTime(item.createTime)
          }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 右侧 -->
  </div>
</template>

<script>
import time from "@/utils/format";
export default {
  name: "WebNewsMessage",

  data() {
    return {
      news: {},
      newsList: [],
    };
  },

  created() {
    this.getNearNews();
    this.idGetNews(this.id);
  },
  watch: {
    id(newValue,oldValue) {
      this.idGetNews(newValue);
    },
  },

  methods: {
    // 获取当前新闻
    idGetNews(id) {
      this.$api.news.webNewsIdGet(id).then((result) => {
        if (result.data.message === "ok") {
          this.news = result.data.news;
        } else {
          this.$message.error("获取新闻失败");
        }
      });
    },
    // 获取最近的新闻
    getNearNews() {
      this.$api.news.webNewsGet().then((result) => {
        if (result.data.message === "ok") {
          this.newsList = result.data.news.slice(0, 4);
        } else {
          this.$message.error("获取新闻失败");
        }
      });
    },
    // 显示相应新闻内容
    toNewsMessage(id) {
      this.$router.push({
        name: "WebNewsMessage",
        query: {
          id,
        },
      });
    },
  },
  computed: {
    // 格式化时间
    time() {
      return time;
    },
    // id
    id(){
      return this.$route.query.id;
    }
  },
};
</script>

<style scoped>
.el-row {
  margin-top: 50px;
  padding: 0 100px;
}

.card-news {
  padding: 10px;
  cursor: pointer;
}
.card-news:hover {
  color: red;
}
</style>