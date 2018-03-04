<template>
    <div>
        <el-card class="signInfoCard">
            <el-table :data="projects5" class="siGnInfoTable"
                      v-loading="loading">
                <el-table-column
                        label="已报名项目"
                        width="300">
                    <template slot-scope="scope">
                        <span>{{ scope.row.projectName }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="报名时间"
                        width="300">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sigInTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="审核状态">
                    <template slot-scope="scope">
                        <span>{{ scope.row.checked }}</span>
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
        data() {
            return {
                projects5: [],
                loading:true
            }
        },
        methods: {
            init() {
                axios.get("/users/getInfo", {
                    params: {
                        userName: this.$store.state.nickName
                    }
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "0") {
                        this.projects5 = res.result.projects;
                        this.loading=false
                    }

                })
            },
        }
    }
</script>

<style>
    .siGnInfoTable{
        text-align: left;
    }
    .signInfoCard{
        width: 800px;
        height: 400px;
        margin-top: 100px;
        margin-left: 70px;
    }
</style>