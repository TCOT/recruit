<template>
    <div class="top">
        <el-container>
            <el-form ref="form" label-width="80px">
                <el-form-item label="学号">
                    <el-input v-model="userName" placeholder="请输入学号"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="userPwd" @keyup.enter="login" placeholder="请输入密码"></el-input>
                </el-form-item>
                <div class="a">
                    <el-button type="success" size="medium" @click="login">登入</el-button>
                    <el-switch
                            v-model="rememberMe"
                            active-color="#13ce66"
                            inactive-color="#dcdfe6">
                    </el-switch>
                    记住我
                </div>
            </el-form>
        </el-container>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                rememberMe: false,
                userName: '',
                userPwd: '',
                errorTip: false
            }
        },
        methods: {
            login() {
                if (!this.userName || !this.userPwd) {
                    this.errorTip = true;
                    return;
                }
                axios.post("/users/login", {
                    userName: this.userName,
                    userPwd: this.userPwd,
                    rememberMe: this.rememberMe
                }).then((response) => {
                    // alert("---")
                    let res = response.data;
                    if (res.status == "01") {
                        this.$store.commit("updateUserInfo", res.result.userName)
                        this.$router.push("/aindex")
                    } else if (res.status == "00") {
                        this.$store.commit("updateUserInfo", res.result.userName)
                        this.$router.push("/sindex")
                    } else {
                        alert("账号或密码错误")
                    }
                });
            }
        }
    }
</script>

<style>
    .el-form-item__label {
        font-size: 18px;
        color: #e0e0e0;
    }

    .el-container {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0,);

    }

    .el-button {
        margin: 0 30px 0 0;
    }

    .el-button--medium {
        font-size: 18px;
        margin-left: 20px;
    }

    .el-form-item {
        width: 300px;
    }

    .el-form {
        margin: 250px 120px 0px 550px;
    }

    .a {
        width: 350px;
        color: #ffffff;
    }

    .top {
        margin: 0;
        padding: 0;
        font-family: "微软雅黑";
        font-size: 17px;
        background: #444 url("./../assets/3.jpg");
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
        position: absolute;
    }

</style>