import { defineStore } from 'pinia'
import useBaseStorageLogic from '@/composables/base'

export const useUserStore = defineStore('users', () => {
  const artefacts = useBaseStorageLogic('users')
  return { users: artefacts.data, ...artefacts }
})
