<template>
  <div class="app-container">
    <el-form ref="formRef" :model="form" :rules="formRules" label-position="top">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="文章简述" prop="description">
        <v-md-editor v-model="form.description" height="200px" />
      </el-form-item>
      <el-form-item label="文章正文" prop="content">
        <v-md-editor v-model="form.content" height="400px" />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="分类" prop="category">
            <el-select v-model="form.category_id" placeholder="请选择分类（输入可添加新分类）" :allow-create="true" :filterable="true" style="width: 100%;">
              <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="text-align: right;">
        <el-button class="button-nomal" type="primary" @click="submit()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createArticle, getArticleDetail, updateArticle } from '@/api/article'
import { getCategoryList } from '@/api/category'
export default {
  name: 'WriteArticle',
  data() {
    return {
      queryInfo: {
        page_num: 1,
        page_size: 10
      },
      categoryList: {},
      form: {
        id: 0,
        title: '',
        description: '',
        content: '',
        category_id: '',
        is_top: false,
        is_comment: false
      },
      formRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'change' }],
        category_id: [{ required: true, message: '请选择分类', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getCategory()
    if (this.$route.params.id) {
      this.getArticle(this.$route.params.id)
    }
  },
  methods: {
    submit() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          if (this.$route.params.id) {
            updateArticle(this.form).then(res => {
              if (res.success) {
                this.msgSuccess(res.status_message)
                this.$router.push('/article/list')
              } else {
                this.msgError(res.status_message)
              }
            }).catch(() => {
              this.msgError('请求失败')
            })
          } else {
            createArticle(this.form).then(res => {
              if (res.success) {
                this.msgSuccess(res.status_message)
                this.$router.push('/article/list')
              } else {
                this.msgError(res.status_message)
              }
            }).catch(() => {
              this.msgError('请求失败')
            })
          }
        } else {
          return this.msgError('请填写必要的表单项')
        }
      })
    },
    getArticle(id) {
      getArticleDetail(id).then((res) => {
        if (res.success) {
          this.msgSuccess(res.status_message)
          this.form = res.data
        } else {
          this.msgError(res.status_message)
        }
      }).catch(() => {
        this.msgError('请求失败')
      })
    },
    getCategory() {
      getCategoryList(this.queryInfo).then((res) => {
        if (res.success) {
          this.categoryList = res.data
        } else {
          this.msgError(res.status_message)
        }
      }).catch(() => {
        this.msgError('请求失败')
      })
    }
  }

}
</script>

<style>

</style>
