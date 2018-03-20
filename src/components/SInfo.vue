<template>
    <div class="wrapSInfo">
        <div class="sInfoWrapper" v-loading="loading">
            <div class="infoHeader">
                <span style="margin-right: 15px;">个人信息</span>
                <el-tag :type="last == true?'':'success' "
                        v-if=" first == true ">{{saveInfo}}
                </el-tag>
            </div>
            <div>
                <el-card class="sInfoEditCard" v-loading="loading">
                    <el-form :inline="true" class="sInfoForm">
                        <el-form-item label="姓名:">
                            <el-input @keyup.native="update" v-model="info.name" placeholder="请输入姓名"
                                      value="123"></el-input>
                        </el-form-item>
                        <div
                                style="width:300px;display:flex;align-items:center;margin-bottom:22px;cursor: default">
                            学号:<span style="margin-left: 6px" v-text="this.$store.state.nickName"></span>
                        </div>
                        <el-form-item class="chooseSex" label="性别:">
                            <el-select @change="update" v-model="info.sex"
                                       placeholder="选择性别">
                                <el-option label="男生" value="男生"></el-option>
                                <el-option label="女生" value="女生"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="专业:">
                            <el-input @keyup.native="update" v-model="info.major" placeholder="请输入专业"></el-input>
                        </el-form-item>
                        <el-form-item label="班级:">
                            <el-input @keyup.native="update" v-model="info.classNum" placeholder="请输入班级"></el-input>
                        </el-form-item>

                        <el-form-item label="QQ号:">
                            <el-input @keyup.native="update" v-model="info.qqNum"
                                      placeholder="请输入QQ号"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码:">
                            <el-input @keyup.native="update" v-model="info.phoneNum" placeholder="请输入手机号码"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
            <div style="margin-bottom: 300px"></div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import axios from 'axios'

    export default {
        mounted() {
            this.init()
        },
        methods: {
            debounceChange: _.debounce((self) => {
                let date = new Date();
                let hour = date.getHours();
                let minute = date.getMinutes();
                axios.post("/users/submitInfo", {
                    userName: self.$store.state.nickName,
                    name: self.info.name,
                    sex: self.info.sex,
                    major: self.info.major,
                    classNum: self.info.classNum,
                    qqNum: self.info.qqNum,
                    phoneNum: self.info.phoneNum
                }).then(() => {
                    self.last = true
                    self.saveInfo = '最近保存 ' + hour + ':' + minute
                })
            }, 1800),
            update() {
                this.last = false
                this.first = true
                this.saveInfo = '正在保存...'
                this.debounceChange(this)
            },
            init() {
                this.loading = true
                axios.get("/users/getUserInfo", {
                    params: {
                        userName: this.$store.state.nickName
                    }
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "0") {
                        this.info = res.result.info;
                    }
                    this.loading = false
                })
            }
        },
        data() {
            return {
                info: [],
                loading: false,
                last: false,
                first: false,
                saveInfo: ''
            }
        }
    }
</script>

<style lang="scss">
    .wrapSInfo {
        .sInfoEditCard .el-form-item__label {
            font-size: 16px;
        }

        .chooseSex .el-input--suffix .el-input__inner {
            padding-right: 15px;
        }

        .sInfoForm {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
        }

        .editButtom-inner {
            display: flex;
            justify-content: flex-start;
            margin-top: 10px;
        }

        .infoHeader {
            margin-bottom: 10px;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            justify-content: flex-start;
            height: 32px;
        }

        .sInfoWrapper {
            width: 700px;
            margin-top: 70px;
            margin-left: 70px;
        }
    }
</style>