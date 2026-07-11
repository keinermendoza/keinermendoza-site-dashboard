import { defineStore } from 'pinia'
import useBaseStorageLogic from '@/composables/base'

export const useSkillStore = defineStore('skills', () => {
  const artefacts = useBaseStorageLogic('skills')
  return { skills: artefacts.data, ...artefacts }
})
