<template>
    <div style="padding-right: 250px">
        <el-card class="allProjectCard">
            <el-table   v-loading="loading"
                    :data="projects"
                      style="width: 100%"
            class="listProjectTable">
                <el-table-column
                        label="发布日期" width="180" >
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
                        label="项目名称">
                    <template slot-scope="scope">
                        <span>{{ scope.row.projectName }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary"  icon="el-icon-message"
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
                axios.get("projects/getProjects", {}).then((response) => {
                    var res = response.data;
                    if (res.status == "0") {
                        this.projects = res.result.list;
                    }
                    this.loading=false
                })
            },
            toDetail(index,row) {
                axios.get('/projects/getContent', {
                    params:{
                        projectId : row.projectId
                    }
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "0") {
                        console.log(res.result.project.projectId)
                        this.$router.push("/sindex/sprojects/" + res.result.project.projectId)
                    }
                })
            }
        },
        data() {
            return {
                projects: [],
                loading:true
            }
        }
    }
</script>

<style>
    .listProjectTable{
        text-align: left;
    }
    .allProjectCard{
        width: 800px;
        height: 400px;
        margin-top: 100px;
        margin-left: 70px;
    }
</style>