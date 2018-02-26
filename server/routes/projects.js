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

//教师端获取项目列表
router.get("/getAProjects",(req,res,next)=>{
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
router.get("/getContent", (req, res, next) => {
    Project.findOne(req.param.projectId, (err, doc) => {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    project: doc
                }
            });
        }
    })
})

//学生提交项目报名信息
router.post("/submit", (req, res, next) => {
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
                            msg: err.message
                        })
                    } else {
                        if (doc2) {
                            var info = {
                                studentName: doc2.userName,
                                studentInfo: req.body.content,
                                remarks: ''
                            }
                            doc1.students.push(info);
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
        releaseTime: createDate
    })
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