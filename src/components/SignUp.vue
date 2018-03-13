<template>
    <div>
        <div class="projectDetWrapper" v-if="editflag==false" v-loading="loading" v>
            <el-card class="projectDet">
                <div slot="header" class="clearfix">
                    <span>{{projectName}}</span>
                </div>
                <div class="text item" >
                    <div v-html='projectContent' style="text-align:left;"></div>
                </div>
            </el-card>
            <el-button type="primary" icon="el-icon-edit-outline" style="margin-top: 30px;font-size: 16px;
                display: inline-block;float: left;" @click="signUp">
                报名
            </el-button>
            <el-button type="primary" plain icon="el-icon-back" style="margin-top: 30px;font-size: 16px;
                    display: inline-block;float: left;;margin-left: 30px" @click="backToList">
                返回
            </el-button>
        </div>
        <div v-if="editflag == true">
            <div class="editorWrapper" style="width: 850px" v-loading="loading">
                <div>
                    <div style="display: flex;align-items: center;">
                    <p class="prompt-text" style="text-align: left"><span
                            class="prompt-icon">*</span>请填写报名信息：</p>
                    <el-tag :type="last == true?'':'success' " v-if=" first == true ">{{saveInfo}}
                    </el-tag>
                    </div>
                    <quill-editor
                            ref="myQuillEditor"
                            v-model="signUpContent"
                            :options="editorOption"
                            @change="onEditorChange($event)">
                    </quill-editor>
                    <div  class="html ql-editor" style="font-size: 16px;text-align: left"
                          v-html="signUpContent"></div>
                </div>
                <div style="float:left;margin-top: 10px">
                    <el-button type="primary" @click="submit" style="margin-bottom: 300px">提交
                    </el-button>
                    <el-button type="primary" plain @click="back">返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
    import axios from 'axios'

    export default {
        data() {
            return {
                projectName: '',
                projectContent: '',
                editflag: false,
                signUpContent: '',
                loading: true,
                last: false,
                first: false,
                saveInfo: '',
                editorOption: {
                    modules: {
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
            saveStatusToFalse() {
                let date = new Date();
                let hour = date.getHours();
                let minute = date.getMinutes();
                this.saveStatus = false
                this.last = true
                this.saveInfo = '最近保存 ' + hour + ':' + minute
            },
            onEditorChange(){
                axios.post("/users/signUpSave", {
                    userName: this.$store.state.nickName,
                    projectId: this.$route.params.id,
                    signUpContent: this.signUpContent
                }).then((response) => {
                    this.first = true
                    this.saveStatus = true
                    this.last = false
                    this.saveInfo = '保存成功'
                    let res = response.data
                    if (res.status == '0') {
                        setTimeout(this.saveStatusToFalse, 5000)
                    }
                })
            },
            init() {
                let param = {
                    projectId: this.$route.params.id
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
            signUp() {
                this.editflag = true
                this.loading = false
                axios.get('/users/getSDraft', {
                    params: {
                        userName:this.$store.state.nickName,
                        projectId: this.$route.params.id
                    }
                }).then((response) => {
                    let res = response.data;
                    if (res.status == "0") {
                        this.signUpContent = res.result.projectDraftContent
                        this.loading = false
                    }
                })
            },
            back() {
                this.editflag = false
            },
            backToList() {
                this.$router.push("/sindex/sprojects")
            },
            submit() {
                this.$confirm('请确认是否报名?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post("/projects/signUp", {
                        projectName:this.$route.params.id,
                        content: this.signUpContent,
                        userName: this.$store.state.nickName,
                    }).then((response) => {
                        let res = response.data;
                        if(res.status == '0'){
                            this.$router.push("/sindex/sinfo")
                        }
                    })
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '恭喜，报名成功！'
                    })
                })
            }
        }
    }
</script>

<style>
    .ql-editor pre{
        padding: 5px 10px;
        background-color: #23241f;
        color: #f8f8f2;
        overflow: visible;
        white-space: pre-wrap;
        margin-bottom: 5px;
        margin-top: 5px;
        border-radius: 3px;
    }
    .ql-container.ql-snow{
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
        margin-top: 90px;
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
