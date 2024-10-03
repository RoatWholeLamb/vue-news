<template>
  <div id="news-list">
    <el-card>
      <!-- 页头 -->
      <el-page-header content="新闻管理" title="新闻列表" class="page-header" />
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="category" label="分类">
          <template slot-scope="scope">
            <template v-if="scope.row.category === 1">最新动态</template>
            <template v-else-if="scope.row.category === 2">经典案例</template>
            <template v-else>通知公告</template>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="更新时间">
          <template slot-scope="scope">
            <template>{{ time.formatTime(scope.row.createTime) }}</template>
          </template>
        </el-table-column>
        <el-table-column prop="isPublish" label="发布状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isPublish"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="handlePublish(scope.$index, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="el-icon-star-off"
              circle
              @click="showNews(scope.row)"
            ></el-button>
            <el-button
              type="primary"
              circle
              @click="handleEdit(scope.row.id)"
              icon="el-icon-edit"
            ></el-button>
            <el-popconfirm
              @confirm="handleDelete(scope.row.id)"
              title="确定要删除吗？"
            >
              <template slot="reference">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 对话框 -->
    <el-dialog
      title="预览新闻"
      v-model="ruleForm"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form status-icon label-width="80px" class="demo-ruleForm">
        <div>
          <h2>{{ ruleForm.title }}</h2>
          <div class="formatTime">
            {{ time.formatTime(ruleForm.createTime) }}
          </div>
          <el-divider><i class="el-icon-caret-bottom"></i></el-divider>
          <div v-html="ruleForm.content"></div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import time from "@/utils/format";
export default {
  name: "NewsList",

  data() {
    return {
      tableData: [],
      dialogVisible: false,
      ruleForm: {},
    };
  },

  created() {
    this.newsGet();
  },

  methods: {
    // 获取新闻
    newsGet() {
      this.$api.news.newsGet().then((result) => {
        if (result.data.message === "ok") {
          this.tableData = result.data.news;
        } else {
          this.$message.error("获取新闻失败");
        }
      });
    },
    //  更新发布状态
    handlePublish(index, data) {
      console.log(data);
      this.$api.news.newsPublish(data.id, data.isPublish).then((result) => {
        if (result.data.message === "ok") {
          this.$message({
            message: "更新成功",
            type: "success",
          });
          // 更新数据
          this.tableData[index].isPublish = result.data.newNews.isPublish;
          this.tableData[index].createTime = result.data.newNews.time;
        } else {
          this.$message.error("更新失败");
        }
      });
    },
    // 预览
    showNews(news) {
      this.dialogVisible = true;
      this.ruleForm = news;
    },
    // 编辑
    handleEdit(id) {
      this.$router.push({
        name:'NewsEdit',
        query:{
          id
        }
      })
    },
    // 删除
    handleDelete(id) {
       this.$api.news.newsDel(id).then((result) => {
        if (result.data.message === "ok") {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 刷新数据
          this.newsGet();
        } else {
          this.$message.error('删除失败!');
        }
      });
    },
  },
  // 格式化时间
  computed: {
    time() {
      return time;
    },
  },
};
</script>

<style scoped>
/* 隐藏箭头 */
::v-deep .el-icon-back {
  display: none;
}

.page-header {
  margin-bottom: 20px;
}

::v-deep .el-button + .el-button,
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin: 0 5px;
}

/* 时间显示 */
.formatTime {
  font-size: 12px;
  color: gray;
}

::v-deep .demo-ruleForm img{
  width: 100%;
}
</style>