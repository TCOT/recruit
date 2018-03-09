import Vue from 'vue'
import Router from 'vue-router'

import AIndex from '@/views/AIndex'
import Entry from '@/views/Login'
import SIndex from '@/views/SIndex'
import SProjects from '@/components/SProjects'
import SInof from '@/components/SInfo'
import JoinInfo from '@/components/JoinInfo'
import SignUp from '@/components/SignUp'
import ProjectList from '@/components/ProjectList'
import ProjectDetail from '@/components/ProjectDetail'
import Publish from '@/components/Publish'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Entry',
            component: Entry
        },
        {
            path: '/aindex',
            component: AIndex,
            children:[{
                path:'projectlist',
                component:ProjectList
            },{
                path:'project/:projectId',
                component:ProjectDetail
            },{
                path:'publish',
                component:Publish
            }]
        },
        {
            path: '/entry',
            name: 'Entry',
            component: Entry
        },
        {
            path: '/sindex',
            component: SIndex,
            children: [{
                path: 'sinfo',
                component: SInof
            },{
                path: 'sprojects',
                component: SProjects,
            },{
                path: 'joininfo',
                component: JoinInfo
            },{
                path: 'sprojects/:id',
                component: SignUp
            }]
        },

    ]
})
