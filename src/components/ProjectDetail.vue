<template>
    <div class="pDetailContent">
        <el-tabs value="first" @tab-click="handleClick">
            <el-tab-pane label="项目内容" name="first">
                <el-card class="projectContent" style="margin: 5px 10px 5px 10px"
                         v-loading="loading">
                    <div slot="header" class="clearfix">
                        <span>{{projectName}}</span>
                    </div>
                    <div class="text item">
                        <div v-html='projectContent' style="text-align: left"></div>
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="报名人员" name="second">
                <el-table class="studentsList" :data="students" v-loading="loading">
                    <el-table-column
                            label="学号"
                            width="180">
                        <template slot-scope="scope">
                            <span>{{ scope.row.userName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="姓名"
                            width="180">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>专业: {{ scope.row.major }}</p>
                                <p>班级: {{ scope.row.classNum }}</p>
                                <p>性别: {{ scope.row.sex }}</p>
                                <p>QQ号: {{ scope.row.qqNum }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="220">
                        <template slot-scope="scope">
                            <el-button type="success"
                                       size="mini"
                                       @click="handlePass(scope.$index, scope.row)">通过
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">拒绝
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <el-tag type="info" v-if="scope.row.status =='未审核'">{{scope.row
                                .status}}</el-tag>
                            <el-tag type="success" v-else-if="scope.row.status =='已通过'">{{scope.row
                                .status}}</el-tag>
                            <el-tag type="danger"
                                    v-else-if="scope.row.status =='已拒绝'">{{scope.row
                                .status}}</el-tag>
                        </template>


                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="未审核" name="third">
                <div class="noCheckedWrapper" v-loading="loading">
                    <el-card style="flex-wrap: wrap;margin: 5px 10px 5px 10px;padding: 0px">
                        <div style="display: flex;width:660px;justify-content: space-between ">
                            <div style="width: 330px;display: flex;margin-bottom: 20px">
                                姓名：{{noCheckedUserInfo.name}}
                            </div>
                            <div style="width: 330px;display: flex;margin-bottom: 20px">
                                学号：{{noCheckedUserInfo.userName}}
                            </div>
                        </div>
                        <div style="display: flex;width:660px;justify-content: space-between ">
                            <div style="width: 330px;display: flex;margin-bottom: 20px">
                                性别：{{noCheckedUserInfo.sex}}
                            </div>
                            <div style="width: 330px;display: flex;margin-bottom: 20px">
                                专业：{{noCheckedUserInfo.major}}
                            </div>
                        </div>
                        <div style="display: flex;width:660px;justify-content: space-between ">
                            <div style="width: 330px;display: flex;margin-bottom: 20px">
                                班级：{{noCheckedUserInfo.classNum}}
                            </div>
                            <div style="width: 330px;display: flex;margin-bottom: 20px">
                                QQ号码：{{noCheckedUserInfo.qqNum}}
                            </div>
                        </div>
                        <div style="display: flex;width:660px;justify-content: space-between ">
                            <div style="width: 330px;display: flex;margin-bottom: 20px">
                                手机号码：{{noCheckedUserInfo.phoneNum}}
                            </div>
                        </div>

                    </el-card>
                    <el-card style="flex-wrap: wrap;margin: 5px 10px 5px 10px;padding: 0px">
                        <div class="text item">
                            <div v-html='noCheckedUserContent'></div>
                        </div>
                    </el-card>
                    <div style="margin-top: 5px;display: flex;margin-left: 10px">
                        <el-button type="success"
                                   size="mini"
                                   @click="pass">通过
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="">拒绝
                        </el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已通过" name="fourth">
            </el-tab-pane>
            <el-tab-pane label="已拒绝" name="fifth">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                projectName: '',
                projectContent: '',
                loading: false,
                students: [],
                noCheckedUserInfo: {},
                noCheckedUserContent: '',
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            handlePass(){
                axios.post("/projects/listPassSomeone", {
                    userName: this.noCheckedUserInfo.userName,
                    projectId: this.$route.params.projectId
                }).then((response) => {
                    let res = response.data
                    if (res.status == '0') {
                        this.loading = true
                        axios.get("/projects/getNoCheckedUser", {
                            params: {
                                projectId: this.$route.params.projectId
                            }
                        }).then((response) => {
                            var res = response.data;
                            if (res.status == "0") {
                                this.noCheckedUserInfo = res.result.noCheckedUser;
                                this.noCheckedUserContent = res.result.noCheckedUserSignUpContent
                            }
                            this.loading = false
                        })
                    }
                })
            },
            pass() {
                axios.post("/projects/passSomeone", {
                    userName: this.noCheckedUserInfo.userName,
                    projectId: this.$route.params.projectId
                }).then((response) => {
                    let res = response.data
                    if (res.status == '0') {
                        this.loading = true
                        axios.get("/projects/getNoCheckedUser", {
                            params: {
                                projectId: this.$route.params.projectId
                            }
                        }).then((response) => {
                            var res = response.data;
                            if (res.status == "0") {
                                this.noCheckedUserInfo = res.result.noCheckedUser;
                                this.noCheckedUserContent = res.result.noCheckedUserSignUpContent
                            }
                            this.loading = false
                        })
                    }
                })
            },
            init() {
                this.loading = true
                let param = {
                    projectId: this.$route.params.projectId
                }
                axios.get('/projects/getContent', {
                    params: param
                }).then((response) => {
                    let res = response.data;
                    if (res.status == "0") {
                        this.projectContent = res.result.project.projectContent
                        this.projectName = res.result.project.projectName
                        this.loading = false
                    }
                })
            },
            handleClick(tab, event) {
                if (tab.name == "first") {
                    this.loading = true
                    let param = {
                        projectId: this.$route.params.projectId
                    }
                    axios.get('/projects/getContent', {
                        params: param
                    }).then((response) => {
                        let res = response.data;
                        if (res.status == "0") {
                            this.projectContent = res.result.project.projectContent
                            this.projectName = res.result.project.projectName
                            this.loading = false
                        }
                    })
                }
                if (tab.name == "second") {
                    this.loading = true
                    let param = {
                        projectId: this.$route.params.projectId
                    }
                    axios.get("projects/getStudentsList", {
                        params: param
                    }).then((response) => {
                        var res = response.data;
                        if (res.status == "0") {
                            this.students = res.result.students;
                        }
                        this.loading = false
                    })
                }
                if (tab.name == 'third') {
                    this.loading = true
                    axios.get("/projects/getNoCheckedUser", {
                        params: {
                            projectId: this.$route.params.projectId
                        }
                    }).then((response) => {
                        var res = response.data;
                        if (res.status == "0") {
                            this.noCheckedUserInfo = res.result.noCheckedUser;
                            this.noCheckedUserContent = res.result.noCheckedUserSignUpContent
                        }
                        this.loading = false

                    })
                }
            }
        }
    }
</script>

<style>
    .el-card__body {
        padding: 10px 10px 0px 15px;
    }

    .el-tabs__header {
        margin: 0 0 5px;
    }

    .el-table td div {
        display: inherit;
    }

    .studentsList {
        width: 700px;
    }

    .projectContent {
        width: 750px;
    }

    .pDetailContent {
        width: 800px;
        height: 400px;
        margin-top: 60px;
        margin-left: 70px;
    }

    .el-tabs__item {
        padding: 0 30px;
    }

    .el-popover {
        line-height: 1;
        min-width: 100px
    }
</style>