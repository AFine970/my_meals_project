<template>
  <el-dialog title="添加商品信息"
             :visible.sync="isShow"
             @close="handleClose">
    <el-form :model="shopData"
             ref="shopData"
             label-width="100px"
             :rules="rules"
             class="add-page">
      <el-form-item label="商品名称"
                    prop="foodName">
        <el-input v-model="shopData.foodName"></el-input>
      </el-form-item>
      <el-form-item label="商品分类"
                    prop="foodRegion">
        <el-select v-model="shopData.foodRegion">
          <el-option label="人气热销"
                     value="人气热销"></el-option>
          <el-option label="店家推荐"
                     value="店家推荐"></el-option>
          <el-option label="特色硬菜"
                     value="特色硬菜"></el-option>
          <el-option label="新品来袭"
                     value="新品来袭"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格"
                    prop="foodPrice">
        <el-input v-model="shopData.foodPrice"></el-input>
      </el-form-item>

      <el-form-item label="商品图片"
                    prop="imageUrl">
        <el-upload class="avatar-uploader"
                   action="#"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl"
               :src="imageUrl"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-button @click="onSubmit('shopData')">提交</el-button>
    </el-form>
  </el-dialog>
</template>

<script>
import api from '../../Api.js'
export default {
  data() {
    var validatefoodName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('菜名不能为空'))
      } else {
        callback()
      }
    }
    var validatefoodRegion = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择菜品所属的种类'))
      } else {
        callback()
      }
    }
    var validatefoodPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('价格不能为空'))
      } else {
        callback()
      }
    }

    return {
      flag: false,
      isShow: true,
      imageUrl: '',

      shopData: {
        userId: '',
        foodName: '',
        foodRegion: '',
        foodPrice: ''
      },

      rules: {
        foodName: [
          {
            validator: validatefoodName,
            trigger: 'blur'
          }
        ],
        foodRegion: [
          {
            validator: validatefoodRegion,
            trigger: 'blur'
          }
        ],
        foodPrice: [
          {
            validator: validatefoodPrice,
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleClose() {
      this.$emit('close', this.flag)
    },
    onSubmit(shopData) {
      let { username } = this.$store.state
      this.shopData.userId = username
      this.$refs[shopData].validate(valid => {
        if (valid) {
          let bus = this.shopData
          api.submitFoodInfo(bus).then(response => {
            if (response.data.success === true) {
              // window.console.log(response)
              this.$message({
                type: 'success',
                message: '提交成功'
              })
              this.shopData = {}
              this.flag = true
            } else {
              this.$message({
                type: 'warning',
                message: '提交失败'
              })
              return false
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.add-page {
  width: 60%;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
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
