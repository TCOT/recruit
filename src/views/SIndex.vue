<template>
    <div class="wrapSIndex">
        <div style="min-height: calc(100vh - 50px);">
            <s-header></s-header>
            <div class="smain">
                <s-menu></s-menu>
                <router-view></router-view>
            </div>
        </div>
        <a-footer></a-footer>
    </div>
</template>

<script>
    import SInfo from './../components/SInfo'
    import Details from '../components/SignUp'
    import SHeader from './../components/SHeader'
    import SMenu from './../components/SMenu'
    import SProjects from './../components/SProjects'
    import AFooter from '../components/AFooter'

    export default {
        components: {
            SHeader,
            SMenu,
            SProjects,
            SInfo,
            Details,
            AFooter
        },
        mounted() {
            this.init()
        },
        data() {
            return {
                projectId: ""
            }
        },
        methods: {
            init() {

            }
        }
    }
</script>

<style lang="scss">
    .wrapSIndex {
        .smain {
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
