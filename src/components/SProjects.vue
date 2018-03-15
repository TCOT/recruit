<template>
    <div style="padding-right: 250px">
        <el-card class="allProjectCard">
            <el-table v-loading="loading"
                      :data="projects"
                      style="width: 100%"
                      class="listProjectTable">
                <el-table-column
                        label="发布日期" width="180">
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
                        <el-badge is-dot :hidden="!scope.row.draftStatus">
                            <el-button type="primary" icon="el-icon-message"
                                       @click="toDetail(scope.$index,scope.row)">详情
                            </el-button>
                        </el-badge>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <div style="margin-bottom: 300px"></div>
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
                axios.get("projects/getProjects", {
                    params:{
                        userName: this.$store.state.nickName
                    }
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "0") {
                        this.projects = res.result.projects;
                    }
                    this.loading = false
                })
            },
            toDetail(index, row) {
                this.$router.push("/sindex/sprojects/" + row.projectId)
            }
        },
        data() {
            return {
                projects: [],
                loading: true,
                hidden:false
            }
        }
    }
</script>

<style>
    .el-badge__content.is-fixed{
        margin-right: 13px;
        margin-top: 10px;
    }
    .el-badge__content.is-fixed.is-dot{
        margin-right: 10px;
        margin-top: 10px;
        border: none;
    }
    .listProjectTable {
        text-align: left;
    }

    .allProjectCard {
        width: 800px;
        height: 400px;
        margin-top: 100px;
        margin-left: 70px;
    }
</style>