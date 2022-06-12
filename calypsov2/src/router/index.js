import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/quizzes',
    name: 'Quizzes',
    component: () => import('../views/Quizzes.vue')
  },
  {
    path: '/movies',
    name: 'Movies',
    component: () => import('../views/Movies.vue')
  },
  {
    path: '/series',
    name: 'Series',
    component: () => import('../views/Series.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home', '/'];
//   const authRequired = !publicPages.includes(to.path);
  
//   // checks if there is a logged user 
//   const loggedIn = store.getters.getLoggedIn;
  
//   // trying to access a restricted page AND not logged in -> redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });