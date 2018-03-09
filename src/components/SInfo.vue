<template>
    <div class="sInfoWrapper" v-loading="loading">
        <div class="infoHeader" >
            <span>个人信息</span>
        </div>
        <div style="cursor: default"  v-if="this.edit == false">
            <el-card class="sInfoCard" style="flex-wrap: wrap">
                <div style="display: flex;width:660px;justify-content: space-between ">
                    <div style="width: 330px;display: flex;margin-bottom: 20px">
                        姓名：{{this.info.name}}
                    </div>
                    <div style="width: 330px;display: flex;margin-bottom: 20px">
                        学号：{{this.$store.state.nickName}}
                    </div>
                </div>
                <div style="display: flex;width:660px;justify-content: space-between ">
                    <div style="width: 330px;display: flex;margin-bottom: 20px">
                        性别：{{this.info.sex}}
                    </div>
                    <div style="width: 330px;display: flex;margin-bottom: 20px">
                        专业：{{this.info.major}}
                    </div>
                </div>
                <div style="display: flex;width:660px;justify-content: space-between ">
                    <div style="width: 330px;display: flex;margin-bottom: 20px">
                        班级：{{this.info.classNum}}
                    </div>
                    <div style="width: 330px;display: flex;margin-bottom: 20px">
                        QQ号码：{{this.info.qqNum}}
                    </div>
                </div>
                <div style="display: flex;width:660px;justify-content: space-between ">
                    <div style="width: 330px;display: flex;margin-bottom: 20px">
                        手机号码：{{this.info.phoneNum}}
                    </div>

                </div>

            </el-card>
        </div>
        <div v-if="this.edit == true">
            <el-card class="sInfoEditCard" v-loading="loading">
                <el-form :inline="true" class="sInfoForm">
                    <el-form-item label="姓名:">
                        <el-input v-model="name" placeholder="请输入姓名" value="123"></el-input>
                    </el-form-item>
                    <div
                            style="width:300px;display:flex;align-items:center;margin-bottom:22px;cursor: default">
                        学号:<span style="margin-left: 6px" v-text="nickName"></span>
                    </div>
                    <el-form-item class="chooseSex" label="性别:">
                        <el-select v-model="sex" placeholder="选择性别">
                            <el-option label="男生" value="男生"></el-option>
                            <el-option label="女生" value="女生"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业:">
                        <el-input v-model="major" placeholder="请输入专业"></el-input>
                    </el-form-item>
                    <el-form-item label="班级:">
                        <el-input v-model="classNum" placeholder="请输入班级"></el-input>
                    </el-form-item>

                    <el-form-item label="QQ号:">
                        <el-input v-model="qqNum" placeholder="请输入QQ号"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码:">
                        <el-input v-model="phoneNum" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
        <div class="editButtom-inner" v-if="this.edit == false">
            <el-button class="editButtom" size="small" type="primary" icon="el-icon-edit"
                       @click="toEdit"
            >编辑
            </el-button>
        </div>
        <div class="editButtom-inner" v-if="this.edit == true">
            <el-button class="editButtom" size="small" type="primary" icon="el-icon-check"
                       @click="toSubmit"
            >提交信息
            </el-button>
            <el-button class="editButtom" size="small" type="primary" icon="el-icon-back"
                       @click="toBack"
            >返回
            </el-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        mounted() {
            this.init()
        },
        methods: {
            toSubmit(){
                this.$confirm('是否提交修改?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post("/users/submitInfo", {
                        userName:this.$store.state.nickName,
                        name: this.name,
                        sex: this.sex,
                        major:this.major,
                        classNum:this.classNum,
                        qqNum:this.qqNum,
                        phoneNum:this.phoneNum
                    }).then((response) => {
                        let res = response.data;
                        if (res.status == "0") {
                            this.loading=true
                            this.init()
                        }
                    })
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
                });
            },
            toBack(){
                    this.edit = false
                },
            toEdit(){
                this.edit = true
                this.name = this.info.name
                this.sex = this.info.sex
                this.major = this.info.major
                this.classNum = this.info.classNum
                this.qqNum = this.info.qqNum
                this.phoneNum = this.info.phoneNum
            },
            init() {
                this.edit = false
                axios.get("/users/getUserInfo", {
                    params: {
                        userName : this.$store.state.nickName
                    }
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "0") {
                        this.info = res.result.info;
                    }
                    this.loading=false

                })
            }
        },
        computed: {
            nickName() {
                return this.$store.state.nickName;
            },
            // ...mapState(['nickName'])
        },
        data() {
            return {
                info:[],
                name: '',
                sex: '',
                major: '',
                classNum: '',
                qqNum: '',
                phoneNum: '',
                loading:true,
                edit:false
            }
        }
    }
</script>

<style>
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

    }

    .sInfoWrapper {
        width: 700px;
        margin-top: 70px;
        margin-left: 70px;
    }
</style>