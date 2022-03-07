// src\router\index.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      meta:{auth:true},
      component: () => import('../components/common/Home.vue'),
      children: [
        {
          path: 'manageTeam',
          component: () => import('../components/characters/admin/manageTeam.vue'),
        },
        {
          path: 'manageUser',
          component: () => import('../components/characters/admin/manageUser.vue'),
        },
        {
          path: 'createTeam',
          component: () => import('../components/characters/admin/createTeam.vue'),
        },
        {
          path: 'createUser',
          component: () => import('../components/characters/admin/createUser.vue'),
        },
        {
          path: 'playerTrade',
          component: () => import('../components/characters/ceo/playerTrade.vue'),
        },
        {
          path: 'coachTrade',
          component: () => import('../components/characters/ceo/coachTrade.vue'),
        },
        {
          path: 'jobHistory',
          component: () => import('../components/characters/coach/jobHistory.vue'),
        },
        {
          path: 'jobApplication',
          component: () => import('../components/characters/coach/jobApplication.vue'),
        },
        {
          path: 'jobChanges',
          component: () => import('../components/characters/coach/jobChanges.vue'),
        },
        {
          path: 'transactionIntention',
          component: () => import('../components/characters/player/transactionIntention.vue'),
        },
        {
          path: 'transactionApplication',
          component: () => import('../components/characters/player/transactionApplication.vue'),
        },
        {
          path: 'dataAnalysis',
          component: () => import('../components/characters/gm/dataAnalysis.vue'),
        },
        {
          path: 'teamApp',
          component: () => import('../components/characters/gm/teamApp.vue'),
        },
        {
          path: 'teamPurchase',
          component: () => import('../components/characters/gm/teamPurchase.vue'),
        },
        {
          path: 'coachPurchase',
          component: () => import('../components/characters/gm/coachPurchase.vue'),
        },
        {
          path: 'freePurchase',
          component: () => import('../components/characters/gm/freePurchase.vue'),
        },
        {
          path: 'application',
          component: () => import('../components/characters/gm/application.vue'),
        },
        {
          path: 'cManagment',
          component: () => import('../components/characters/gm/coachManagment.vue'),
        },
        {
          path: 'pManagment',
          component: () => import('../components/characters/gm/playerManagment.vue'),
        },
        {
          path: 'confirm',
          component: () => import('../components/characters/confirm.vue'),
        },
        {
          path: 'contract',
          component: () => import('../components/characters/contract.vue'),
        },
        {
          path: 'settings',
          component: () => import('../components/characters/settings.vue'),
        },
      ]
    },
    {
      path: '/center',
      component: () => import('../components/page/Center.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/page/login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/page/register.vue'),
    },
    {
      path: '/header',
      component: () => import('../components/common/Header.vue'),
    },
  ]
})


router.beforeEach((to, from, next) => {
  if (to.path === '/login') {    //若要跳转的页面是登录界面
    next();     //直接跳转
  }
  else if (to.path === '/home'){   //若要跳转的页面是个人界面
    let token = localStorage.getItem('token');    //获取本地存储的token值
    if (token===null||token===''){    //若token为空则验证不成功，跳转到登录页面
      next('/login');
    }
    else{           //不为空则验证成功
      next();
    }
  }
  else{
    next();
  }
});
 
export default router;
