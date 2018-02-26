import Vue from 'vue'
import Router from 'vue-router'

import AIndex from '@/views/AIndex'
import CheckLogin from '@/views/CheckLogin'
import Entry from '@/views/Login'
import SIndex from '@/views/SIndex'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name:'Entry',
            component:Entry
        },
        {
            path:'/aindex',
            name:'AIndex',
            component:AIndex
        },
        {
            path:'/entry',
            name:'Entry',
            component:Entry
        },
        {
            path:'/sindex',
            name:'SIndex',
            component:SIndex
        }
    ]
})
