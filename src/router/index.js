import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

import {
  ListView as UserList,
  DetailView as UserDetail,
  CreateView as UserCreate,
  EditView as UserEdit,
} from '@/views/user'

import {
  ListView as ProjectList,
  DetailView as ProjectDetail,
  CreateView as ProjectCreate,
  EditView as ProjectEdit,
} from '@/views/project'

import {
  ListView as TagList,
  DetailView as TagDetail,
  CreateView as TagCreate,
  EditView as TagEdit,
} from '@/views/tag'

import {
  ListView as SkillList,
  DetailView as SkillDetail,
  CreateView as SkillCreate,
  EditView as SkillEdit,
} from '@/views/tag'

import {
  ListView as ImageList,
  DetailView as ImageDetail,
  CreateView as ImageCreate,
  EditView as ImageEdit,
} from '@/views/image'

import {
  ListView as DocumentList,
  DetailView as DocumentDetail,
  CreateView as DocumentCreate,
  EditView as DocumentEdit,
} from '@/views/document'

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
          component: UserList,
        },
        {
          path: 'create',
          name: 'user-create',
          component: UserCreate,
        },
        {
          path: ':id',
          name: 'user-detail',
          component: UserDetail,
        },
        {
          path: ':id/edit',
          name: 'user-edit',
          component: UserEdit,
        },
      ],
    },
    {
      path: '/skills',
      children: [
        {
          path: '',
          name: 'skill-list',
          component: SkillList,
        },
        {
          path: 'create',
          name: 'skill-create',
          component: SkillCreate,
        },
        {
          path: ':id',
          name: 'skill-detail',
          component: SkillDetail,
        },
        {
          path: ':id/edit',
          name: 'skill-edit',
          component: SkillEdit,
        },
      ],
    },
    {
      path: '/projects',
      children: [
        {
          path: '',
          name: 'project-list',
          component: ProjectList,
        },
        {
          path: 'create',
          name: 'project-create',
          component: ProjectCreate,
        },
        {
          path: ':id',
          name: 'project-detail',
          component: ProjectDetail,
        },
        {
          path: ':id/edit',
          name: 'project-edit',
          component: ProjectEdit,
        },
      ],
    },
    {
      path: '/tags',
      children: [
        {
          path: '',
          name: 'tag-list',
          component: TagList,
        },
        {
          path: 'create',
          name: 'tag-create',
          component: TagCreate,
        },
        {
          path: ':id',
          name: 'tag-detail',
          component: TagDetail,
        },
        {
          path: ':id/edit',
          name: 'tag-edit',
          component: TagEdit,
        },
      ],
    },
    {
      path: '/image-gallery',
      children: [
        {
          path: '',
          name: 'image-gallery',
          component: ImageList,
        },
        {
          path: 'create',
          name: 'image-gallery-create',
          component: ImageCreate,
        },
        {
          path: ':id',
          name: 'image-gallery-detail',
          component: ImageDetail,
        },
        {
          path: ':id/edit',
          name: 'image-gallery-edit',
          component: ImageEdit,
        },
      ],
    },

    {
      path: '/documents',
      children: [
        {
          path: '',
          name: 'document',
          component: DocumentList,
        },
        {
          path: 'create',
          name: 'document-create',
          component: DocumentCreate,
        },
        {
          path: ':id',
          name: 'document-detail',
          component: DocumentDetail,
        },
        {
          path: ':id/edit',
          name: 'document-edit',
          component: DocumentEdit,
        },
      ],
    },
  ],
})

export default router
