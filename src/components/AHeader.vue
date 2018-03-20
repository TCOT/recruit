<template>
    <div class="wrapAHeader">
        <div class="banner">
            <div class="header-inner">
                <i class="fa fa-user-circle fa-2x" style="font-size: 40px"></i>
                <span style="margin-left:20px ;font-size: 22px">教师端</span>
                <div class="info"><span style="font-size: 22px;margin-right: 20px;" v-text="nickName"></span>
                    <el-button type="primary" round size="small" @click="logOut">安全退出</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .wrapAHeader {
        .info {
            justify-content: flex-end;
            display: flex;
            flex: 1;
            align-items: center;
        }

        .header-inner {
            position: relative;
            display: flex;
            width: 1200px;
            height: 52px;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -moz-box-align: center;
            margin: 0 auto;
            align-items: center;
        }

        .banner {
            z-index: 100;
            position: relative;
            min-width: 1032px;
            height: 52px;
            background-color: white;
            box-shadow: 0 3px 3px 0 rgba(26, 26, 26, .1);
        }
    }
</style>

<script>
    import axios from 'axios'
    import {mapState} from 'vuex'

    export default {
        computed: {
            nickName() {
                return this.$store.state.nickName;
            },
            // ...mapState(['nickName'])
        },
        methods: {
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

