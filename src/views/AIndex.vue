<template>
    <div class="wrapAIndex">
        <div style="min-height: calc(100vh - 50px);">
            <a-header></a-header>
            <div class="amain">
                <a-menu></a-menu>
                <router-view></router-view>
            </div>
        </div>
        <a-footer></a-footer>
    </div>

</template>

<script>
    import AHeader from '../components/AHeader'
    import AMenu from '../components/AMenu'
    import ProjectList from './../components/ProjectList'
    import Publish from './../components/Publish'
    import AFooter from '../components/AFooter'

    export default {
        components: {
            AHeader,
            AMenu,
            ProjectList,
            Publish,
            AFooter
        },
        computed: {}
    }

</script>

<style lang="scss">
    .wrapAIndex {
        .amain {
            display: flex;
            position: relative;
            box-align: start;
            align-items: flex-start;
            width: 1200px;
            padding: 0 16px;
            margin: 10px auto;
        }
    }
</style>