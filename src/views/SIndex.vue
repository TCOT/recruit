<template>
    <div>
        <el-container>
            <el-header>
                <s-header></s-header>
            </el-header>
            <el-container>
                <el-aside width="300px">
                    <s-menu @choose="change"></s-menu>
                </el-aside>
                <el-main>
                        <component :is="tabView" ></component>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import SInfo from './../components/SInfo'
    import Details from './../components/Details'
    import SHeader from './../components/SHeader'
    import SMenu from './../components/SMenu'
    import SProjects from './../components/SProjects'
    import SigIn from './../components/SigIn'
    import JoinInfo from './../components/JoinInfo'

    export default {
        components: {
            SHeader,
            SMenu,
            SProjects,
            SInfo,
            Details,
            SigIn,
            JoinInfo
        },
        computed:{
            change(){
                if(this.$store.state.selection == 1){
                    this.tabView = "SInfo"
                    return
                }else if(this.$store.state.selection == 2){
                    this.tabView = "SProjects"
                }else if(this.$store.state.selection == 3){
                    this.tabView = "JoinInfo"
                }else if(this.$store.state.selection == 4){
                    this.tabView = "SigIn"
                }else if(this.$store.state.selection == 5){
                    this.tabView = "Details"
                }
            }
        },
        data() {
            return {
                projectId:""
            }
        },
        methods: {
            toDetail(){
                this.tabView = "Details"
            },
            change(index) {
                if (index == 1) {
                    this.tabView = "SInfo"
                } else if (index == 2) {
                    this.tabView = "SProjects"
                } else {
                    this. tabView = "SingUp"
                }
            }
        }
    }
</script>

<style>
    .el-main {
        margin-top: 50px;
        margin-left: 30px;
        padding-top: 55px;
        padding-left: 30px;
    }

    .el-header {
        height: 75px;
    }

    .el-aside {
        width: 270px;
        padding-top: 50px;
    }
</style>