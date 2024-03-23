
import SeansidComponent from '@/components/SeansidComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
{
    path: "/seansid",
    name: "Seansid",
    component: Seansid,
},

{ 
    path: "/:catchAll(.*)",
    name: "Seansid",
    component: SeansidComponent,
}
]

const router = createRouter({
history: createWebHistory(process.env.BASE_URL),
routes
})



export default router