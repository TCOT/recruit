<template>
    <div class="wrapProjectList">
        <div style="padding-right: 250px">
            <el-card class="aProjectList" v-loading="loading">
                <el-table :data="filterData"
                          class="aProjectTable"
                          style="width: 100%">
                    <el-table-column
                            label="项目名称" width="180">
                        <template slot-scope="scope">
                            <span>{{ scope.row.projectName }}</span>
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
                            <span>{{ scope.row.signUpTime[0] }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="已报名人数">
                        <template slot-scope="scope">
                            <span>{{ scope.row.stuNum }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address" label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" round icon="el-icon-message"
                                       size="medium"
                                       @click="toDetail(scope.$index,scope.row)">详情
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block" style="margin-top: 30px">
                    <el-pagination
                            background
                            :current-page.sync="page"
                            :page-size="5"
                            @current-change="handleCurrentChange"
                            layout="total,prev, pager, next"
                            :total="total">
                    </el-pagination>
                </div>
            </el-card>

            <div style="margin-bottom: 300px">
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        mounted() {
            this.init()
        },
        computed: {
            filterData() {
                let data = [...this.projects]
                this.total = data.length
                this.nextData = [...data]
                data = data.slice((this.page - 1) * 5, this.page * 5)
                return data
            }
        },
        methods: {
            handleCurrentChange(page){
                this.page = page
            },
            async init() {
                this.loading = true
                await axios.get("projects/getAProjects", {}).then((response) => {
                    var res = response.data;
                    if (res.status == "0") {
                        this.projects = res.result.list;
                    }
                })
                this.loading = false
            },
            toDetail(index, row) {
                this.$router.push('/aindex/project/' + row.projectId)
            }
        },
        data() {
            return {
                page:0,
                total:0,
                projects: [],
                loading: true
            }
        }
    }
</script>

<style lang="scss">
    .wrapProjectList {
        .aProjectTable {
            text-align: left;
            height: 351px;
        }
        .aProjectList {
            width: 800px;
            height: 450px;
            margin-top: 100px;
            margin-left: 70px;
        }
    }
</style>