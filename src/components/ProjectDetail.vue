<template>
    <div class="pDetailContent" >
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
                <div v-if="this.detailFlag == false">
                <el-table class="studentsList" :data="filterData"

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
                                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
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
                    <el-table-column    column-key="status"
                            label="状态"
                                     prop="status"
                                     :filters="[{ text: '未审核', value: '未审核' }, { text: '已通过',
                                     value:'已通过'},{text:'已拒绝',value:'已拒绝'}]"
                                     :filter-method="filterTag">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status == '未审核'?'info':
                            ( scope.row.status=='已通过'?'success':'danger')  ">{{scope.row.status}}
                            </el-tag>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block" style="margin-top: 10px">
                    <el-pagination
                            background
                            page-size="5"
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
                                    审核情况:<el-tag style="margin-left: 10px;"
                                                 :type="stuDetailInfo.status == '未审核'?'info':
                            ( stuDetailInfo.status=='已通过'?'success':'danger')  ">{{stuDetailInfo.status}}
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
                            <div style="text-align: left;margin: 10px 0 10px 10px">
                        <span>
                            备注信息：
                        </span>
                            </div>
                            <div >
                                <quill-editor style="margin-left: 10px;margin-right: 9px;"
                                              ref="myTextEditor"
                                              v-model="stuDetailInfo.remarks"
                                              :options="editorOption"
                                              @blur="onEditorBlur($event)">
                                </quill-editor>
                            </div>
                        </div>
                        <div style="margin-top: 15px;display: flex;margin-left: 10px">
                            <el-button type="success"
                                       size="medium"
                                       @click="pass">通过
                            </el-button>
                            <el-button
                                    size="medium"
                                    type="danger"
                                    @click="">拒绝
                            </el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="未审核" name="third">
                <div v-if="allstudentsChecked == false" class="noCheckedWrapper"
                     v-loading="loading"
                style="margin-bottom: 250px">
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
                        <div style="text-align: left">
                            <div v-html='noCheckedUserContent'></div>
                        </div>
                    </el-card>
                    <div>
                        <div style="text-align: left;margin: 10px 0 10px 10px">
                        <span>
                            备注信息：
                        </span>
                        </div>
                        <div >
                            <quill-editor style="margin-left: 10px;margin-right: 9px;"
                                    ref="myTextEditor"
                                    v-model="checkRemark"
                                    :options="editorOption"
                                    @blur="onEditorBlur($event)"
                                    @focus="onEditorFocus($event)"
                                    @ready="onEditorReady($event)">
                            </quill-editor>
                        </div>
                    </div>
                    <div style="margin-top: 15px;display: flex;margin-left: 10px">
                        <el-button type="success"
                                   size="medium"
                                   @click="pass">通过
                        </el-button>
                        <el-button
                                size="medium"
                                type="danger"
                                @click="">拒绝
                        </el-button>
                    </div>
                </div>
                <div v-else-if="allstudentsChecked == true" style="margin-left:300px;
                margin-top:135px;">
                    <i class="el-icon-success" style="margin-right: 5px"></i>所有人均已审核
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                filters: {},
                reamrk: '',
                projectName: '',
                projectContent: '',
                loading: false,
                students: [],
                noCheckedUserInfo: {},
                noCheckedUserContent: '',
                allstudentsChecked: false,
                total: 0,
                page: 0,
                iconloading: false,
                checkedFlag: 0,
                thePageStudents:[],
                theFilterStudents:[],
                filteFlag:false,
                detailFlag:false,
                stuDetailInfo:{},
                remark:'',
                checkRemark:''
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
                data = data.slice( (this.page-1)*5, this.page*5 )
                return data
            }
        },
        methods: {
            onEditorBlur(){
                axios.post("/projects/editRemark", {
                    userName: this.stuDetailInfo.userName,
                    projectId: this.$route.params.projectId,
                    remarks : this.stuDetailInfo.remarks
                }).then((response) => {
                    let res = response.data
                    if (res.status == '0') {
                        this.$message({
                            type: 'success',
                            message: '保存备注成功',
                            duration: 1000,
                            center: true
                        });
                    }
                })
            },
            cellClick(row, column, cell, event){
              if(column.property == 'name'){
                  this.detailFlag = true
                  this.loading = true
                  axios.get("/projects/getStuDetailInfo", {
                      params: {
                          projectId: this.$route.params.projectId,
                          userName:row.userName
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
            filterChange(filters){
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
                }).then(()=>{
                    row.status = '已拒绝'
                }).then(()=>{
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
                    checkRemark : this.checkRemark
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
                            this.handleCurrentChange(1,this.students)
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
                            this.allstudentsChecked = false
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
            }
        }
    }
</script>

<style>
    .ql-container.ql-snow{
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
        width: 700px;
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