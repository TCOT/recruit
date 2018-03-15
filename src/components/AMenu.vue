<template>
    <div>
        <el-col :span="12">
            <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo">
                <el-menu-item index="1" @click="select(1)">
                    <i class="el-icon-tickets" style="font-size: 24px"></i>
                    <span slot="title" style="font-size: 16px;">项目详情</span>
                </el-menu-item>
                <el-badge value="new" :hidden="hidden">
                    <el-menu-item index="2" @click="select(2)" >
                        <i class="el-icon-edit-outline" style="font-size: 24px"></i>
                        <span slot="title" style="font-size: 16px;">发布项目</span>
                    </el-menu-item>
                </el-badge>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        mounted() {
            this.init()
        },
        computed: {
            hidden(){
                return !this.$store.state.draft
            }
        },
        methods: {
            init() {
                axios.get("/users/getDraft",{
                    params: {
                        userName: this.$store.state.nickName
                    }
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "0") {
                        if( res.result.projectDraft.title !== '' ||
                            res.result.projectDraft.content !== ''){
                            this.$store.commit("updateDraft", true)
                        }else {
                            this.$store.commit("updateDraft", false)
                        }
                    }
                })
                this.$router.push("/aindex/projectlist")
            },
            select(index) {
                if (index == 1) {
                    this.$router.push("/aindex/projectlist")
                } else if (index == 2) {
                    this.$router.push("/aindex/publish")
                } else {

                }
            }
        }
    }
</script>

<style>
    .el-badge__content.is-fixed{
        margin-right: 13px;
        margin-top: 10px;
    }
    .el-col-12 {
        width: 100%;
        margin-top: 130px;

    }
</style>