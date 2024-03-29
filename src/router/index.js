
import SeansidComponent from '@/components/SeansidComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SaalComponent from '@/components/SaalComponent.vue'

import SignUpView from "@/views/SignUpView.vue"
import SoovitusedComponent from '@/components/SoovitusedComponent.vue'

const routes = [

{
    path: '/',
    name: 'SeansidComponent',
    component: SeansidComponent
  },
{
    path: '/saal/:saalId/:seanssId',
    name: 'SaalComponent',
    component: SaalComponent,
    props: true 
},
{
    path: "/soovitused",
    name: "SoovitusedComponent",
    component: SoovitusedComponent,
},

{
    path: "/signup",
    name: "SignUpView",
    component: SignUpView,
},
]

const router = createRouter({
history: createWebHistory(process.env.BASE_URL),
routes
})



export default router