<template>
    <header class="header">
        <div class="navbar">
            <div class="navbar-left-container">
                <a href="/"><i class="fa fa-user-circle-o fa-3x"></i></a>
                <div class="teacher">教室端</div>
            </div>
            <div class="navbar-right-container" style="display: flex;">
                <div class="navbar-menu-container">
                    <span class="navbar-link" v-text="nickName"></span>
                    <a href="javascript:void(0)" class="navbar-link" @click="logOut" >退出</a>
                </div>
            </div>
        </div>
    </header>
</template>

<style>
    .teacher {
        margin: 0 0 0 10px;
    }

    .header {
        position: relative;
        width: 100%;
        background-color: white;
        font-family: "moderat", sans-serif;
        font-size: 16px;
    }

    .navbar {
        display: flex;
        justify-content: space-between;
        align-content: center;
        width: 100%;
        height: 70px;
        max-width: 1280px;
        margin: 0 auto;
        padding: 5px 20px 10px 20px;
    }

    .navbar-left-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 20px;
    }

    .navbar-brand-logo {
        /*width: 120px;*/
    }

    .header a, .footer a {
        color: #666;
        text-decoration: none;
    }

    a {
        -webkit-transition: color .3s ease-out;
        transition: color .3s ease-out;
    }

    .navbar-right-container {
        display: none;
        justify-content: flex-start;
        align-items: center;
    }

    .navbar-menu-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 10px;
    }

    .navbar-link {
        padding-left: 15px;
    }

    .navbar-cart-container {
        position: relative;
    }

    .navbar-cart-count {
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -9px;
        right: -11px;
        width: 20px;
        border-radius: 10px;
        color: white;
        background-color: #eb767d;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
    }

    .navbar-cart-logo {
        width: 25px;
        height: 25px;
        transform: scaleX(-1);
    }
</style>

<script>
    import axios from 'axios'
    import {mapState} from 'vuex'

    export default {
        computed: {
            // nickName(){
            //     return this.$store.state.nickName;
            // },
            ...mapState(['nickName'])
        },

        methods:{
            logOut() {
                axios.post("/users/logout").then((response) => {
                    let res = response.data;
                    if (res.status == "0") {
                        this.$store.commit("updateUserInfo", '')
                        this.$router.push("/")
                    }
                })
            },
        }
    }
</script>

