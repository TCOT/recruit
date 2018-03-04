<template>
    <div class="index">
        <s-header></s-header>
        <div class="main">
            <s-menu @choose="change"></s-menu>
            <component :is="tabView" ></component>
        </div>

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
        computed: {
            change() {
                if (this.$store.state.selection == 1) {
                    this.tabView = "SInfo"
                    return
                } else if (this.$store.state.selection == 2) {
                    this.tabView = "SProjects"
                } else if (this.$store.state.selection == 3) {
                    this.tabView = "JoinInfo"
                } else if (this.$store.state.selection == 4) {
                    this.tabView = "SigIn"
                } else if (this.$store.state.selection == 5) {
                    this.tabView = "Details"
                }
            }
        },
        data() {
            return {
                projectId: ""
            }
        },
        methods: {
            toDetail() {
                this.tabView = "Details"
            },
            change(index) {
                if (index == 1) {
                    this.tabView = "SInfo"
                } else if (index == 2) {
                    this.tabView = "SProjects"
                } else {
                    this.tabView = "SingUp"
                }
            }
        }
    }
</script>

<style>
    .main{
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
        background-image: url(./../assets/0.png);
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100vh;
    }
</style>