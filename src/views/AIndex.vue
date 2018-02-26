<template>
    <div>
        <el-container>
            <el-header >
                <nav-header></nav-header>
            </el-header>
            <el-container>
                <el-aside width="300px" >
                    <menu-group @choose="change"></menu-group>
                </el-aside>
                <el-main>
                    <component :is="tabView" ></component>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import NavHeader from './../components/NavHeader'
    import MenuGroup from './../components/MenuGroup'
    import QuillEditor from './../components/quillEditor'
    import Publish from './../components/Publish'
    import ProjectDet from './../components/ProjectDet'
    import ProjectDetail from './../components/ProjectDetail'

    export default {
        components: {
            NavHeader,
            MenuGroup,
            QuillEditor,
            Publish,
            ProjectDet,
            ProjectDetail
        },
        computed:{
            change(){
                if(this.$store.state.selection == 1){
                    this.tabView = "ProjectDet"
                    return
                }else if(this.$store.state.selection == 2){
                    this.tabView = "QuillEditor"
                }else if(this.$store.state.selection == 3){
                }else if(this.$store.state.selection == 4){
                    this.tabView = "ProjectDetail"
                }else if(this.$store.state.selection == 5){
                }
            }
        },
    }

</script>

<style>
    .el-main{
        padding-top: 50px;
    }
    .el-header{
        height: 75px;
    }
    .el-aside{
        width: 270px;
        padding-top: 50px;
    }
</style>