<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="formRules" label-position="top">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文章图片" prop="cover">
            <el-input v-model="form.cover" placeholder="请输入标题" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="文章简述" prop="description">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item label="文章正文" prop="content">
        <el-input v-model="form.content" />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="分类" prop="category">
            <el-select v-model="form.category" placeholder="请选择分类（输入可添加新分类）" :allow-create="true" :filterable="true" style="width: 100%;">
              <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标签" prop="tagList">
            <el-select v-model="form.tagList" placeholder="请选择标签（输入可添加新标签）" :allow-create="true" :filterable="true" :multiple="true" style="width: 100%;">
              <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="text-align: right;">
        <el-button type="primary" @click="dialogVisible=true">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createArticle } from '@/api/blog'
export default {
  name: 'WriteBlog',
  data() {
    return {
      form: {
        title: '',
        cover: '',
        description: '',
        content: '',
        category: '',
        tagList: [],
        top: false,
        recommend: false
      },
      formRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'change' }],
        cover: [{ required: true, message: '请输入首图链接', trigger: 'change' }],
        category: [{ required: true, message: '请选择分类', trigger: 'change' }],
        tagList: [{ required: true, message: '请选择标签', trigger: 'change' }]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.formRules.validate(valid => {
        if (valid) {
          createArticle(this.form).then(res => {
            this.msgSuccess(res.msg)
            this.$router.push('/blog/list')
          })
        } else {
          return this.msgError('请填写必要的表单项')
        }
      })
    }
  }

}
</script>

<style>

</style>
