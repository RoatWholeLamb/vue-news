<template>
  <div id='product-add'>
    <!-- 页头 -->
    <el-page-header content="产品管理" title="添加产品" />
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="产品名" prop="productname">
        <el-input v-model="ruleForm.productname"></el-input>
      </el-form-item>
      <el-form-item label="简单描述" prop="simple">
        <el-input v-model="ruleForm.simple" ></el-input>
      </el-form-item>
      <el-form-item label="详细描述" prop="complex">
        <el-input  type="textarea" v-model="ruleForm.complex" ></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleChange"
        >
          <img v-if="ruleForm.cover" :src="ruleForm.cover" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          添加
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ProductAdd',

  data() {
    return {
      ruleForm: {
        productname: "",
        simple: "",
        complex:'',
        cover: "",
        file: null,
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
    
  },

  methods: {
    // 显示图片
    handleChange(file) {
      this.ruleForm.cover = URL.createObjectURL(file.raw);
      this.ruleForm.file = file.raw;
    },
    // 添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送数据
          this.$api.product.productAdd(this.ruleForm).then((result) => {
            if (result.data.message === "ok") {
              this.$router.push('/product-manage/productlist')
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
/* 隐藏箭头 */
::v-deep .el-icon-back {
  display: none;
}

.demo-ruleForm {
  margin-top: 50px;
}

/* 头像上传 */
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