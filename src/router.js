import { createRouter, createWebHistory } from 'vue-router';

import coaches from './routes/coaches/CoachesList.vue';
import coachesDes from './routes/coaches/CoachesDescription.vue';
import contact from './routes/requests/Contact.vue';
import RegisterCoach from './routes/coaches/RegisterCoach.vue';
import requests from './routes/requests/RequestsReceived.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: coaches },
    { path: '/requests', component: requests },
    { path: '/register', component: RegisterCoach },
    {
      path: '/coaches/:coachId',
      component: coachesDes,
      props: true,
      children: [{ path: 'contact', component: contact }]
    },
    { path: '/:notFound(.*)', redirect: '/coaches' }
  ]
});



export default router;
