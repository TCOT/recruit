<template>
    <div>
        <el-col :span="12">
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo">
                <el-menu-item index="1" @click="select(1)">
                    <i class="el-icon-tickets" style="font-size: 24px"></i>
                    <span slot="title" style="font-size: 16px;" >项目详情</span>
                </el-menu-item>
                <el-menu-item index="2" @click="select(2)">
                    <i class="el-icon-edit-outline" style="font-size: 24px"></i>
                    <span slot="title" style="font-size: 16px;">发布项目</span>
                </el-menu-item>
                <el-menu-item index="3" @click="select(3)">
                    <i class="el-icon-document" style="font-size: 24px"></i>
                    <span slot="title" style="font-size: 16px;margin-right: 15px">草稿箱</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.init()
        },
        methods:{
            init(){
                this.$router.push("/aindex/projectlist")
            },
            select(index){
                if(index == 1){
                    this.$router.push("/aindex/projectlist")
                }else if(index == 2){
                    this.$router.push("/aindex/publish")
                }else {

                }
            }
        }
    }
</script>

<style >
    .el-col-12{
        width: 100%;
        margin-top: 150px;

    }
</style>