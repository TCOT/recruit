<template>
    <div style="padding-right: 200px">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{project.projectName}}</span>
            </div>
            <div class="text item">
                <div v-html='projectContent'></div>
            </div>
        </el-card>
        <el-button type="primary" plain icon="el-icon-edit-outline" style="margin-top: 30px;font-size: 16px;
                display: inline-block;float: left;" @click="singIn">
            我要报名
        </el-button>
        <el-button type="primary" plain icon="el-icon-back" style="margin-top: 30px;font-size: 16px;
                    display: inline-block;float: left;;margin-left: 30px" @click="back">
            返回
        </el-button>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                projectContent: this.$store.state.project.projectContent
            }
        },
        computed: {
            ...mapState(['project'])
        },
        mounted() {
        },
        methods: {
            singIn() {
                this.$store.commit('updateSelection', 4)
            },
            back(){
                this.$store.commit('updateSelection', 2)
            }
        }
    }
</script>

<style>

</style>