<template>
  <div id="news">
    <div class="news-img"></div>
    <!-- 搜索框 -->
    <div class="news-search">
      <el-popover
        popper-class="search-result"
        placement="bottom"
        title="搜索结果"
        trigger="click"
      >
        <el-input
          slot="reference"
          v-model="searchInput"
          size="medium"
          type="text"
          placeholder="请输入内容"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <template v-if="searchNews.length">
          <div
            class="search-news-item"
            v-for="item in searchNews"
            :key="item.id"
          >
            {{ item.title }}
          </div>
        </template>
        <div v-else>
          <el-empty :image-size="60" description="暂无数据"></el-empty>
        </div>
      </el-popover>
    </div>
    <!-- 部分新闻列表展示 -->
    <div class="news-list">
      <el-row :gutter="20">
        <el-col @click.native="toNewsMessage(item.id)" :style="{cursor: 'pointer'}" v-for="item in newsList" :key="item.id" :span="6">
          <el-card  shadow="hover" :body-style="{ padding: '0px' }">
            <div
              class="news-list-img"
              :style="{
                backgroundImage: `url(http://localhost:3000${item.cover})`,
              }"
            ></div>
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
              <div class="bottom clearfix">
                <time class="time">{{ time.formatTime(item.createTime) }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 新闻分类展示 -->
    <div class="news-sort">
      <el-tabs v-model="sortIndex">
        <el-tab-pane
          v-for="item in table"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        >
          <el-row :gutter="20">
            <el-col :span="18">
              <!-- 新闻卡片 -->
              <div
                style="padding: 10px 0"
                v-for="data in newsSort[item.name]"
                :key="data.id"
                @click="toNewsMessage(data.id)"
              >
                <el-card  shadow="hover" class="box-card">
                  <div
                    class="news-sort-img"
                    :style="{
                      backgroundImage: `url(http://localhost:3000${data.cover})`,
                      float: 'left',
                    }"
                  ></div>
                  <div style="padding: 14px; float: left">
                    <span>{{ data.title }}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{
                        time.formatTime(data.createTime)
                      }}</time>
                    </div>
                  </div>
                </el-card>
              </div>
            </el-col>
            <!-- 时间线 -->
            <el-col :span="6">
              <div class="news-list-time">
                <el-timeline>
                  <el-timeline-item
                    v-for="activity in newsSort[item.name]"
                    :key="activity.id"
                    :timestamp="activity.title"
                  >
                    {{ time.formatTime(activity.createTime) }}
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import time from "@/utils/format";
export default {
  name: "WebNews",

  data() {
    return {
      searchInput: "", //输入内容
      news: [], //所有发布新闻
      newsList: [], //搜索新闻
      sortIndex: "1",
      table: [
        {
          name: "1",
          label: "最新动态",
        },
        {
          name: "2",
          label: "典型案例",
        },
        {
          name: "3",
          label: "通知公告",
        },
      ],
    };
  },

  computed: {
    // 新闻搜索结果
    searchNews() {
      const result = this.news.filter((item) => {
        if (this.searchInput === "") {
          return null;
        }
        return item.title.includes(this.searchInput);
      });
      return result;
    },
    // 时间格式化
    time() {
      return time;
    },
    // 新闻分类
    newsSort() {
      const result = {};
      this.news.forEach((item) => {
        let category = item.category;
        if (!result[category]) {
          result[category] = [];
        }
        result[category].push(item);
      });
      return result;
    },
  },

  created() {
    this.getNews();
  },

  methods: {
    // 获取新闻
    getNews() {
      this.$api.news.webNewsGet().then((result) => {
        if (result.data.message === "ok") {
          this.news = result.data.news;
          this.newsList = result.data.news.slice(0, 4);
        } else {
          this.$message.error("获取新闻失败");
        }
      });
    },
    // 显示新闻内容
    toNewsMessage(id){
      this.$router.push({
        name:'WebNewsMessage',
        query:{
          id
        }
      })
    }
  },
};
</script>

<style scoped>
#news {
  position: relative;
}
/* 图片 */
.news-img {
  width: 100%;
  height: 500px;
  background-image: url("@/assets/newsImg.jpg");
  background-size: 100% 100%;
}

/* 搜索框 */
.news-search {
  width: 100%;
  position: absolute;
  top: 360px;
  text-align: center;
}

.el-input {
  width: 50%;
}

/* 空状态 */
.el-empty {
  height: 150px;
}

/* 搜索内容 */
.search-news-item {
  height: 50px;
  line-height: 50px;
}
.search-news-item:hover {
  color: red;
}

/* 新闻列表 */
.news-list {
  width: 100%;
  margin: 30px 0;
}

.news-list-img {
  width: 100%;
  height: 180px;
  background-size: 100% 100%;
}

.time {
  font-size: 13px;
  color: gray;
}

.el-row {
  margin: 0 !important;
}

/* 新闻分类 */
.news-sort {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.text {
  font-size: 14px;
}

.box-card {
  width: 75%;
  padding-bottom: 20px;
  cursor: pointer;
}
.news-sort-img {
  width: 150px;
  height: 100px;
  background-size: 100% 100%;
}
.news-list-time{
 margin-top: 20px;
}
</style>