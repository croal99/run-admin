/**
 * Created by zzmhot on 2017/3/23.
 *
 * 路由Map
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:30
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//import components
//view page warp component
import viewPageComponent from 'pages/App'

//home
import homeComponent from 'pages/home'
//404
import noPageComponent from 'pages/error/404'
//login
import loginComponent from 'pages/user/login'
//base table
import baseTableComponent from 'pages/table/base'
//sort table
import sortTableComponent from 'pages/table/sort'
//save table
import saveTableComponent from 'pages/table/save'
//bar charts
import barChartsComponent from 'pages/charts/bar'

// 关卡列表
import checkpointListComponent from 'pages/checkpoint/list'
// 关卡任务安排
import processComponent from 'pages/checkpoint/process'
// 关卡编辑
import checkpointEditComponent from 'pages/checkpoint/edit'

// 题库列表
import questionListComponent from 'pages/question/list'
// 题库编辑
import questionEditComponent from 'pages/question/edit'

// 圖片管理
import pictureListComponent from 'pages/media/picture/list'
import pictureEditComponent from 'pages/media/picture/edit'

// 音频管理
import audioListComponent from 'pages/media/audio/list'
import audioEditComponent from 'pages/media/audio/edit'

// 玩家管理
import playerListComponent from 'pages/player/list'
import playerRecordComponent from 'pages/player/record'

// 口令管理
import passphraseListComponent from 'pages/passphrase/list'
import passphraseEditComponent from 'pages/passphrase/edit'

Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [{
  path: '/404',
  name: 'notPage',
  component: noPageComponent
}, {
  path: '*',
  redirect: '/404'
}, {
  path: '/user/login',
  name: 'login',
  component: loginComponent
}, {
  path: '/',
  redirect: '/home',
  component: viewPageComponent,
  children: [{
      path: '/home',
      name: 'home',
      component: homeComponent,
      meta: {
        title: "主页",
        auth: true
      }
    },
    {
      path: '/checkpoint/list',
      name: 'checkpointList',
      component: checkpointListComponent,
      meta: {
        title: "关卡管理",
        auth: true
      }
    },
    {
      path: '/checkpoint/process/:id',
      name: 'checkpointProcess',
      component: processComponent,
      meta: {
        title: "任务进程",
        auth: true
      }
    },
    {
      path: '/checkpoint/edit/:id',
      name: 'checkpointEdit',
      component: checkpointEditComponent,
      meta: {
        title: "关卡编辑",
        auth: true
      }
    },
    {
      path: '/checkpoint/add',
      name: 'checkpointAdd',
      component: checkpointEditComponent,
      meta: {
        title: "添加关卡",
        auth: true
      }
    },
    {
      path: '/question/list',
      name: 'questionList',
      component: questionListComponent,
      meta: {
        title: "题库管理",
        auth: true
      }
    },
    {
      path: '/question/edit',
      name: 'questionEdit',
      component: questionEditComponent,
      meta: {
        title: "题库编辑",
        auth: true
      }
    },
    {
      path: '/question/add',
      name: 'questionAdd',
      component: questionEditComponent,
      meta: {
        title: "添加题库",
        auth: true
      }
    },
    {
      path: '/media/picture/list',
      name: 'pictureAdd',
      component: pictureListComponent,
      meta: {
        title: "图片列表",
        auth: true
      }
    },
    {
      path: '/media/picture/edit',
      name: 'pictureEdit',
      component: pictureEditComponent,
      meta: {
        title: "图片編輯",
        auth: true
      }
    },
    {
      path: '/media/audio/list',
      name: 'audioAdd',
      component: audioListComponent,
      meta: {
        title: "音频列表",
        auth: true
      }
    },
    {
      path: '/media/audio/edit',
      name: 'audioEdit',
      component: audioEditComponent,
      meta: {
        title: "音频編輯",
        auth: true
      }
    },
    {
      path: '/passphrase/list',
      name: 'passphraseList',
      component: passphraseListComponent,
      meta: {
        title: "口令列表",
        auth: true
      }
    },
    {
      path: '/passphrase/edit',
      name: 'passphraseEdit',
      component: passphraseEditComponent,
      meta: {
        title: "编辑口令",
        auth: true
      }
    },
    {
      path: '/player/list',
      name: 'playerList',
      component: playerListComponent,
      meta: {
        title: "玩家列表",
        auth: true
      }
    },
    {
      path: '/player/record',
      name: 'playerRecord',
      component: playerRecordComponent,
      meta: {
        title: "玩家记录",
        auth: true
      }
    },
    {
      path: '/table/base',
      name: 'tableBase',
      component: baseTableComponent,
      meta: {
        title: "基本表格",
        auth: true
      }
    }, {
      path: '/table/sort',
      name: 'tableSort',
      component: sortTableComponent,
      meta: {
        title: "排序表格",
        auth: true
      }
    }, {
      path: '/table/update/:id',
      name: 'tableUpdate',
      component: saveTableComponent,
      meta: {
        title: "数据修改",
        auth: true
      }
    }, {
      path: '/table/add',
      name: 'tableAdd',
      component: saveTableComponent,
      meta: {
        title: "添加数据",
        auth: true
      }
    }, {
      path: '/charts/bar',
      name: 'chartsBar',
      component: barChartsComponent,
      meta: {
        title: "柱状图表",
        auth: true
      }
    }
  ]
}]

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start()
  let toName = to.name
  // let fromName = from.name
  let is_login = store.state.user_info.login

  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    })
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
