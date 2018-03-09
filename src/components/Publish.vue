<template>
    <div>
        <div class="editorWrapper" style="width: 850px;
             margin-left: 70px;
                 margin-top: 70px;">
            <div class="quill-editor-example">
                <p style="text-align: left;margin-bottom: 5px">项目名：
                </p>
                <el-input style="margin: 3px 0 3px 0" v-model="projectTitle"></el-input>
                <p style="text-align: left;margin: 5px 0 10px 0">正文：</p>
                <quill-editor
                        ref="myTextEditor"
                        v-model="projectContent"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)">
                </quill-editor>
                <div class="html ql-editor" style="font-size: 13px"
                     v-html="projectContent"></div>
            </div>
            <div style="float:left;margin-top: 10px">
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button type="primary" plain @click="back">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                projectContent: '',
                projectTitle: ''
            }
        },
        methods:{
            submit() {
                if (!this.projectTitle || !this.projectContent) {
                    this.$message({
                        showClose: true,
                        message: '项目信息不完整',
                        type: 'error'
                    });
                    return;
                }
                axios.post("/projects/publish", {
                    userName: this.$store.state.nickName,
                    projectName: this.projectTitle,
                    projectContent: this.projectContent
                }).then((response) => {
                    this.$message({
                        message: '项目发布成功',
                        type: 'success'
                    })
                    this.$router.push("/aindex/projectlist")
                });
            }
        }
    }
</script>

<style>
    .html {
        overflow-y: auto;
        border: 1px solid #ccc;
        border-top: none;
        resize: vertical;
    }
</style>