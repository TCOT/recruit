<template>
    <div style="padding-left: 50px">
        <el-tabs style="margin-right: 300px" value="first">
            <el-tab-pane  label="项目内容" name="first" >
               <top-one></top-one>
            </el-tab-pane>
            <el-tab-pane label="全部人数" name="second" >
                <top-two></top-two>
            </el-tab-pane>
            <el-tab-pane label="未审核" name="third" >
                <top-three></top-three>
            </el-tab-pane>
            <el-tab-pane label="已通过" name="fourth">
                <top-four></top-four>
            </el-tab-pane>
            <el-tab-pane label="已拒绝" name="fifth">
                <top-five></top-five>
            </el-tab-pane>
        </el-tabs>
        <el-main>
            <component :is="topComponent" @choose="change"></component>
        </el-main>
    </div>
</template>

<script>
    import TopOne from './TopOne'
    import TopTwo from './TopTwo'
    import TopThree from './TopThree'
    import TopFour from './TopFour'
    import TopFive from './TopFive'

    export default {
        mounted() {
            this.init()
        },
        methods: {
        },
        components: {
            TopOne,
            TopTwo,
            TopThree,
            TopFour,
            TopFive
        }
    }
</script>

<style>

</style>