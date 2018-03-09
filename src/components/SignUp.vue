<template>
    <div>
        <div class="projectDetWrapper" v-if="editflag==false" v-loading="loading" v>
            <el-card class="projectDet">
                <div slot="header" class="clearfix">
                    <span>{{projectName}}</span>
                </div>
                <div class="text item" >
                    <div v-html='projectContent' style="text-align: left"></div>
                </div>
            </el-card>
            <el-button type="primary" icon="el-icon-edit-outline" style="margin-top: 30px;font-size: 16px;
                display: inline-block;float: left;" @click="signUp">
                我要报名
            </el-button>
            <el-button type="primary" plain icon="el-icon-back" style="margin-top: 30px;font-size: 16px;
                    display: inline-block;float: left;;margin-left: 30px" @click="backToList">
                返回
            </el-button>
        </div>
        <div v-if="editflag == true">
            <div class="editorWrapper">
                <div class="quill-editor-example">
                    <p class="prompt-text" style="text-align: left"><span
                            class="prompt-icon">*</span>请填写报名信息：</p>
                    <quill-editor
                            ref="myTextEditor"
                            v-model="signUpContent"
                            :options="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @ready="onEditorReady($event)">
                    </quill-editor>
                    <div  class="html ql-editor" style="font-size: 13px;text-align: left"
                          v-html="signUpContent"></div>
                </div>
                <div style="float:left;margin-top: 10px">
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button type="primary" plain @click="back">返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                projectName: '',
                projectContent: '',
                editflag: false,
                signUpContent: '',
                loading: true
            }
        },
        mounted() {
            this.init()
        },
        methods: {
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
