<template>
  <div class="app-container">
    <!--添加-->
    <el-row :gutter="10">
      <el-col :span="6">
        <el-button type="primary" class="button-nomal" size="small" icon="el-icon-plus" @click="addDialogVisible=true">添加分类</el-button>
      </el-col>
    </el-row>

    <el-table :data="categoryList">
      <el-table-column label="序号" type="index" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="create_time" label="创建时间">
        <template v-slot="scope">
          {{ scope.row.create_time | dateFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间">
        <template v-slot="scope">
          {{ scope.row.update_time | dateFilter }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template v-slot="scope">
          <el-button class="button-nomal" type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
          <el-popconfirm
            title="确定删除吗？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-delete"
            icon-color="red"
            @onConfirm="deleteCategory(scope.row.id)"
          >
            <el-button slot="reference" class="button-nomal" size="mini" type="danger" icon="el-icon-delete">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      class="pagination"
      :current-page="queryInfo.pageNum"
      :page-sizes="[10, 50, 100, 200]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :hide-on-single-page="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!--添加分类对话框-->
    <el-dialog title="添加类别" width="50%" :visible.sync="addDialogVisible" :close-on-click-modal="false" @close="createDialogClosed">
      <!--内容主体-->
      <el-form ref="createFormRef" :model="createForm" :rules="formRules" label-width="80px">
        <el-form-item label="类别名称" prop="name">
          <el-input v-model="createForm.name" />
        </el-form-item>
      </el-form>
      <!--底部-->
      <span slot="footer">
        <el-button class="button-nomal" @click="addDialogVisible=false">取 消</el-button>
        <el-button class="button-nomal" type="primary" @click="createCategorySubmit()">确 定</el-button>
      </span>
    </el-dialog>

    <!--编辑分类对话框-->
    <el-dialog title="编辑类别" width="50%" :visible.sync="editDialogVisible" :close-on-click-modal="false" @close="updateDialogClosed">
      <!--内容主体-->
      <el-form ref="updateFormRef" :model="updateForm" :rules="formRules" label-width="80px">
        <el-form-item label="类别名称" prop="name">
          <el-input v-model="updateForm.name" />
        </el-form-item>
      </el-form>
      <!--底部-->
      <span slot="footer">
        <el-button class="button-nomal" @click="editDialogVisible=false">取 消</el-button>
        <el-button class="button-nomal" type="primary" @click="updateCategory()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategoryList, createCategory, updateCategory, deleteCategory } from '@/api/category'
export default {
  data() {
    return {
      queryInfo: {
        page_num: 1,
        page_size: 10
      },
      total: 0,
      categoryList: [],
      addDialogVisible: false,
      editDialogVisible: false,
      createForm: {
        name: ''
      },
      updateForm: {},
      formRules: {
        name: [{ required: true, message: '请输入类别名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    getCategoryList() {
      getCategoryList(this.queryInfo).then((res) => {
        if (res.success) {
          this.categoryList = res.data
        } else {
          this.msgError(res.status_message)
        }
      }).catch(() => {
        this.msgError('请求失败')
      })
    },
    // 监听 pageSize 改变事件
    handleSizeChange(val) {
      this.queryInfo.pageSize = val
      this.getCategoryList()
    },
    // 监听页码改变事件
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val
      this.getCategoryList()
    },
    createDialogClosed() {
      this.$refs.createFormRef.resetFields()
    },
    updateDialogClosed() {
      this.updateForm = {}
      this.$refs.updateFormRef.resetFields()
    },
    createCategorySubmit() {
      this.$refs.createFormRef.validate(valid => {
        if (valid) {
          createCategory(this.createForm).then(res => {
            if (res.success) {
              this.msgSuccess(res.status_message)
              this.addDialogVisible = false
              this.getCategoryList()
            } else {
              this.msgError(res.status_message)
            }
          }).catch(() => {
            this.msgError('请求失败')
          })
        }
      })
    },
    showEditDialog(row) {
    // row 中没有对象(blogs是表单不需要的属性)，直接拓展运算符深拷贝一份(拓展运算符不能深拷贝对象，只能拷贝引用)
    // 如果直接赋值，则为引用，表格上的数据也会随对话框中数据的修改而实时改变
      this.updateForm = { ...row }
      this.editDialogVisible = true
    },
    updateCategory() {
      this.$refs.updateFormRef.validate(valid => {
        if (valid) {
          updateCategory(this.updateForm).then(res => {
            if (res.success) {
              this.msgSuccess(res.status_message)
              this.editDialogVisible = false
              this.getCategoryList()
            } else {
              this.msgError(res.status_message)
            }
          }).catch(() => {
            this.msgError('请求失败')
          })
        }
      })
    },
    deleteCategory(id) {
      deleteCategory(id).then(res => {
        if (res.success) {
          this.msgSuccess(res.status_message)
          this.getCategoryList()
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

<style lang="scss" scoped>

.pagination{
  padding: 10px;
  text-align: center;
}
</style>
