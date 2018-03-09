<template>
    <div>
        <el-card class="projectContent" style="margin: 5px 10px 5px 10px" v-loading="loading">
            <div slot="header" class="clearfix">
                <span>{{projectName}}</span>
            </div>
            <div class="text item">
                <div v-html='projectContent' style="text-align: left"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                projectName:'',
                projectContent:'',
                loading: true
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.loading = true
                let param = {
                    projectId: this.$route.params.id
                }
                axios.get('/projects/getContent', {
                    params: param
                }).then((response) => {
                    let res = response.data;
                    if (res.status == "0") {
                        this.projectContent = res.result.project.projectContent
                        this.projectName = res.result.project.projectName
                        this.loading = false
                    }
                })
            }
        }
    }
</script>

<style>
    .projectContent{
        width: 750px;
    }
</style>