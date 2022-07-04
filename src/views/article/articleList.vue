<template>
  <div>
    <el-table :data="blogList">
      <el-table-column label="序号" width="50" type="index" />
      <el-table-column prop="title" label="标题" width="120" />
      <el-table-column prop="" label="分类" width="120" />
      <el-table-column label="置顶" width="120">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.top" @change="handleChange(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="创建时间" width="300" />
      <el-table-column prop="zip" label="更新时间" width="120" />
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

}
</script>

<style>

</style>
