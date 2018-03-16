var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('./../models/project');
var User = require('./../models/user');
require('./../util/util')
//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/recruit');
mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success.")
});
mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail.")
});
mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected.")
});
//项目发布自动保存
router.post("/publishSave", async (req, res, next) => {
    try {
        User.update({'userName': req.body.userName},
            {
                '$set': {
                    'draft.title': req.body.title,
                    'draft.content': req.body.content,
                }
            }, (err) => {
            })
        res.json({
            status: '0',
            msg: ''
        })
    } catch (err) {
        console.log(err)
        res.json({status: "1", msg: err.message});
    }
})
//自动保存评分
router.post("/rateChange", async (req, res, next) => {
    try {
        Project.update({
                'projectId': req.body.projectId,
                'students.studentUserName': req.body.userName
            },
            {
                '$set': {
                    'students.$.rate': req.param("rate")
                }
            }, (err) => {
            })
        res.json({
            status: '0',
            msg: ''
        })
    } catch (err) {
        console.log(err)
        res.json({status: "1", msg: err.message});
    }
})
//自动保存备注
router.post("/editRemark", async (req, res, next) => {
    try {
        Project.update({
                'projectId': req.body.projectId,
                'students.studentUserName': req.body.userName
            },
            {
                '$set': {
                    'students.$.remarks': req.body.remarks
                }
            }, (err) => {
            })
        res.json({
            status: '0',
            msg: ''
        })
    } catch (err) {
        console.log(err)
        res.json({status: "1", msg: err.message});
    }
})
//获得一个学生详细信息
router.get("/getStuDetailInfo", async (req, res, next) => {
    try {
        let project = await Project.findOne({projectId: req.param("projectId")})
        let user = await User.findOne({userName: req.param("userName")})
        for (let student of project.students) {
            if (student.studentUserName == req.param("userName")) {
                user.info.remarks = student.remarks
                user.info.signUpContent = student.signUpContent
                user.info.status = student.checked
                user.info.rate = student.rate
                break
            }
        }
        res.json({
            status: '0',
            msg: '',
            result: {
                userInfo: user.info
            }
        });
    } catch (err) {
        res.json({status: "1", msg: err.message});
    }
})
//教师端获取一个未审核的学生
router.get("/getNoCheckedUser", async (req, res, next) => {
    try {
        let project = await Project.findOne({projectId: req.param("projectId")})
        let content = ''
        for (let student of project.students) {
            if (student.checked == "未审核") {
                let user = await User.findOne({userName: student.studentUserName})
                for (let sproject of user.projects) {
                    if (sproject.projectId == req.param("projectId")) {
                        content = sproject.signUpContent
                        res.json({
                            status: '0',
                            msg: '',
                            result: {
                                noCheckedUser: user.info,
                                noCheckedUserSignUpContent: content
                            }
                        });
                        break
                    }
                }
                break
            }
        }
        res.json({
            status: '1',
            msg: '所有人均通过'
        });
    } catch (err) {
        res.json({status: "1", msg: err.message});
    }
})
//列表拒绝某个学生
router.post("/listRefuseSomeone", (req, res, next) => {
    Project.update({'projectId': req.body.projectId, 'students.studentUserName': req.body.userName},
        {
            '$set': {
                'students.$.checked': '已拒绝'
            }
        }, (err) => {
        })
    User.update({'userName': req.body.userName, 'projects.projectId': req.body.projectId},
        {
            '$set': {
                'projects.$.checked': '已拒绝'
            }
        }, (err) => {
        })
    res.json({
        status: '0',
        msg: 'suc'
    })
})
//列表通过某个学生
router.post("/listPassSomeone", async (req, res, next) => {
    try {
        Project.update({'projectId': req.body.projectId, 'students.studentUserName': req.body.userName},
            {
                '$set': {
                    'students.$.checked': '已通过'
                }
            }, (err) => {
            })
        User.update({'userName': req.body.userName, 'projects.projectId': req.body.projectId},
            {
                '$set': {
                    'projects.$.checked': '已通过'
                }
            }, (err) => {
            })
        res.json({
            status: '0',
            msg: 'suc'
        })
    } catch (err) {
        console.log(err)
        res.json({status: "1", msg: err.message});
    }
})
//教师端拒绝某个学生
router.post("/refuseSomeone", (req, res, next) => {
    Project.update({'projectId': req.body.projectId, 'students.studentUserName': req.body.userName},
        {
            '$set': {
                'students.$.checked': '已拒绝'
            }
        }, (err) => {
        })
    User.update({'userName': req.body.userName, 'projects.projectId': req.body.projectId},
        {
            '$set': {
                'projects.$.checked': '已拒绝'
            }
        }, (err) => {
        })
    res.json({
        status: '0',
        msg: 'suc'
    })
})
//教师端通过某个学生
router.post("/passSomeone", (req, res, next) => {
    Project.update({'projectId': req.body.projectId, 'students.studentUserName': req.body.userName},
        {
            '$set': {
                'students.$.checked': '已通过',
            }
        }, (err) => {
        })
    User.update({'userName': req.body.userName, 'projects.projectId': req.body.projectId},
        {
            '$set': {
                'projects.$.checked': '已通过'
            }
        }, (err) => {
        })
    res.json({
        status: '0',
        msg: 'suc'
    })
})
//获取具体项目报名学生列表
router.get("/getStudentsList", async (req, res, next) => {
    try {
        let project = await Project.findOne({projectId: req.param('projectId')});
        let signUpStudents = []
        for (const student of project.students) {
            let user = await User.findOne({userName: student.studentUserName})
            user.info.status = student.checked
            user.info.rate = student.rate
            signUpStudents.push(user.info)
        }
        console.log(signUpStudents)
        res.json({
            status: "0", msg: 'suc', result: {
                students: signUpStudents,
                total: project.stuNum
            }
        });
    } catch (err) {
        res.json({status: "1", msg: err.message});
    }
})
//获取教师端项目列表
router.get("/getAProjects", async (req, res, next) => {
    try {
        let projects = await Project.find()
        console.log(projects)
        res.json({
            status: '0',
            msg: '',
            result: {
                list: projects
            }
        })
    } catch (err) {
        console.log(err)
        res.json({
            status: "1",
            msg: err.message
        })
    }
})
//学生端项目详情页初始化
router.get("/sGetSignUpContentInit", async (req, res, next) => {
    try {
        let signUpStatus = false
        let SignUpContent = ''
        let checkedStatus = ''
        let signUpDraftContent
        let user = await User.findOne({userName: req.param("userName")})
        for (let draft of user.sDraft) {
            if (draft.projectId == req.param("projectId")) {
                signUpDraftContent = draft.signUpContent
                break
            }
        }
        let project = await Project.findOne({projectId: req.param("projectId")})
        for (let student of project.students) {
            if (student.studentUserName == req.param("userName")) {
                signUpStatus = true
                SignUpContent = student.signUpContent
                if (student.checked !== '已通过' && student.checked !== '已拒绝') {
                    checkedStatus = '审核中'
                } else {
                    checkedStatus = student.checked
                }
                break
            }
        }
        res.json({
            status: '0',
            msg: '',
            result: {
                signUpDraftContent: signUpDraftContent,
                checkedStatus: checkedStatus,
                SignUpContent: SignUpContent,
                project: project,
                signUpStatus: signUpStatus
            }
        })
    }
    catch (err) {
        console.log(err)
        res.json({
            status: "1",
            msg: err.message
        })
    }
})
//教师端获取具体项目内容
router.get("/aGetProjectDetail", async (req, res, next) => {
    try {
        let project = await Project.findOne({projectId: req.param("projectId")})
        console.log(project)
        res.json({
            status: '0',
            msg: '',
            result: {
                project: project
            }
        })
    }
    catch (err) {
        console.log(err)
        res.json({
            status: "1",
            msg: err.message
        })
    }
})
//学生提交项目报名信息
router.post("/signUp", async (req, res, next) => {
    try {
        User.update({'userName': req.body.userName, 'sDraft.projectId': req.body.projectId},
            {
                '$set': {
                    'sDraft.$.signUpContent': ''
                }
            }, (err) => {
            })
        let project = await Project.findOne({projectId: req.body.projectId})
        let user = await User.findOne({userName: req.body.userName})
        let createDate = new Date().Format('yyyy-MM-dd');
        let projects1 = {
            projectId: req.body.projectId,
            sigInTime: createDate,
            projectName: project.projectName,
            signUpContent: req.body.content,
            checked: "未审核"
        }
        user.projects.push(projects1)
        user.save()
        var info = {
            studentUserName: user.userName,
            signUpContent: req.body.content,
            checked: '未审核',
            studentName: user.info.name,
            remarks: '',
            rate: 0
        }
        project.students.push(info);
        project.stuNum++
        project.save()
        res.json({
            status: '0',
            msg: '',
            result: 'suc'
        })
    } catch (err) {
        console.log(err)
        res.json({
            status: "1",
            msg: err.message
        })
    }
})
//学生获取项目列表
router.get("/getInfo", (req, res, next) => {
    let projects = Project.find()
    projects.exec((err1, doc1) => {
        if (err1) {
            res.json({
                status: '1',
                msg: err1.message
            })
        } else {
            if (doc1) {

            }
        }
    })
})
//学生端获取项目列表
router.get("/getProjects", async (req, res, next) => {
    try {
        let projects = await Project.find()
        let sendProjects = []
        for (let project of projects) {
            let item = {
                projectId: project.projectId,
                publisher: project.publisher,
                signUpTime: project.signUpTime,
                projectName: project.projectName,
                draftStatus: false
            }
            sendProjects.push(item)
        }
        let user = await User.findOne({userName: req.param("userName")})
        for (let draft of user.sDraft) {
            if (draft.signUpContent !== '' && draft.signUpContent) {
                for (let project of sendProjects) {
                    if (project.projectId == draft.projectId) {
                        project.draftStatus = true
                        break
                    }
                }
            }
        }
        res.json({
            status: '0',
            msg: '',
            result: {
                projects: sendProjects
            }
        })
    } catch (err) {
        console.log(err)
        res.json({
            status: "1",
            msg: err.message
        })
    }
})
//发布项目
router.post("/publish", async (req, res, next) => {
    try {
        var platform = '622';
        let user = await User.findOne({userName:req.body.userName})
        await User.update({'userName': req.body.userName},
            {
                '$set': {
                    'draft.title': '',
                    'draft.content': '',
                }
            }, (err) => {
            })
        var r1 = Math.floor(Math.random() * 10);
        var r2 = Math.floor(Math.random() * 10);
        var sysDate = new Date().Format('yyyyMMddhhmmss')
        var project = mongoose.model("Project");
        var newProject = new project
        ({
            projectName: req.body.projectName,
            projectContent: req.body.projectContent,
            projectId: platform + r1 + sysDate + r2,
            publisher: req.body.userName,
            signUpTime:req.body.signUpTime,
            stuNum: 0,
            students: []
        })
        await newProject.save()
        res.json({
            status: '0',
            msg: '',
            result: 'suc'
        })
    } catch (err) {
        console.log(err)
        res.json({
            status: "1",
            msg: err.message
        })
    }
})


module.exports = router;