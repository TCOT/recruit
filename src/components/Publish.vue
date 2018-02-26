<template>
    <div>
        <!--<h4 style="text-align: left">项目名称:</h4>-->
        <!--<el-input v-model="input" placeholder="请输入项目名称"></el-input>-->
        <!--<h4 style="text-align: left;margin-top: 10px">发布新项目：</h4>-->
        <quill-editor></quill-editor>
    </div>
</template>

<script>
    import QuillEditor from './quillEditor'

    export default {
        name: "publish",
        components:{
            QuillEditor
        }
    }
</script>

<style >
    .el-input{
        font-size: 15px;
        text-align: left;
        width: 300px;
        margin-right: 900px;
    }
    h4{
        margin-bottom: 10px;
    }
</style>