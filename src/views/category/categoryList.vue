<template>
  <div>
    <el-button icon="el-icon-plus" circle @click="createCategory" />
    <el-table :data="categoryList">
      <el-table-column label="序号" width="50" type="index" />
      <el-table-column prop="name" label="名称" width="120" />
      <el-table-column prop="create_time" label="创建时间" width="300" />
      <el-table-column prop="update_time" label="更新时间" width="120" />
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="1000" />
  </div>
</template>

<script>
export default {
  method: {
    createCategory() {
      this.$prompt('请输入分类名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {

      })
    }
  }
}
</script>

<style>

</style>
