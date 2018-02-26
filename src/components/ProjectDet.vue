<template>
    <div style="padding-right: 250px;padding-top: 30px;padding-left: 30px">
        <el-card class="box-card" style="text-align: left">
            <el-table :data="projects"
                      style="width: 100%">
                <el-table-column
                        label="项目名称" width="180">
                    <template slot-scope="scope">
                        <span>{{ scope.row.releaseTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="发布人" width="180">
                    <template slot-scope="scope">
                        <span>{{ scope.row.publisher }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="发布日期">
                    <template slot-scope="scope">
                        <span>{{ scope.row.projectName }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="已报名人数">
                    <template slot-scope="scope">
                        <span>{{ scope.row.projectName }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" plain icon="el-icon-message"
                                   @click="toDetail(scope.$index,scope.row)">查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        mounted() {
            this.init()
        },
        methods: {
            init() {
                axios.get("projects/getAProjects", {}).then((response) => {
                    var res = response.data;
                    console.log(res.result.list)
                    if (res.status == "0") {
                        this.projects = res.result.list;
                    }
                })
            },
            toDetail(index, row) {
                // alert(index)
                // alert(this.projects[index].projectId)
                this.$store.commit("updateSelection", 4)
                var param = {
                    projectId : this.projects[index].projectId
                }
                axios.get('/projects/getContent', {
                    params:param
                }).then((response) => {
                    var res = response.data;
                    console.log(res)
                    if (res.status == "0") {
                        this.$store.commit("updateProject", res.result.project)
                    }
                })
            }
        },
        data() {
            return {
                projects: []
            }
        }
    }
</script>

<style>
    .el-tabs__item{
        font-size: 16px;
    }
    .el-card__body   {
        text-align: left;
    }
</style>