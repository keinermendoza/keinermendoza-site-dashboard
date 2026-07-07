import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/users',
      children: [
        {
          path: '',
          name: 'user-list',
          component: () => import('@/views/user/ListView.vue'),
        },
        {
          path: 'create',
          name: 'user-create',
          component: () => import('@/views/user/FormView.vue'),
        },
        {
          path: ':id',
          name: 'user-detail',
          component: () => import('@/views/user/DetailView.vue'),
        },
        {
          path: ':id/edit',
          name: 'user-edit',
          component: () => import('@/views/user/FormView.vue'),
          props: { isEditMode: true },
        },
      ],
    },
    {
      path: '/skills',
      children: [
        {
          path: '',
          name: 'skill-list',
          component: () => import('@/views/skill/ListView.vue'),
        },
        {
          path: 'create',
          name: 'skill-create',
          component: () => import('@/views/skill/FormView.vue'),
        },
        {
          path: ':id',
          name: 'skill-detail',
          component: () => import('@/views/skill/DetailView.vue'),
        },
        {
          path: ':id/edit',
          name: 'skill-edit',
          component: () => import('@/views/skill/FormView.vue'),
          props: { isEditMode: true },
        },
      ],
    },
    {
      path: '/projects',
      children: [
        {
          path: '',
          name: 'project-list',
          component: () => import('@/views/project/ListView.vue'),
        },
        {
          path: 'create',
          name: 'project-create',
          component: () => import('@/views/project/CreateView.vue'),
        },
        {
          path: ':id',
          name: 'project-detail',
          component: () => import('@/views/project/DetailView.vue'),
        },
        {
          path: ':id/edit',
          name: 'project-edit',
          component: () => import('@/views/project/EditView.vue'),
        },
      ],
    },
    {
      path: '/tags',
      children: [
        {
          path: '',
          name: 'tag-list',
          component: () => import('@/views/tag/ListView.vue'),
        },
        {
          path: 'create',
          name: 'tag-create',
          component: () => import('@/views/tag/FormView.vue'),
        },
        {
          path: ':id',
          name: 'tag-detail',
          component: () => import('@/views/tag/DetailView.vue'),
        },
        {
          path: ':id/edit',
          name: 'tag-edit',
          component: () => import('@/views/tag/FormView.vue'),
          props: { isEditMode: true },
        },
      ],
    },
    {
      path: '/image-gallery',
      children: [
        {
          path: '',
          name: 'image-gallery',
          component: () => import('@/views/image/ListView.vue'),
        },
        {
          path: 'create',
          name: 'image-gallery-create',
          component: () => import('@/views/image/CreateView.vue'),
        },
        {
          path: ':id',
          name: 'image-gallery-detail',
          component: () => import('@/views/image/DetailView.vue'),
        },
        {
          path: ':id/edit',
          name: 'image-gallery-edit',
          component: () => import('@/views/image/EditView.vue'),
          // props: { isEditMode: true },
        },
      ],
    },

    {
      path: '/documents',
      children: [
        {
          path: '',
          name: 'document',
          component: () => import('@/views/document/ListView.vue'),
        },
        {
          path: 'create',
          name: 'document-create',
          component: () => import('@/views/document/CreateView.vue'),
        },
        {
          path: ':id',
          name: 'document-detail',
          component: () => import('@/views/document/DetailView.vue'),
        },
        {
          path: ':id/edit',
          name: 'document-edit',
          component: () => import('@/views/document/EditView.vue'),
          // props: { isEditMode: true },
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
