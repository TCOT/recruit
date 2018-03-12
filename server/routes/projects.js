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
                    'students.$.remarks': req.param("remarks")
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
                console.log(student)
                user.info.remarks = student.remarks
                user.info.signUpContent = student.signUpContent
                user.info.status = student.checked
                user.info.rate = student.rate
                break
            }
        }
        console.log(user.info)
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
router.post("/listPassSomeone", (req, res, next) => {
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
// router.get("/getStudentsList", (req, res, next) => {
//     var signUpStudents = []
//     Project.findOne({projectId: req.param('projectId')}, (err1, doc1) => {
//         if (err1) {
//             res.json({
//                 status: "1",
//                 msg: err1.message
//             });
//         } else {
//             if (doc1) {
//                 doc1.students.forEach((item) => {
//                     User.findOne({userName: item.studentUserName}, (err2, user) => {
//                         if (err2) {
//                             res.json({
//                                 status: "1",
//                                 msg: err2.message
//                             });
//                         } else {
//                             signUpStudents.push(user.info)
//                         }
//                     })
//                 })
//                 console.log(signUpStudents)
//                 res.json({
//                     status: "0",
//                     msg: 'suc',
//                     result:{
//                         students:signUpStudents
//                     }
//                 })
//             }
//         }
//     })
// })
//教师端获取项目列表
router.get("/getAProjects", (req, res, next) => {
    let projects = Project.find()
    projects.exec(function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    list: doc
                }
            });
        }
    })
})
//获取项目详情
router.get("/getContent", async (req, res, next) => {
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
    }
})
//学生提交项目报名信息
router.post("/signUp", (req, res, next) => {
    Project.findOne({projectId: req.body.projectName}, (err1, doc1) => {
        if (err1) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            if (doc1) {
                User.findOne({userName: req.body.userName}, (err2, doc2) => {
                    if (err2) {
                        res.json({
                            status: "1",
                            msg: err2.message
                        })
                    } else {
                        if (doc2) {
                            let createDate = new Date().Format('yyyy-MM-dd');
                            let projects1 = {
                                projectId: doc1.projectId,
                                sigInTime: createDate,
                                projectName: doc1.projectName,
                                signUpContent: req.body.content,
                                checked: "未审核",
                                rate: 0
                            }
                            doc2.projects.push(projects1)
                            doc2.save()
                            var info = {
                                studentUserName: doc2.userName,
                                signUpContent: req.body.content,
                                checked: '未审核',
                                studentName: doc2.info.name,
                                remarks: ''
                            }
                            doc1.students.push(info);
                            doc1.stuNum++
                            doc1.save((err3, doc3) => {
                                if (err3) {
                                    res.json({
                                        status: "1",
                                        msg: err3.message
                                    })
                                } else {
                                    res.json({
                                        status: '0',
                                        msg: '',
                                        result: 'suc'
                                    })
                                }
                            })
                        }
                    }
                })
            }
        }
    })
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
router.get("/getProjects", (req, res, next) => {
    let projects = Project.find()
    projects.exec(function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            });
        }
    })
})
//发布项目
router.post("/publish", (req, res, next) => {
    var platform = '622';
    console.log("111")
    var r1 = Math.floor(Math.random() * 10);
    var r2 = Math.floor(Math.random() * 10);
    var sysDate = new Date().Format('yyyyMMddhhmmss')
    var createDate = new Date().Format('yyyy-MM-dd');
    var project = mongoose.model("Project");
    var newProject = new project
    ({
        projectName: req.body.projectName,
        projectContent: req.body.projectContent,
        projectId: platform + r1 + sysDate + r2,
        publisher: req.body.userName,
        releaseTime: createDate,
        stuNum: 0,
        students: []
    })
    console.log(newProject)
    newProject.save(function (err2, doc2) {
        if (err2) {
            res.json({
                status: "1",
                msg: err2.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: 'suc'
            })
        }
    })
})


module.exports = router;