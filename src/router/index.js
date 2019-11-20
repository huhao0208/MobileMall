import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Index from '../components/Index.vue'
import Vip from '../components/Vip.vue'
import ShopCar from '../components/ShopCar.vue'
import Search from '../components/Search.vue'
import NewList from '../components/home/NewList.vue'
import NewsDetail from '../components/home/NewsDetail.vue'
import PhotoShar from '../components/home/PhotoShar.vue'
import Buy from '../components/home/Buy.vue'
import PhotoDetails from '../components/home/PhotoDetails.vue'
import Shopping from '../components/home/Shopping.vue'
import GoodsComment from '../components/home/GoodsComment.vue'
import map from '../components/home/mapmap.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/index',
    children: [
      { path: '/index', component: Index },
      { path: '/newslist', component: NewList },
      { path: '/newslist/newsdetail/:id', component: NewsDetail },
      { path: '/photoshar', component: PhotoShar },
      { path: '/buy', component: Buy },
      { path: '/photodetails/:id', component: PhotoDetails },
      { path: '/shopping/:id', component: Shopping },
       { path: '/goodscomment/:id', component: GoodsComment },
    { path: '/contact', component: map },

      { path: '/vip', component: Vip },
      { path: '/shopcar', component: ShopCar },
      { path: '/search', component: Search }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
