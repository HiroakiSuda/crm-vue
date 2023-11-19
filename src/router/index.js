import { createRouter, createWebHashHistory } from 'vue-router'

import store from '../store'

import TheHome from '../views/TheHome';
import TheSignUp from '../views/TheSignUp';
import TheLogIn from '../views/TheLogIn';
import TheDashboard from '../views/dashboard/TheDashboard';
import MyAccount from '../views/dashboard/MyAccount';
import TheLeads from '../views/dashboard/TheLeads';
import AddLead from '../views/dashboard/AddLead';
import TheDetail from '../views/dashboard/TheDetail';
import TheEditLead from '../views/dashboard/TheEditLead';
import AddTeam from '../views/dashboard/AddTeam';
import TheTeam from '../views/dashboard/TheTeam';
import AddMember from '../views/dashboard/AddMember';

const routes = [
  {
    path: '/',
    name: 'TheHome',
    component: TheHome,
    meta: { title:'Home' },
  },
  {
    path: '/signup',
    name: 'TheSignUp',
    component: TheSignUp,
    meta: { title:'Sign Up' },
  },
  {
    path: '/login',
    name: 'TheLogIn',
    component: TheLogIn,
    meta: { title:'Log In' },
  },
  {
    path: '/dashboard',
    name: 'TheDashboard',
    component: TheDashboard,
    meta: { 
      title:'Dashboard',
      requireLogin: true,
    },
  },
  {
    path: '/dashboard/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: { 
      title:'My Account',
      requireLogin: true,
    },
  },
  {
    path: `/dashboard/leads`,
    name: 'TheLeads',
    component: TheLeads,
    meta: { 
      title: 'Leads',
      requireLogin: true,
    },
  },
  {
    path: `/dashboard/leads/add`,
    name: 'AddLead',
    component: AddLead,
    meta: { 
      title: 'AddLead',
      requireLogin: true,
    },
  },
  {
    path: `/dashboard/leads/:id`,
    name: 'TheDetail',
    component: TheDetail,
    meta: { 
      title: 'TheDetail',
      requireLogin: true,
    },
    props: true,
  },
  {
    path: `/dashboard/leads/edit/:id`,
    name: 'TheEditLead',
    component: TheEditLead,
    meta: { 
      title: 'TheEditLead',
      requireLogin: true,
    },
    props: true,
  },
  {
    path: `/dashboard/add-team`,
    name: 'AddTeam',
    component: AddTeam,
    meta: { 
      title: 'AddTeam',
      requireLogin: true,
    },
    props: true,
  },
  {
    path: `/dashboard/team`,
    name: 'TheTeam',
    component: TheTeam,
    meta: { 
      title: 'TheTeam',
      requireLogin: true,
    },
    props: true,
  },
  {
    path: `/dashboard/team/add-member`,
    name: 'AddMember',
    component: AddMember,
    meta: { 
      title: 'AddMember',
      requireLogin: true,
    },
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to) {
    if(to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
})

//タブ表示 
const DEFAULT_TITLE = 'Default Title'

router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE
})

//store(loginしてなかったらlogin画面に行く) 
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
