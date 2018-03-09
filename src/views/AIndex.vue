<template>
    <div class="index">
        <a-header></a-header>
        <div class="amain">
            <a-menu></a-menu>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import AHeader from '../components/AHeader'
    import AMenu from '../components/AMenu'
    import ProjectList from './../components/ProjectList'
    import Publish from './../components/Publish'
    export default {
        components: {
            AHeader,
            AMenu,
            ProjectList,
            Publish
        },
        computed: {
        }
    }

</script>

<style>
    .amain{
        display: flex;
        position: relative;
        box-align: start;
        align-items: flex-start;
        width: 1200px;
        padding: 0 16px;
        margin: 10px auto;
    }
    .el-main {
        padding-top: 50px;
    }

    .el-header {
        height: 75px;
    }

    .el-aside {
        width: 270px;
        padding-top: 50px;
    }
</style>