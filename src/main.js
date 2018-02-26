// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import quillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// import store from './store/index.js';
import Util from './assets/lib/util';

import './assets/font-awesome-4.7.0/css/font-awesome.min.css'

Vue.use(Vuex);
Vue.use(ElementUI)
Vue.use(quillEditor)


Vue.config.productionTip = false

const store = new Vuex.Store({
    state: {
        nickName: '',
        project:'',
        selection:0
    },
    mutations: {
        //更新用户信息
        updateUserInfo(state, nickName) {
            state.nickName = nickName;
        },
        //更新项目详情
        updateProject(state, project) {
            state.project = project;
        },
        updateSelection(state, selection) {
            state.selection = selection;
        },
    }
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    mounted() {
     this.checkLogin()

    },
    methods: {
        checkLogin() {
            axios.get("/users/checkLogin").then((response) => {
                var res = response.data;
                var path = this.$route.pathname;
                if (res.status == "0") {
                    this.$store.commit("updateUserInfo", res.result.userName)
                    if (res.result.auth == "1") {
                        this.$router.push("/aindex")
                    }else {
                        this.$router.push("/sindex")
                    }
                } else {
                    console.log("初始化")
                    if (this.$route.path != "/") {
                        this.$router.push("/");
                    }
                }
            });
        }
    },
    components: {App},
    template: '<App/>'
})
