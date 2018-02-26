<template>
    <div >
        <div class="quill-editor-example">
            <p class="prompt-text" style="text-align: left"><span class="prompt-icon">*</span>报名信息：</p>
            <quill-editor
                    ref="myTextEditor"
                    v-model="content"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
            </quill-editor>
            <div class="html ql-editor" v-html="content"></div>
        </div>
        <div style="float:left;margin-top: 10px">
            <el-button type="primary" plain @click="submit">提交</el-button>
            <el-button type="primary" plain @click="back">返回</el-button>
        </div>
    </div>
</template>
<script>
    import Util from './../assets/lib/util';
    import axios from 'axios'

    export default {
        data() {
            return {
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
                if (!this.content) {
                    this.$message({
                        showClose: true,
                        message: '报名信息不完整',
                        type: 'error'
                    });
                    return;
                }
                axios.post("/users/submit", {
                    userName: this.$store.state.nickName,
                    projectId: this.$store.state.project.projectId,
                    projectName: this.$store.state.project.projectName,
                    content:this.content
                }).then((response) => {
                    this.$store.commit('updateSelection', 2)
                });
            },
            back(){
                this.$store.commit('updateSelection', 2)
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