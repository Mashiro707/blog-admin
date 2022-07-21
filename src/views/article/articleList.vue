<template>
  <div class="app-container">
    <el-table :data="articleList">
      <el-table-column label="序号" type="index" fixed />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="category_name" label="分类" />
      <el-table-column label="置顶">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.is_top" @change="handleChange(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="评论">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.is_comment" @change="handleChange(scope.row)" />
        </template>
      </el-table-column>
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
          <el-button class="button-nomal" type="primary" icon="el-icon-edit" size="mini" @click="pushUpdateArticle(scope.row.id)">编辑</el-button>
          <el-popconfirm
            title="确定删除吗？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-delete"
            icon-color="red"
            @onConfirm="deleteArticle(scope.row.id)"
          >
            <el-button slot="reference" class="button-nomal" size="mini" type="danger" icon="el-icon-delete">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
import { getArticleList, deleteArticle, updateArticle } from '@/api/article'
export default {
  data() {
    return {
      queryInfo: {
        page_num: 1,
        page_size: 10
      },
      total: 0,
      articleList: []
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    getArticle() {
      getArticleList(this.queryInfo).then((res) => {
        if (res.success) {
          this.articleList = res.data
        } else {
          this.msgError(res.status_message)
        }
      }).catch(() => {
        this.msgError('请求失败')
      })
    },
    handleChange(form) {
      updateArticle(form).then((res) => {
        if (res.success) {
          this.msgSuccess(res.status_message)
        } else {
          this.msgError(res.status_message)
        }
      }).catch(() => {
        this.msgError('请求失败')
      })
    },
    pushUpdateArticle(id) {
      this.$router.push(`update/${id}`)
    },
    deleteArticle(id) {
      deleteArticle(id).then(res => {
        if (res.success) {
          this.msgSuccess(res.status_message)
          this.getArticle()
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
      this.getArticle()
    },
    // 监听页码改变事件
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val
      this.getArticle()
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
