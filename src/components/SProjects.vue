<template>
    <div class="wrapSProjects">
        <div style="padding-right: 250px">
            <el-card class="allProjectCard">
                <el-table v-loading="loading"
                          :data="projects"
                          style="width: 100%"
                          class="listProjectTable">
                    <el-table-column
                            label="发布日期" width="180">
                        <template slot-scope="scope">
                            <span>{{ scope.row.signUpTime[0] }}</span>
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
                    <el-table-column
                                     label="状态">
                        <template slot-scope="scope">
                            <i v-if="scope.row.exceed" class="el-icon-time"
                               style="font-size: 25px;color: #F56C6C"></i>
                            <i v-else-if="scope.row.status == '未审核' " class="el-icon-question"
                               style="font-size: 25px;color: #409EFF"></i>
                            <i v-else-if="scope.row.status == '已通过' " class="el-icon-circle-check"
                               style="font-size: 25px;color: #67c23a;"></i>
                            <i v-else-if="scope.row.status == '已拒绝' " class="el-icon-circle-close"
                               style="font-size: 25px;color: #f56c6c"></i>
                            <i v-else-if="scope.row.status == '' " class="el-icon-edit" style="font-size: 25px"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <div style="margin-bottom: 300px"></div>
        </div>
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
                this.loading = true
                let year = new Date().getFullYear()
                let month = new Date().getMonth() + 1
                let day = new Date().getDate()
                this.time = year.toString() + month.toString() + day.toString()
                axios.get("projects/getProjects", {
                    params: {
                        userName: this.$store.state.nickName
                    }
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "0") {
                        this.projects = res.result.projects;
                    }
                    for(let project of this.projects){
                        if (this.time <= project.signUpTime[1].replace(/-/g, '')) {
                            project.exceed = false
                        } else {
                            project.exceed = true
                        }
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
                time:'',
                projects: [],
                loading: true,
                hidden: false
            }
        }
    }
</script>

<style lang="scss">
    .wrapSProjects {
        .el-badge__content.is-fixed {
            margin-right: 13px;
            margin-top: 10px;
        }

        .el-badge__content.is-fixed.is-dot {
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
    }
</style>