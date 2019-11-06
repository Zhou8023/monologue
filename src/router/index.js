import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        // 动态路径参数 以冒号开头
        {
            path: '/',
            component: () => import('../pages/login/Login')
        },
        {
            path: '/home',
            component: () => import('../pages/home/Home')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

router.beforeEach((to, from, next) => {
    var user = localStorage.getItem('name')
    if (user) {
        if (to.path === '/') {
            next({ path: '/home' })
        } else {
            next()
        }
    } else {
        if (to.path !== '/') {
            next({ path: '/' })
        } else {
            next()
        }
    }
})

export default router