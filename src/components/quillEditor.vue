<template>
    <div>
        <div class="quill-editor-example">
            <p class="prompt-text" style="text-align: left"><span class="prompt-icon" >*</span>项目名：
            </p>
            <el-input style="margin-top: 5px" v-model="projectName"></el-input>
            <p class="prompt-text" style="text-align: left"><span class="prompt-icon">*</span>正文：</p>
            <quill-editor
                    ref="myTextEditor"
                    v-model="projectContent"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
            </quill-editor>
            <div class="html ql-editor" v-html="projectContent"></div>
        </div>
        <div style="float:left;margin-top: 10px">
            <el-button type="primary" plain @click="submit">发布文章</el-button>
            <el-button type="primary" plain @click="preserve">保存草稿</el-button>
        </div>
    </div>
</template>
<script>
    import Util from './../assets/lib/util';
    import axios from 'axios'

    export default {
        data() {
            return {
                projectName: '',
                projectContent: '',
                name: 'base-example',
                content: '',
                editorOption: {}
            }
        },
        methods: {
            onEditorBlur(editor) {
            },
            onEditorFocus(editor) {
            },
            onEditorReady(editor) {
            },
            /***/
            submit() {
                if (!this.projectName || !this.projectContent) {
                    this.$message({
                        showClose: true,
                        message: '项目信息不完整',
                        type: 'error'
                    });
                    return;
                }
                alert("--")
                axios.post("/projects/publish", {
                    userName: this.$store.state.nickName,
                    projectName: this.projectName,
                    projectContent: this.projectContent
                }).then((response) => {

                });
            }
        },
        created() {
        },
        mounted() {
        }
    }
</script>
<style lang="scss">
    @import "./../assets/scss/define";

    .el-form-item__label {
        font-size: 17px;
    }

    .el-input-group__prepend {
        width: 150px !important;
    }

    .input-btn {
        @extend %pf;
        right: 20px;
        top: 80px;
    }

    .prompt-icon {
        color: red;
    }

    .prompt-text {
        @extend %f20;
        @extend %c3;
        margin-bottom: 10px;
    }

    .quill-editor-example {
        margin-top: 20px;
    }

    .ql-container .ql-editor {
        min-height: 20em;
        padding-bottom: 1em;
        max-height: 25em;
    }

    .html {
        height: 9em;
        overflow-y: auto;
        border: 1px solid #ccc;
        border-top: none;
        resize: vertical;
    }
</style>