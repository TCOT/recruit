var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
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

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;

//提交个人信息
router.post("/submitInfo", (req, res, next) => {
    User.update({userName: req.body.userName}, {
        "info.name": req.body.name,
        "info.sex": req.body.sex,
        "info.major": req.body.major,
        "info.classNum": req.body.classNum,
        "info.qqNum": req.body.qqNum,
        "info.phoneNum": req.body.phoneNum
    }, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: 'suc'
            });
        }
    })
})
//发布项目
router.post("/publish", (req, res, next) => {
    User.findOne({userName: req.body.userName}, (err, userDoc) => {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            if (userDoc) {
                console.log()
                var platform = '622';
                var r1 = Math.floor(Math.random() * 10);
                var r2 = Math.floor(Math.random() * 10);
                var sysDate = new Date().Format('yyyyMMddhhmmss')
                var createDate = new Date().Format('yyyy-MM-dd');
                var doc = {
                    projectName: req.body.projectName,
                    projectContent: req.body.projectContent,
                    projectId: platform + r1 + sysDate + r2,
                    publisher: req.body.userName,
                    releaseTime: createDate
                }
                userDoc.projects.push(doc);
                userDoc.save(function (err2, doc2) {
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
            }
        }
    })

})
//获取个人信息
router.get("/getUserInfo", (req, res, next) => {
    User.findOne({userName: req.param("userName")}, (err1, doc1) => {
        if (err1) {
            res.json({
                status: "1",
                msg: err1.message
            })
        } else {
            if (doc1) {
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        info: doc1.info
                    }
                });
            }
        }
    })
})
//学生获取报名信息
router.get("/getInfo", (req, res, next) => {
    User.findOne({userName: req.param("userName")}, (err1, doc1) => {
        if (err1) {
            res.json({
                status: "1",
                msg: err1.message
            })
        } else {
            if (doc1) {
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        projects: doc1.projects
                    }
                });
            }
        }
    })
})
//用户注册
router.post("/register", (req, res, next) => {
    var user = mongoose.model("User")
    var platform = '622';
    var r1 = Math.floor(Math.random() * 10);
    var r2 = Math.floor(Math.random() * 10);
    var sysDate = new Date().Format('yyyyMMddhhmmss')
    var newUser = new user({
        userId: platform + r1 + sysDate + r2,
        userName: req.body.userName,
        userPwd: req.body.userPwd,
        auth: 0,
        projects: [],
        info: {
            userName: req.body.userName,
            name: '',
            sex: '',
            major: '',
            classNum: '',
            qqNum: '',
            phoneNum: ''
        }
    })
    newUser.save(function (err1, doc1) {
        if (err1) {
            res.json({
                status: "1",
                msg: err1.message
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
//用户注册校验
router.post("/cheackRegister", (req, res, next) => {
    User.findOne({userName: req.body.userName}, (err1, doc1) => {
        if (err1) {
            res.json({
                status: "1",
                msg: err1.message
            })
        } else {
            if (doc1) {
                console.log(doc1)
                res.json({
                    status: '01',
                    msg: '此学号已注册'
                })
            } else {
                res.json({
                    status: '00',
                    msg: '此学号可用'
                })
            }
        }
    })
})
//登入
router.post("/login", function (req, res, next) {
    var param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    }
    User.findOne(param, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            });
        } else if (doc) {
            if (req.body.rememberMe == true) {
                res.cookie("userId", doc.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60 * 60
                });
                res.cookie("userName", doc.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60 * 60
                });
                res.cookie("userAuth", doc.auth, {
                    path: '/',
                    maxAge: 1000 * 60 * 60 * 60
                });
            }
            if (doc.auth == "1") {
                res.json({
                    status: '01',
                    msg: '',
                    result: {
                        userName: doc.userName
                    }
                })
            } else {
                res.json({
                    status: '00',
                    msg: '',
                    result: {
                        userName: doc.userName
                    }
                })
            }
        } else {
            res.json({
                status: '2',
                msg: '账号或密码不对'
            })
        }
    })
});
//获取项目列表
router.get("/getProjects", (req, res, next) => {

})
//学生报名某项目
router.post("/signUp", (req, res, next) => {
    try {
        User.findOne({userName: req.body.userName}, (err1, doc1) => {
            if (err1) {
                res.json({
                    status: "1",
                    msg: err1.message
                })
            } else {
                if (doc1) {
                    let createDate = new Date().Format('yyyy-MM-dd');
                    let projects1 = {
                        projectId: req.body.projectId,
                        sigInTime: createDate,
                        projectName: req.body.projectName,
                        checked: "未审核",
                        projectContent:content
                    }
                    doc1.projects.push(projects1)
                    doc1.save((err2, doc2) => {
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
                }
            }
        })
    } catch (err) {
        console.log(err)
    }
})
//登入拦截
router.get("/checkLogin", function (req, res, next) {
    if (req.cookies.userId) {
        res.json({
            status: '0',
            msg: '',
            result: {
                userName: req.cookies.userName,
                auth: req.cookies.userAuth
            }
        })
    } else {
        res.json({
            status: '1',
            msg: '未登录',
            result: ''
        });
    }
});
router.post("/logout", function (req, res, next) {
    res.cookie("userId", "", {
        path: "/",
        maxAge: -1
    });
    res.json({
        status: "0",
        msg: '',
        result: ''
    })
});