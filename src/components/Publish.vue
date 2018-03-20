<template>
    <div>
        <div class="editorWrapper" style="width: 850px;
             margin-left: 70px;
                 margin-top: 70px;" v-loading="loading">
            <div>
                <p style="text-align: left;margin-bottom: 5px;">项目名：
                </p>
                <el-input size="medium"
                          @keyup.native="inputChange" style="margin: 3px 0px;font-size: 16px;
                        width: 400px;display: flex;margin-top: 8px;"
                          v-model="draft.title"></el-input>
                <div style="display: flex;margin: 5px 5px 5px 0;">
                    <p style="text-align: left;margin: 5px 0 10px 0;">正文：{{courier}}</p>
                    <el-tag :type="last == true?'success':'' " v-if=" first == true ">{{saveInfo}}
                    </el-tag>
                </div>
                <quill-editor
                        ref="myTextEditor"
                        v-model="draft.content"
                        :options="editorOption"
                        @change="onEditorChange">
                </quill-editor>
            </div>
            <div style="display: flex;align-items: center; margin: 10px 0;">
                <span style="margin-right: 20px">选择报名期限:</span>
                <el-date-picker
                        unlink-panels
                        clearable
                        v-model="signUpTime"
                        type="daterange"
                        format="yyyy 年 M 月 dd 日"
                        value-format="yyyy-M-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div style="float:left;margin-bottom: 250px">
                <el-button type="success" :loading="publishLoading" @click="submit">发布</el-button>
            </div>
        </div>
        <div style="margin-bottom: 300px">
        </div>
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
                signUpTime:[],
                loading: false,
                publishLoading:false,
                draft: {},
                last: false,
                first: false,
                saveInfo: '',
                editorOption: {
                    modules: {
                        imageDrop: true,
                        // ImageExtend: {},
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
            courier() {
                if (this.draft.title !== '' ||
                    this.draft.content !== '') {
                    this.$store.commit("updateDraft", true)
                } else {
                    this.$store.commit("updateDraft", false)
                }
                return
            }
        },
        methods: {
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
            inputChange() {
                console.log(this.signUpTime)
                this.last = false
                this.first = true
                this.saveInfo = '正在保存...'
                this.publishLoading = true
                this.debounceChange(this)
            },
            onEditorChange() {
                this.last = false
                this.first = true
                this.saveInfo = '正在保存...'
                this.publishLoading = true
                this.debounceChange(this)
            },
            debounceChange: _.debounce((self) => {
                let date = new Date();
                let hour = date.getHours();
                let minute = date.getMinutes();
                axios.post("/projects/publishSave", {
                    userName: self.$store.state.nickName,
                    title: self.draft.title,
                    content: self.draft.content
                }).then(() => {
                    self.last = true
                    self.saveInfo = '最近保存 ' + hour + ':' + minute
                    self.publishLoading = false
                })
            }, 1800),
            submit() {
                if (!this.draft.title || !this.draft.content || this.signUpTime.length == 0) {
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
                }).then(() => {
                    axios.post("/projects/publish", {
                        signUpTime:this.signUpTime,
                        userName: this.$store.state.nickName,
                        projectName: this.draft.title,
                        projectContent: this.draft.content
                    }).then((response) => {
                        let res = response.data
                        if (res.status == '0') {
                            this.$store.commit("updateDraft", false)
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

    .html {
        overflow-y: auto;
        border: 1px solid #ccc;
        border-top: none;
        resize: vertical;
    }
</style>