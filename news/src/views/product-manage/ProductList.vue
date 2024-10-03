<template>
  <div id="product-list">
    <el-card>
      <!-- 页头 -->
      <el-page-header content="产品管理" title="产品列表" class="page-header" />
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="productname" label="产品名"> </el-table-column>
        <el-table-column prop="simple" label="简单描述"> </el-table-column>
        <el-table-column prop="createTime" label="更新时间">
          <template slot-scope="scope">
            <template>{{ time.formatTime(scope.row.createTime) }}</template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              circle
              @click="handleEdit(scope.row)"
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
    <el-dialog title="编辑产品" :visible.sync="dialogVisible" width="50%">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="产品名" prop="productname">
          <el-input
            type="text"
            v-model="ruleForm.productname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="简单描述" prop="simple">
          <el-input
            type="text"
            v-model="ruleForm.simple"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细描述" prop="complex">
          <el-input
            type="textarea"
            v-model="ruleForm.complex"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleChange"
          >
            <img v-if="ruleForm.cover" :src="coverUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">
            更新产品
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import time from "@/utils/format";
export default {
  name: "ProductList",

  data() {
    return {
      tableData: [],
      dialogVisible: false,
      ruleForm: {
        productname: "",
        simple: "",
        complex: "",
        cover: "",
      },
      rules: {
        productname: [
          { required: true, message: "请输入产品名", trigger: "blur" },
        ],
        simple: [
          { required: true, message: "请输入简单描述", trigger: "blur" },
        ],
        complex: [
          { required: true, message: "请输入详细描述", trigger: "blur" },
        ],
        cover: [{ required: true, message: "请上传图片", trigger: "blur" }],
      },
    };
  },

  mounted() {
    this.productGet();
  },

  methods: {
    // 获取产品
    productGet() {
      this.$api.product.productGet().then((result) => {
        if (result.data.message === "ok") {
          this.tableData = result.data.product;
        } else {
          this.$message.error("获取产品失败");
        }
      });
    },
    // 打开编辑框
    handleEdit(row) {
      this.dialogVisible = true;
      this.ruleForm = row;
      this.ruleForm.file=null;
    },
    // 显示图片
    handleChange(file) {
      this.ruleForm.cover = URL.createObjectURL(file.raw);
      this.ruleForm.file = file.raw;
    },
    // 更新产品
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          this.$api.product.productEdit(this.ruleForm).then((result) => {
            if (result.data.message === "ok") {
              this.$message({
                type: "success",
                message: "更新成功!",
              });
              this.dialogVisible = false;
              // 刷新数据
              this.productGet();
            } else {
              this.$message.error("编辑失败");
            }
          });
        }
      });
    },
    // 删除
    handleDelete(id) {
      this.$api.product.productDel(id).then((result) => {
        if (result.data.message === "ok") {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 刷新数据
          this.productGet();
        } else {
          this.$message.error("删除失败!");
        }
      });
    },
  },
  computed: {
    // 格式化时间
    time() {
      return time;
    },
    // 显示产品封面
    coverUrl() {
      const url = this.ruleForm.cover;
      return url.includes("blob") ? url : "http://localhost:3000" + url;
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

::v-deep .el-button--primary {
  margin-right: 5px;
}

/* 时间显示 */
.formatTime {
  font-size: 12px;
  color: gray;
}

/* 图片上传 */
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>