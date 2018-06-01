import Vue from 'vue'
import Router from 'vue-router'
const Index = r =>require.ensure([],() => r(require('@/pages/index')),'index')
const Search = r =>require.ensure([],() => r(require('@/pages/search')),'search')
const Part = r =>require.ensure([],() => r(require('@/pages/part')),'part')
const Regard = r =>require.ensure([],() => r(require('@/pages/regard')),'regard')
const Down = r =>require.ensure([],() => r(require('@/pages/down')),'down')


//component in Part
const Used = r =>require.ensure([],() => r(require('@/components/part/used')),'used')
const Car = r =>require.ensure([],() => r(require('@/components/part/car')),'car')
const Rent = r =>require.ensure([],() => r(require('@/components/part/houserent')),'rent')
const Merchant = r=>require.ensure([],() => r(require('@/components/part/merchant')),'merchant')
const Cate = r =>require.ensure([],() => r(require('@/components/part/cate')),'cate')
const Jour = r =>require.ensure([],() => r(require('@/components/part/jour')),'jour')
const Work = r=>require.ensure([],() => r(require('@/components/part/work')),'work')
const Privilege = r=>require.ensure([],() => r(require('@/components/part/privilege')),'privilege')
const Rate = r =>require.ensure([],() => r(require('@/components/part/rate')),'rate')
//component in Part end 


const Details = r =>require.ensure([],() => r(require('@/components/part/details')),'details')//详情模块
const DetailT = r =>require.ensure([],() => r(require('@/components/part/detailT')),'detailT')//详情模块222
const PrivilegeDetail = r =>require.ensure([],() => r(require('@/components/part/privilegeDetail')),'privilegeDetail')//优惠详情



Vue.use(Router)

export default new Router({
  routes: [
    {
     path:'/index',
     name:'index',
     component:Index
    },
    {
     path:'/search',
     name:'search',
     component:Search
    },
    {
        path:'/part',
        name:'part',
        component:Part,
        children:[
                {
                    path:'/part/used',
                    name:'used',
                    component:Used
                },
                {
                    path:'/part/car',
                    name:'car',

                    component:Car
                },
                {
                    path:'/part/rent',
                    name:"rent",
                    component:Rent
                },
                {
                    path:'/part/merchant',
                    name:"merchant",
                    component:Merchant
                },
                {
                    path:'/part/cate',
                    name:"cate",
                    component:Cate
                },
                {
                    path:'/part/jour',
                    name:"jour",
                    component:Jour
                },
                {
                    path:'/part/work',
                    name:'work',

                    component:Work
                }
                ,
                {
                    path:'/part/privilege',
                    name:'privilege',

                    component:Privilege
                }
            ]
    },
    {
        path:'/details/:id',
        name:'details',
        component:Details
    },
    {
        path:'/detailT/:id',
        name:'detailT',
        component:DetailT
    },
    {
        path:'/pridetail/:id',
        name:'privilegeDetail',
        component:PrivilegeDetail
    },
    {
        path:'/regard',
        name:'regard',
        component:Regard
    },
     {
        path:'/help',
        name:'help',
        component:Regard
    },
    {
        path:'/rate',
        component:Rate
    },
     {
        path:'/down',
        component:Down
    },
    {path:"/",redirect:"/index"}
    ,
     { path: '*', redirect: "/"}
  ]
})
