
import SeansidComponent from '@/components/SeansidComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SaalComponent from '@/components/SaalComponent.vue'

const routes = [

{
    path: '/',
    name: 'SeansidComponent',
    component: SeansidComponent
  },
{
    path: '/saal/:saalId',
    name: 'SaalComponent',
    component: SaalComponent,
    props: true 
},
]

const router = createRouter({
history: createWebHistory(process.env.BASE_URL),
routes
})



export default router