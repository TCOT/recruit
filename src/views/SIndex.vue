<template>
    <div class="index">
        <s-header></s-header>
        <div class="smain">
            <s-menu></s-menu>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import SInfo from './../components/SInfo'
    import Details from '../components/SignUp'
    import SHeader from './../components/SHeader'
    import SMenu from './../components/SMenu'
    import SProjects from './../components/SProjects'
    import JoinInfo from './../components/JoinInfo'

    export default {
        components: {
            SHeader,
            SMenu,
            SProjects,
            SInfo,
            Details,
            JoinInfo
        },
        mounted(){
            this.init()
        },
        data() {
            return {
                projectId: ""
            }
        },
        methods: {
            init(){
            }
        }
    }
</script>

<style>
    .smain{
        display: flex;
        position: relative;
        box-align: start;
        align-items: flex-start;
        width: 1200px;
        padding: 0 16px;
        margin: 10px auto;
    }
    .index{
        /*background-color: #f6f6f6;*/
        /*height: 100vh;*/
        /*background-image: url(./../assets/0.png);*/
        /*background-attachment: fixed;*/
        /*background-repeat: no-repeat;*/
        /*background-size: cover;*/
        /*width: 100%;*/
        /*height: 100vh;*/
    }
</style>
