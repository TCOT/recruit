<template>
    <div class="pDetailContent">
        <el-tabs value="first" @tab-click="handleClick">
            <el-tab-pane label="项目内容" name="first">
                <el-card class="projectContent" style="margin: 5px 10px 5px 10px"
                         v-loading="loading">
                    <div slot="header" class="clearfix">
                        <span>{{project.projectName}}</span>
                    </div>
                    <div class="text item">
                        <div v-html='project.projectContent' style="text-align: left"></div>
                    </div>
                </el-card>
                <div style="display: flex;align-items: center;margin: 15px 10px;margin-bottom: 300px">
                    <span style="margin-right: 10px">报名时间:</span>
                    <el-tag>{{project.signUpTime[0]}}</el-tag>
                    <span style="margin: 0 10px">至</span>
                    <el-tag>{{project.signUpTime[1]}}</el-tag>
                </div>
            </el-tab-pane>

            <el-tab-pane label="报名人员" name="second">
                <div v-if="this.detailFlag == false">
                    <el-table class="studentsList" :data="filterData"
                              @sort-change="sortChange"
                              @cell-click="cellClick"
                              @filter-change="filterChange"
                              clearFilter
                              v-loading="loading">
                        <el-table-column
                                prop="userName"
                                label="学号"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名"
                                width="180">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>专业: {{ scope.row.major }}</p>
                                    <p>班级: {{ scope.row.classNum }}</p>
                                    <p>性别: {{ scope.row.sex }}</p>
                                    <p>QQ号: {{ scope.row.qqNum }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium" class="tagDetail">{{ scope.row.name
                                            }}
                                        </el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="220" row-click="rowClick">
                            <template slot-scope="scope">
                                <el-button type="success"
                                           size="mini"
                                           @click="handlePass(scope.$index, scope.row)">通过
                                </el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleRefuse(scope.$index, scope.row)">拒绝
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column column-key="status"
                                         label="状态"
                                         prop="status"
                                         :filters="[{ text: '未审核', value: '未审核' }, { text: '已通过',
                                     value:'已通过'},{text:'已拒绝',value:'已拒绝'}]">
                            <template slot-scope="scope">
                                <el-tag :type="scope.row.status == '未审核'?'info':
                            ( scope.row.status=='已通过'?'success':'danger')  ">{{scope.row.status}}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column column-key="rate"
                                         label="评分" width="150" prop="rate" align="right" sortable="custom">
                            <template slot-scope="scope">
                                <el-rate
                                        @change="listRateChange(scope.$index, scope.row)"
                                        v-model="scope.row.rate"
                                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                                </el-rate>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block" style="margin-top: 10px">
                        <el-pagination
                                background
                                :page-size="5"
                                @current-change="handleCurrentChange"
                                layout="total,prev, pager, next"
                                :total="total">
                        </el-pagination>
                    </div>
                </div>
                <div v-if="this.detailFlag == true">
                    <div class="noCheckedWrapper"
                         v-loading="loading"
                         style="margin-bottom: 250px">
                        <el-card style="flex-wrap: wrap;margin: 5px 10px 5px 10px;padding: 0px">
                            <div style="display: flex;width:660px;justify-content: space-between ">
                                <div style="width: 330px;display: flex;margin-bottom: 20px;align-items: center;">
                                    姓名：{{stuDetailInfo.name}}
                                </div>
                                <div style="width: 330px;display: flex;margin-bottom: 20px;align-items: center;">
                                    学号：{{stuDetailInfo.userName}}
                                </div>
                            </div>
                            <div style="display: flex;width:660px;justify-content: space-between ">
                                <div style="width: 330px;display: flex;margin-bottom: 20px;align-items: center;">
                                    性别：{{stuDetailInfo.sex}}
                                </div>
                                <div style="width: 330px;display: flex;margin-bottom: 20px;align-items: center;">
                                    专业：{{stuDetailInfo.major}}
                                </div>
                            </div>
                            <div style="display: flex;width:660px;justify-content: space-between ">
                                <div style="width: 330px;display: flex;margin-bottom: 20px;align-items: center;">
                                    班级：{{stuDetailInfo.classNum}}
                                </div>
                                <div style="width: 330px;display: flex;margin-bottom: 20px;align-items: center;">
                                    QQ号码：{{stuDetailInfo.qqNum}}
                                </div>
                            </div>
                            <div style="display: flex;width:660px;justify-content: space-between ">
                                <div style="width: 330px;display: flex;margin-bottom: 20px;align-items: center;">
                                    手机号码：{{stuDetailInfo.phoneNum}}
                                </div>
                                <div
                                        style="width: 330px;display: flex;margin-bottom: 20px;align-items: center;">
                                    审核情况:
                                    <el-tag style="margin-left: 10px;"
                                            :type="stuDetailInfo.status == '未审核'?'info':
                            ( stuDetailInfo.status=='已通过'?'success':'danger')  ">
                                        {{stuDetailInfo.status}}
                                    </el-tag>
                                </div>

                            </div>

                        </el-card>
                        <el-card style="flex-wrap: wrap;margin: 5px 10px 5px 10px;padding: 0px">
                            <div style="text-align: left">
                                <div v-html='stuDetailInfo.signUpContent'></div>
                            </div>
                        </el-card>
                        <div>
                            <div style="text-align: left;height: 35px;display: flex;align-items: center;margin-left: 10px;margin-top: 15px;margin-bottom: 10px">
                                <div style="width: 190px;align-items: center;display: flex;">
                                    <span>
                                    备注信息：
                                    </span>
                                    <el-tag :type="last == true?'success':'' "
                                            v-if=" first == true ">{{saveInfo}}
                                    </el-tag>
                                </div>
                                <div style="display: flex;align-items: center;margin-left: 10px;">
                                    <span style="margin-right: 5px">评分  </span>
                                    <el-rate
                                            show-text
                                            @change="rateChange"
                                            v-model="stuDetailInfo.rate"
                                            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                                    </el-rate>
                                </div>
                            </div>
                            <div>
                                <quill-editor style="margin-left: 10px;margin-right: 9px;
                                                 "
                                              ref="myTextEditor"
                                              v-model="stuDetailInfo.remarks"
                                              :options="editorOption"
                                              @change="onEditorChange($event)">
                                </quill-editor>
                            </div>
                        </div>
                        <div style="margin-top: 15px;display: flex;margin-left: 10px">
                            <el-button v-if="stuDetailInfo.status !=='已通过'"
                                       type="success"
                                       size="medium"
                                       @click="stuDetailPass">通过
                            </el-button>
                            <el-button type="success" icon='el-icon-circle-check-outline'
                                       v-if="stuDetailInfo.status =='已通过'" disabled>
                                已通过
                            </el-button>
                            <el-button
                                    v-if="stuDetailInfo.status !=='已拒绝'"
                                    size="medium"
                                    type="danger"
                                    @click="stuDetailRefuse">拒绝
                            </el-button>
                            <el-button icon='el-icon-circle-close-outline'
                                       type="danger" v-if="stuDetailInfo.status =='已拒绝'"
                                       disabled>
                                已拒绝
                            </el-button>
                            <el-button type="primary" icon="el-icon-more" @click="getNextStu">下一位
                            </el-button>
                            <el-button type="primary" @click="toStuList">返回列表</el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Quill from 'quill'
    import { ImageDrop } from 'quill-image-drop-module';
    import _ from 'lodash'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
    Quill.register('modules/imageDrop', ImageDrop);
    Quill.register('modules/ImageExtend', ImageExtend)
    import axios from 'axios'

    export default {
        data() {
            return {
                filters: {},
                reamrk: '',
                project: {},
                loading: false,
                students: [],
                noCheckedUserInfo: {},
                noCheckedUserContent: '',
                allstudentsChecked: false,
                total: 0,
                page: 0,
                iconloading: false,
                checkedFlag: 0,
                thePageStudents: [],
                theFilterStudents: [],
                detailFlag: false,
                stuDetailInfo: {},
                remark: '',
                checkRemark: '',
                saveStatus: false,
                last: false,
                saveInfo: '',
                first: false,
                nextData: [],
                order: '',
                editorOption: {
                    modules: {
                        // ImageExtend: {},
                        imageDrop: true,
                        imageResize: {},
                        toolbar: {
                            container: container
                        }
                    },
                }
            }
        },
        mounted() {
            this.init()
        },
        computed: {
            filterData() {
                let data = this.students
                Object.keys(this.filters).forEach(key => {
                    let values = this.filters[key]
                    if (values.length) {
                        data = data.filter(row => values.includes(row[key]))
                    }
                })
                this.total = data.length
                this.nextData = data
                if (this.order == 'ascending') {
                    data.sort(this.sortRateAsc)
                }
                if (this.order == 'descending') {
                    data.sort(this.sortRateDes)
                }
                data = data.slice((this.page - 1) * 5, this.page * 5)
                return data
            }
        },
        methods: {
            //升序
            sortRateAsc(a, b) {
                return a.rate - b.rate
            },
            //降序
            sortRateDes(a, b) {
                return b.rate - a.rate
            },
            sortChange({column, prop, order}) {
                this.order = order
            },
            listRateChange(index, row) {
                this.$message({
                    type: 'success',
                    message: '评分成功',
                    duration: 1000,
                    center: true
                })
                axios.post("/projects/rateChange", {
                    userName: row.userName,
                    projectId: this.$route.params.projectId,
                    rate: row.rate
                }).then((response) => {
                    let res = response.data
                    if (res.status == '0') {
                    }
                })
            },
            rateChange(rate) {
                this.$message({
                    type: 'success',
                    message: '评分成功',
                    duration: 1000,
                    center: true
                })
                axios.post("/projects/rateChange", {
                    userName: this.stuDetailInfo.userName,
                    projectId: this.$route.params.projectId,
                    rate: rate
                }).then((response) => {
                    let res = response.data
                    if (res.status == '0') {
                        this.stuDetailInfo.rate = rate
                    }
                })
            },
            toStuList() {
                this.detailFlag = false
            },
            getNextStu() {
                this.loading = true
                let nextIndex
                this.nextData.forEach((item, index) => {
                    if (item.userName == this.stuDetailInfo.userName) {
                        nextIndex = index + 1
                    }
                })
                if (nextIndex == this.nextData.length) {
                    nextIndex = 0
                }
                axios.get("/projects/getStuDetailInfo", {
                    params: {
                        projectId: this.$route.params.projectId,
                        userName: this.nextData[nextIndex].userName
                    }
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "0") {
                        this.stuDetailInfo = res.result.userInfo;
                        this.loading = false
                        this.$message({
                            type: 'success',
                            message: '已切换下一位同学',
                            duration: 1000,
                            center: true
                        })
                    }
                })
            },
            stuDetailRefuse() {
                axios.post("/projects/refuseSomeone", {
                    userName: this.stuDetailInfo.userName,
                    projectId: this.$route.params.projectId,
                }).then((response) => {
                    let res = response.data
                    if (res.status == '0') {
                        this.$message({
                            type: 'warning',
                            message: '拒绝此同学成功',
                            duration: 1000,
                            center: true
                        })
                        this.stuDetailInfo.status = '已拒绝'
                    }
                })
            },
            stuDetailPass() {
                axios.post("/projects/passSomeone", {
                    userName: this.stuDetailInfo.userName,
                    projectId: this.$route.params.projectId,
                }).then((response) => {
                    let res = response.data
                    if (res.status == '0') {
                        this.$message({
                            type: 'success',
                            message: '通过此同学成功',
                            duration: 1000,
                            center: true
                        })
                        this.stuDetailInfo.status = '已通过'
                    }
                })
            },
            onEditorChange() {
                this.last = false
                this.first = true
                this.saveInfo = '正在保存...'
                this.debounceChange(this)
            },
            debounceChange: _.debounce((self) => {
                let date = new Date();
                let hour = date.getHours();
                let minute = date.getMinutes();
                self.last = true
                self.saveInfo = '最近保存 ' + hour + ':' + minute
                axios.post("/projects/editRemark", {
                    userName: self.stuDetailInfo.userName,
                    projectId: self.$route.params.projectId,
                    remarks: self.stuDetailInfo.remarks
                })
            }, 2000),
            cellClick(row, column, cell, event) {
                this.first = false
                if (column.property == 'name') {
                    this.detailFlag = true
                    this.loading = true
                    axios.get("/projects/getStuDetailInfo", {
                        params: {
                            projectId: this.$route.params.projectId,
                            userName: row.userName
                        }
                    }).then((response) => {
                        var res = response.data;
                        if (res.status == "0") {
                            this.stuDetailInfo = res.result.userInfo;
                            this.loading = false
                        }
                    })

                }
            },
            filterChange(filters) {
                this.filters = filters
            },
            handleCurrentChange(page) {
                this.page = page
            },
            handleRefuse(index, row) {
                this.$confirm('确定拒绝此同学吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'warning',
                        message: '已拒绝此同学',
                        duration: 1000,
                        center: true
                    });
                }).then(() => {
                    row.status = '已拒绝'
                }).then(() => {
                    axios.post("/projects/listRefuseSomeone", {
                        userName: row.userName,
                        projectId: this.$route.params.projectId
                    })
                })

            },
            handlePass(index, row) {
                row.status = '已通过'
                axios.post("/projects/listPassSomeone", {
                    userName: row.userName,
                    projectId: this.$route.params.projectId
                }).then((response) => {
                    let res = response.data;
                    if (res.status == "0") {
                        this.$message({
                            type: 'success',
                            message: '通过此同学成功',
                            duration: 500,
                            center: true
                        });
                    }
                })
            },
            pass() {
                axios.post("/projects/passSomeone", {
                    userName: this.noCheckedUserInfo.userName,
                    projectId: this.$route.params.projectId,
                    checkRemark: this.checkRemark
                }).then((response) => {
                    let res = response.data
                    if (res.status == '0') {
                        this.loading = true
                        axios.get("/projects/getNoCheckedUser", {
                            params: {
                                projectId: this.$route.params.projectId,
                            }
                        }).then((response) => {
                            var res = response.data;
                            if (res.status == "0") {
                                this.noCheckedUserInfo = res.result.noCheckedUser;
                                this.noCheckedUserContent = res.result.noCheckedUserSignUpContent
                                this.loading = false
                            }
                            if (res.status == "1") {
                                this.allstudentsChecked = true
                                this.loading = false
                            }

                        })
                    }
                })
            },
            init() {
                this.loading = true
                axios.get('/projects/aGetProjectDetail', {
                    params: {
                        projectId: this.$route.params.projectId
                    }
                }).then((response) => {
                    let res = response.data;
                    if (res.status == "0") {
                        this.project = res.result.project
                        this.loading = false
                    }
                })
            },
            handleClick(tab, event) {
                if (tab.name == "first") {
                    this.loading = true
                    axios.get('/projects/aGetProjectDetail', {
                        params: {
                            projectId: this.$route.params.projectId
                        }
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
                    this.detailFlag = false
                    this.loading = true
                    let param = {
                        projectId: this.$route.params.projectId,
                    }
                    axios.get("projects/getStudentsList", {
                        params: param
                    }).then((response) => {
                        var res = response.data;
                        if (res.status == "0") {
                            this.students = res.result.students;
                            this.total = res.result.total
                            this.handleCurrentChange(1, this.students)
                            this.loading = false
                        }

                    })
                }
            }
        }
    }
</script>

<style>
    .ql-editor pre {
        padding: 5px 10px;
        background-color: #23241f;
        color: #f8f8f2;
        overflow: visible;
        white-space: pre-wrap;
        margin-bottom: 5px;
        margin-top: 5px;
        border-radius: 3px;
    }

    .el-table td, .el-table th.is-leaf {
        border-bottom: 0.1px solid #ebeef5;
    }

    .tagDetail {
        cursor: pointer;
    }

    .el-notification {
        width: 230px;
    }

    .ql-container.ql-snow {
        font-size: 16px;
    }

    .el-pagination {
        padding-right: 115px;
    }

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
        height: 338px;
    }

    .projectContent {
        width: 750px;
    }

    .pDetailContent {
        width: 800px;
        margin-top: 50px;
        margin-left: 70px;
    }

    .el-tabs__item {
        padding: 0 30px;
        font-size: 16px;
    }

    .el-popover {
        line-height: 1;
        min-width: 100px
    }
</style>