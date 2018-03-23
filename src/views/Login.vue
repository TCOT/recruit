<template>
    <div class="wrapLogin">
        <div class="top">
            <div class="loginPage-contetn">
                <div class="title">
                    <span style="color: #409EFF;font-size: 20px">信息工程学院项目发布中心</span>
                </div>
                <el-card class="loginCard">
                    <el-tabs>
                        <el-tab-pane label="登陆" style="display: block">
                            <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="100px">
                                <el-form-item label="学号" prop="userName" inline-message>
                                    <el-input clearable
                                              auto-complete="off" v-model="ruleForm1.userName" placeholder="请输入学号"
                                              style="width: 200px;"></el-input>
                                </el-form-item>
                                <el-form-item label="密码" prop="userPwd">
                                    <el-input type="password" v-model="ruleForm1.userPwd" @keyup.enter="login"
                                              placeholder="请输入密码"
                                              style="width: 200px;"
                                              clearable></el-input>
                                </el-form-item>
                                <div class="a" style="text-align: left">
                                    <el-button type="primary" size="medium" @click="login"
                                               style="">登入
                                    </el-button>
                                    <el-switch
                                            style="margin-left: 30px"
                                            v-model="rememberMe"
                                            active-color="#13ce66"
                                            inactive-color="#dcdfe6">
                                    </el-switch>
                                    记住我
                                </div>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="注册">
                            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                                     class="demo-ruleForm">
                                <el-form-item label="学号" prop="userName2" style="text-align: left">
                                    <el-input
                                            v-model="ruleForm2.userName2"
                                            style="width: 200px;"
                                            placeholder="请输入学号" auto-complete="off" @keyup=""></el-input>
                                </el-form-item>
                                <el-form-item label="密码" prop="pass" style="text-align: left">
                                    <el-input placeholder="请输入密码"
                                              style="width: 200px;"
                                              type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="checkPass" style="text-align: left">
                                    <el-input placeholder="请确认学号" style="width: 200px;"
                                              type="password" v-model="ruleForm2.checkPass"
                                              auto-complete="off"></el-input>
                                </el-form-item>

                                <div class="b" style="text-align: left;margin-top: 30px">
                                    <el-button type="primary" @click="register">注册</el-button>
                                    <el-button @click="resetForm('ruleForm2')">清空</el-button>
                                </div>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </div>
            <a-footer style="position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0 auto;"></a-footer>
        </div>
    </div>

</template>

<script>
    import AFooter from '../components/AFooter'
    import axios from 'axios'

    export default {
        data() {
            var validatePass1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                }
            }
            var chaeckUserName1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('学号不能为空'));
                }
            }
            var chaeckUserName2 = (rule, value, callback) => {
                var reg1 = /^\d\d\d\d\d\d(?:\d|\d\d|\d\d\d|\d\d\d\d)?$/

                if (value === '') {
                    callback(new Error('请输入学号'));
                    this.flag1 = false
                } else if (!reg1.test(value)) {
                    callback(new Error('学号只允许6-10位的数字'));
                    this.flag1 = false
                } else {
                    axios.post("/users/cheackRegister", {
                        userName: this.ruleForm2.userName2
                    }).then((response) => {
                        let res = response.data;
                        if (res.status == "01") {
                            callback(new Error('该学号已被注册'));
                        } else {
                            callback();
                            this.flag1 = true
                        }
                    })
                }
            }
            var validatePass = (rule, value, callback) => {
                var reg2 = /^[0-9a-zA-Z]{6,16}$/
                if (value === '') {
                    callback(new Error('请输入密码'));
                    this.flag2 = false
                } else if (!reg2.test(value)) {
                    callback(new Error('密码只能由6-16位数字,字母组成'));
                    this.flag2 = false
                } else {
                    callback()
                    this.flag2 = true
                }
            }
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                    this.flag3 = false
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                    this.flag3 = false
                } else {
                    callback()
                    this.flag3 = true
                }
            };
            return {
                rememberMe: false,
                flag1: false,
                flag2: false,
                flag3: false,
                ruleForm1: {
                    userName: '',
                    userPwd: '',
                },
                ruleForm2: {
                    userName2: '',
                    pass: '',
                    checkPass: '',
                },
                rules1: {
                    userName: [
                        {validator: chaeckUserName1, trigger: 'change'}
                    ],
                    userPwd: [
                        {validator: validatePass1, trigger: 'change'}
                    ]
                },
                rules2: {
                    userName2: [
                        {validator: chaeckUserName2, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'change'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'change'}
                    ],
                },
            };
        },
        methods: {
            register() {
                // alert(this.ruleForm2.userName)
                if (this.flag1 && this.flag2 && this.flag3) {
                    this.$confirm('请确认是否注册?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        axios.post("/users/register", {
                            userName: this.ruleForm2.userName2,
                            userPwd: this.ruleForm2.pass
                        }).then((response) => {
                            let res = response.data;
                            if (res.status == "0") {
                                this.$store.commit("updateUserInfo", this.ruleForm2.userName2)
                                this.$router.push("/sindex")
                            }
                        });
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '注册成功!进入个人主页'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消注册'
                        });
                    })

                } else {
                    this.$message({
                        showClose: true,
                        message: '注册存在错误',
                        type: 'error'
                    });
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            login() {
                if (!this.ruleForm1.userName || !this.ruleForm1.userPwd) {
                    this.$message({
                        type: 'error',
                        message: '账号或密码为空',
                        center: true
                    });
                    return;
                }
                axios.post("/users/login", {
                    userName: this.ruleForm1.userName,
                    userPwd: this.ruleForm1.userPwd,
                    rememberMe: this.rememberMe
                }).then((response) => {
                    // alert("---")
                    let res = response.data;
                    if (res.status == "01") {
                        this.$store.commit("updateUserInfo", res.result.userName)
                        this.$router.push("/aindex/projectlist")
                        this.$message({
                            type: 'success',
                            message: '欢迎进入管理界面',
                            center: true
                        });
                    } else if (res.status == "00") {
                        this.$store.commit("updateUserInfo", res.result.userName)
                        this.$router.push("/sindex/sinfo")
                        this.$message({
                            type: 'success',
                            message: '登陆成功，进入个人主页',
                            center: true
                        });
                    } else {
                        this.$message.error('账号或密码错误');
                    }
                });
            }
        },
        components: {
            AFooter
        }
    }
</script>

<style lang="scss">
    .wrapLogin {
        .title{
            text-align: center;
            width: 500px;
            margin: 0 auto;
            clear: both;
            border-bottom: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 20px;
        }
        .loginPage-contetn {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 2px;
            min-height: 688px;
            height: calc(100% - 42px);
            box-sizing: border-box;
        }

        .el-tabs__content {
            display: flex;
        }

        .el-form-item__label {
            font-size: 18px;
            color: #1a1a1a;
            text-align: left;
        }

        .el-tabs__item {
            font-size: 17px;
        }

        .top {
            background-image: url(./../assets/0.png);
            background-attachment: fixed;
            background-repeat: no-repeat;
            background-size: cover;
            width: 100%;
            height: 100vh;
        }

        .loginCard {
            width: 432px;
            height: 350px;
            margin-bottom: 160px;
        }
    }
</style>