<template>
  <div class="shop-info">
    <h3>店铺信息</h3>
    <el-form ref="shopData"
             :model="shopData"
             :rules="rules"
             :disabled="disabled">
      <el-form-item label="店铺名称"
                    prop="companyName">
        <el-input v-model.trim="shopData.companyName"
                  type="text"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="店铺电话"
                    prop="companyPhone">
        <el-input v-model.trim="shopData.companyPhone"
                  maxlength="11"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="店铺地址"
                    prop="companyAddress">
        <el-input v-model.trim="shopData.companyAddress"
                  type="text"
                  maxlength="60"
                  clearable>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button v-if="noInfo"
               @click="onSave('shopData')"
               :disabled="disabled"
               type="primary">保存</el-button>
    <div v-else>
      <el-button @click="onChange('shopData')"
                 :disabled="disabled"
                 type="primary">更改</el-button>
      <el-button @click="editable"><i class="el-icon-edit"></i></el-button>
    </div>
  </div>
</template>
<script>
import api from '../../Api.js'
export default {
  data() {
    var validatecompanyName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('店铺名不能为空'))
      } else {
        callback()
      }
    }
    var validatecompanyPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('店铺电话不能为空'))
      }
      setTimeout(() => {
        if (!/^1[345678]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的电话号码'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validatecompanyAddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('店铺描述不能为空'))
      } else {
        callback()
      }
    }

    return {
      disabled: false,
      noInfo: '',
      shopData: {
        userId: '',
        companyName: '',
        companyPhone: '',
        companyAddress: ''
      },
      rules: {
        companyName: [
          {
            validator: validatecompanyName,
            trigger: 'blur'
          }
        ],
        companyPhone: [
          {
            validator: validatecompanyPhone,
            trigger: 'blur'
          }
        ],
        companyAddress: [
          {
            validator: validatecompanyAddress,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.loadData()
  },

  methods: {
    onSave(shopData) {
      this.$refs[shopData].validate(valid => {
        if (valid) {
          let bus = this.shopData
          api.submitShopInfo(bus).then(response => {
            if (response.data.success === true) {
              this.$message({
                type: 'success',
                message: '保存成功'
              })
              this.disabled = true
              // this.$store.dispatch('IdEncode')
            } else {
              this.$message({
                type: 'warning',
                message: '保存失败'
              })
              return false
            }
          })
        } else {
          return false
        }
      })
    },

    editable() {
      this.$confirm('是否确定修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.disabled = false
        })
        .catch(err => {
          this.$message(err)
        })
    },

    onChange(shopData) {
      this.$refs[shopData].validate(valid => {
        if (valid) {
          let bus = this.shopData
          api.modifyShopInfo(bus).then(response => {
            if (response.data.success === true) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.disabled = true
            } else {
              this.$message({
                type: 'warning',
                message: '修改失败'
              })
              return false
            }
          })
        } else {
          return false
        }
      })
    },
    // 调取对应的接口，对这个用户之前是否有填写有信息,进行判断
    // 有数据，则为不可编辑  无数据，则为可编辑
    loadData() {
      let { username } = this.$store.state
      this.shopData.userId = username

      api.getShopInfo({ username }).then(response => {
        // window.console.log(response.data.code)
        let status = response.data.code
        if (status === 401) {
          this.$router.push('/noauth')
          this.$store.dispatch('UserLogout')
        } else if (response.data.success === true) {
          this.disabled = true
          this.noInfo = false
          this.shopData = response.data.result
        } else {
          this.noInfo = true
        }
      })
    }
  }
}
</script>
<style scoped>
.shop-info {
  width: 30%;
  margin: 0 auto;
}
</style>

