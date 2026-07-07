import { defineStore } from 'pinia'
import useBaseStorageLogic from '@/composables/base'

export const useSkillstore = defineStore('skills', () => {
  const artefacts = useBaseStorageLogic('skills')
  return { skills: artefacts.data, ...artefacts }
})
