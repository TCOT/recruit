<template>
    <div>
        <el-table
                style="width: 100%" v-loading="loading">
            <el-table-column
                    label="学号"
                    width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="姓名"
                    width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">

                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data(){
          return{
              loading: true
          }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.loading = true
                let param = {
                    projectId: this.$route.params.projectId
                }
                axios.get('/projects/getSignUpStu', {
                    params: param
                }).then((response) => {
                    let res = response.data;
                    if (res.status == "0") {
                        // this.loading = false
                    }
                })
            }
        }
    }
</script>

<style>

</style>