<template>
    <div>
        <template>
            <el-table
                    :data="projects5"
                    style="width: 60%">
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
        </template>
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
                projects5: []
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
                    console.log(res)
                    if (res.status == "0") {
                        this.projects5 = res.result.projects;
                    }
                })
            },
        }
    }
</script>

<style>

</style>