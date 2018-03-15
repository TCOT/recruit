<template>
    <div v-loading="loading">
        <div class="projectDetWrapper">
            <div style="margin-top: 90px;display: flex;padding: 10px 0;">
                <span>项目内容:</span>
            </div>
            <el-card class="projectDet">
                <div slot="header" class="clearfix">
                    <span>{{projectName}}</span>
                </div>
                <div class="text item">
                    <div v-html='projectContent' style="text-align:left;"></div>
                </div>
            </el-card>
            <div v-if="signUpStatus==true">
                <div style="display: flex;padding: 10px 0;">
                    <span style="display: flex;align-items: center;">报名信息:</span>
                    <el-tag style="margin-left: 30px">审核状态:</el-tag>
                    <el-tag style="margin-left: 10px;"
                            :type="checkedStatus == '审核中'?'info':
                            ( checkedStatus=='已通过'?'success':'danger')  ">
                        {{checkedStatus}}
                    </el-tag>
                </div>
                <el-card style="flex-wrap: wrap;padding: 0px">
                    <div style="text-align: left">
                        <div v-html='SignUpContent'></div>
                    </div>
                </el-card>
            </div>
            <div v-if="signUpStatus==false">
                <div style="display: flex;align-items: center;">
                    <p class="prompt-text" style="text-align: left"><span
                            class="prompt-icon">*</span>请填写报名信息：</p>
                    <el-tag :type="last == true?'success':'' " v-if=" first == true ">{{saveInfo}}
                    </el-tag>
                </div>
                <quill-editor
                        style="width: 800px"
                        ref="myQuillEditor"
                        v-model="signUpDraftContent"
                        :options="editorOption"
                        @change="onEditorChange">
                </quill-editor>
                <div class="html ql-editor" style="font-size: 16px;text-align: left;width: 800px"
                     v-html="signUpDraftContent"></div>
            </div>
            <el-button v-if="signUpStatus==false" type="primary" icon="el-icon-edit-outline" style="margin-top: 30px;font-size: 16px;
                display: inline-block;float: left;" @click="signUp">
                报名
            </el-button>
            <el-button v-if="signUpStatus==true" type="success" disabled style="margin-top: 30px;font-size: 16px;
                display: inline-block;float: left;">已报名
            </el-button>
            <el-button type="primary" plain icon="el-icon-back" style="margin-top: 30px;font-size: 16px;
                    display: inline-block;float: left;;margin-left: 30px" @click="backToList">
                返回{{courier}}
            </el-button>
            <div style="margin-bottom: 300px"></div>
        </div>
    </div>
</template>

<script>
    import Quill from 'quill'
    import _ from 'lodash'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

    Quill.register('modules/ImageExtend', ImageExtend)
    import axios from 'axios'

    export default {
        computed: {
            courier() {
                if (this.signUpDraftContent) {
                    let obj = {
                        projectId: this.$route.params.id,
                        status: 'keep'
                    }
                    this.$store.commit("updateSignUpDraft", obj)
                } else {
                    let obj = {
                        projectId: this.$route.params.id,
                        status: 'delete'
                    }
                    this.$store.commit("updateSignUpDraft", obj)
                }
                return
            }
        },
        data() {
            return {
                timeOut: 0,
                signUpDraftContent: '',
                projectName: '',
                projectContent: '',
                signUpContent: '',
                loading: true,
                last: false,
                first: false,
                saveInfo: '',
                signUpStatus: false,
                SignUpContent: '',
                checkedStatus: '',
                editorOption: {
                    modules: {
                        ImageExtend: {},
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
        methods: {
            debounceChange: _.debounce(async function () {
                try {
                    let date = new Date();
                    let hour = date.getHours();
                    let minute = date.getMinutes();
                    await axios.post("/users/signUpSave", {
                        userName: this.$store.state.nickName,
                        projectId: this.$route.params.id,
                        signUpDraftContent: this.signUpDraftContent
                    }).then(() => {
                        this.last = true
                        this.saveInfo = '最近保存 ' + hour + ':' + minute
                    })
                }
                catch (err) {
                    console.log(err)
                }
            }, 1800),
            async onEditorChange() {
                this.last = false
                this.first = true
                this.saveInfo = '正在保存...'
                this.debounceChange()
            },
            init() {
                this.loading = true
                this.signUpStatus = false
                axios.get('/projects/sGetSignUpContentInit', {
                    params: {
                        userName: this.$store.state.nickName,
                        projectId: this.$route.params.id
                    }
                }).then((response) => {
                    let res = response.data;
                    if (res.status == "0") {
                        this.checkedStatus = res.result.checkedStatus
                        this.signUpStatus = res.result.signUpStatus
                        this.projectContent = res.result.project.projectContent
                        this.projectName = res.result.project.projectName
                        this.SignUpContent = res.result.SignUpContent
                        this.signUpDraftContent = res.result.signUpDraftContent
                        this.loading = false
                    }
                })
            },
            backToList() {
                this.$router.push("/sindex/sprojects")
            },
            signUp() {
                this.$confirm('是否提交报名并报名信息?(提交后信息无法修改)', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() => {
                    axios.post("/projects/signUp", {
                        projectId: this.$route.params.id,
                        content: this.signUpDraftContent,
                        userName: this.$store.state.nickName,
                    }).then((response) => {
                        let res = response.data;
                        if (res.status == '0') {
                            this.$message({
                                type: 'success',
                                message: '恭喜，报名成功！'
                            })
                            this.init()
                        }
                    })
                })
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

    .ql-container.ql-snow {
        font-size: 16px;
    }

    .el-card__body {
        padding: 10px 10px 0px 15px;
    }

    .projectDetWrapper {
        margin-left: 70px;
    }

    .projectDet {
        width: 800px;
    }

    .editorWrapper {
        margin-top: 50px;
        margin-left: 70px;
    }

    .el-form-item__label {
        font-size: 17px;
    }

    .el-input-group__prepend {
        width: 150px !important;
    }

    .html {
        overflow-y: auto;
        border: 1px solid #ccc;
        border-top: none;
        resize: vertical;
    }
</style>
