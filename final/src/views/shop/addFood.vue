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
        <el-upload :action="uploadUrl"
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
const uploadAPI = '/api/uploadImg'

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
      uploadUrl: uploadAPI,

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
    handleClose() {
      this.$emit('close', this.flag)
    },
    onSubmit(shopData) {
      let { username } = this.$store.state
      this.shopData.userId = username

      this.$refs[shopData].validate(valid => {
        if (valid) {
          if (!this.imageUrl) {
            this.$message({
              type: 'error',
              message: '请上传图片'
            })
          } else {
            let bus = Object.assign(this.shopData, { imageUrl: this.imageUrl })
            console.log(bus)
            api.submitFoodInfo(bus).then(response => {
              if (response.data.success === true) {
                this.$message({
                  type: 'success',
                  message: '提交成功'
                })
                this.shopData = {}
                this.imageUrl = ''
                this.flag = true
              } else {
                this.$message({
                  type: 'warning',
                  message: '提交失败'
                })
                return false
              }
            })
          }
        } else {
          return false
        }
      })
    },
    handleAvatarSuccess(res) {
      // this.imageUrl = URL.createObjectURL(res.data.imageUrl)
      // console.log(res)
      this.imageUrl = res.data.imageUrl
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpg/png 格式')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
.add-page {
  width: 50%;
  margin: 0 auto;
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
