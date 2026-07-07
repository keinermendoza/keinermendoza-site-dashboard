import { defineStore } from 'pinia'
import useBaseStorageLogic from '@/composables/base'

export const useProjectStore = defineStore('projects', () => {
  const artefacts = useBaseStorageLogic('projects')
  return { projects: artefacts.data, ...artefacts }
})
