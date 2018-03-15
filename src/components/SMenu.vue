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
                <el-badge value="new" :hidden="hidden">
                    <el-menu-item index="2" @click="select(2)">
                        <i class="el-icon-view" style="font-size: 24px"></i>
                        <span slot="title" style="font-size: 16px;">项目列表</span>
                    </el-menu-item>
                </el-badge>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data(){
            return{
                signUpDraft:[]
            }
        },
        computed: {
            hidden() {
                if(this.$store.state.signUpDraft.length !== 0){
                    console.log("to hidden")
                    console.log(this.$store.state.signUpDraft.length)
                    return false
                }
                return true
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                console.log("进入menu init 方法")
                axios.get("/users/geSignUpDraftStatus", {
                    params: {
                        userName: this.$store.state.nickName
                    }
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "0") {
                        this.$store.state.signUpDraft = res.result.signUpDraft
                        console.log("即将退出menu init方法，signUpDraft数组长度为："+this.$store.state.signUpDraft.length)
                        console.log("signUpDraft数组内容为")
                        console.log(this.$store.state.signUpDraft)
                    }
                })
                this.$router.push("/sindex/sinfo")
            },
            select(index) {
                if (index == 1) {
                    this.$router.push("/sindex/sinfo")
                } else if (index == 2) {
                    this.$router.push("/sindex/sprojects")
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