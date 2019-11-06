import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        // 动态路径参数 以冒号开头
        {
            path: '/',
            component: ()=>import('../pages/Home')
        }
    ]
})

export default router