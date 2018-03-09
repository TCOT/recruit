<template>
    <div>
        <el-col :span="12">
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo">
                <el-menu-item index="1" @click="select(1)">
                    <i class="el-icon-tickets" style="font-size: 24px"></i>
                    <span slot="title" style="font-size: 16px;">个人信息</span>
                </el-menu-item>
                <el-menu-item  @click="select(2)">
                    <i class="el-icon-view" style="font-size: 24px"></i>
                    <span slot="title" style="font-size: 16px;">项目列表</span>
                </el-menu-item>
                <el-menu-item index="3" @click="select(3)">
                    <i class="el-icon-bell" style="font-size: 24px"></i>
                    <span slot="title" style="font-size: 16px;">报名情况</span>
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
                this.$router.push("/sindex/sinfo")
            },
            select(index){
                if(index == 1){
                    this.$router.push("/sindex/sinfo")
                }else if(index == 2){
                    this.$router.push("/sindex/sprojects")
                }else {
                    this.$router.push("/sindex/joininfo")
                }
            }
        }
    }
</script>

<style>
    .el-col-12 {
        width: 100%;
        margin-top: 150px;
    }
</style>