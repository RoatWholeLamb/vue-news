<template>
  <div id="news-edit">
    <!-- 页头 -->
    <el-page-header @back="goBack" content="编辑新闻" title="新闻管理" />
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <Editor @edit="editorChange" :content="ruleForm.content"
      /></el-form-item>
      <el-form-item label="分类" prop="category">
        <el-select v-model="ruleForm.category">
          <el-option label="最新动态" value="1"></el-option>
          <el-option label="典型案例" value="2"></el-option>
          <el-option label="通知公告" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleChange"
        >
          <img v-if="ruleForm.cover" :src="coverUrl" class="cover" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          编辑新闻
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from "@/components/Editor";
export default {
  name: "NewsEdit",
  components: {
    Editor,
  },
  data() {
    return {
      ruleForm: {
        title: "",
        content: "",
        category: "1", //1最新动态，2典型案例，3通知公告
        cover: "",
        isPublish: "0", //0未发布，1已经发布
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        cover: [{ required: true, message: "请上传封面", trigger: "blur" }],
        category: [{ required: true, trigger: "blur" }],
      },
    };
  },

  created() {
    this.handleIdGet();
  },

  computed: {
    // 图片显示
    coverUrl() {
      const url = this.ruleForm.cover;
      return url.includes("blob") ? url : "http://localhost:3000" + url;
    },
  },

  methods: {
    // id获取新闻
    handleIdGet() {
      const id = this.$route.query.id;
      this.$api.news.newsIdGet(id).then((result) => {
        if (result.data.message === "ok") {
          this.ruleForm=result.data.news;
          this.ruleForm.file=null;
        } else {
          this.$message.error("获取新闻失败");
        }
      });
    },
    // 显示封面
    handleChange(file) {
      this.ruleForm.cover = URL.createObjectURL(file.raw);
      this.ruleForm.file = file.raw;
    },
    // 内容
    editorChange(data) {
      this.ruleForm.content = data;
    },
    // 编辑新闻
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.content === "") {
            this.$message.error("请输入新闻内容");
          } else {
            this.$api.news.newsEdit(this.ruleForm).then((result) => {
              if (result.data.message === "ok") {
                this.$router.push("/news-manage/newslist");
              } else {
                this.$message.error("编辑失败");
              }
            });
          }
        }
      });
    },
    // 返回
    goBack() {
      this.$router.push("/news-manage/newslist");
    },
  },
};
</script>

<style scoped>
.el-form {
  margin-top: 50px;
}

/* 封面上传 */
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.cover {
  width: 178px;
  height: 178px;
  display: block;
}
</style>