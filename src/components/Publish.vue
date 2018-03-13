<template>
    <div>
        <div class="editorWrapper" style="width: 850px;
             margin-left: 70px;
                 margin-top: 70px;" v-loading="loading">
            <div >
                <p style="text-align: left;margin-bottom: 5px;">项目名：
                </p>
                <el-input   size="medium"
                            @keyup.native="inputChange" style="margin: 3px 0px;font-size: 16px;
                        width: 400px;display: flex;margin-top: 8px;"
                          v-model="draft.title"></el-input>
                <div style="display: flex;margin: 5px 5px 5px 0;">
                    <p style="text-align: left;margin: 5px 0 10px 0;">正文：{{courier}}</p>
                    <el-tag :type="last == true?'':'success' " v-if=" first == true ">{{saveInfo}}
                    </el-tag>
                </div>
                <quill-editor
                        ref="myTextEditor"
                        v-model="draft.content"
                        :options="editorOption"
                        @change="onEditorChange($event)">
                </quill-editor>
                <div class="html ql-editor" style="font-size: 16px"
                     v-html="draft.content"></div>
            </div>
            <div style="float:left;margin-top: 10px;margin-bottom: 250px">
                <el-button type="success" @click="submit">发布</el-button>
                <el-button type="primary"  @click="back">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                loading: false,
                draft: {},
                last: false,
                first: false,
                saveInfo: ''
            }
        },
        mounted() {
            this.init()
        },
        computed: {
            courier(){
                if( this.draft.title !== '' ||
                    this.draft.content !== ''){
                    this.$store.commit("updateDraft", true)
                }else {
                    this.$store.commit("updateDraft", false)
                }
                return
            }
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
            init() {
                this.loading = true
                axios.get("/users/getDraft", {
                    params: {
                        userName: this.$store.state.nickName
                    }
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "0") {
                        this.draft = res.result.projectDraft;
                        this.loading = false
                    }
                })
            },
            inputChange(){
                axios.post("/projects/publishSave", {
                    userName: this.$store.state.nickName,
                    title: this.draft.title,
                    content: this.draft.content
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
            onEditorChange() {
                axios.post("/projects/publishSave", {
                    userName: this.$store.state.nickName,
                    title: this.draft.title,
                    content: this.draft.content
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
            submit() {
                if (!this.draft.title || !this.draft.content) {
                    this.$message({
                        showClose: true,
                        message: '项目信息不完整',
                        type: 'error'
                    });
                    return;
                }
                this.$confirm('确定发布此项目吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(()=>{
                    axios.post("/projects/publish", {
                        userName: this.$store.state.nickName,
                        projectName: this.draft.title,
                        projectContent: this.draft.content
                    }).then((response) => {
                        let res = response.data
                        if (res.status == '0') {
                            this.$message({
                                message: '项目发布成功',
                                type: 'success'
                            })
                            this.$router.push("/aindex/projectlist")
                        }


                    });
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
    .html {
        overflow-y: auto;
        border: 1px solid #ccc;
        border-top: none;
        resize: vertical;
    }
</style>