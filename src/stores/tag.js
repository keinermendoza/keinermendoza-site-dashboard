import { defineStore } from 'pinia'
import useBaseStorageLogic from '@/composables/base'

export const useTagStore = defineStore('tags', () => {
  const artefacts = useBaseStorageLogic('tags')
  return { tags: artefacts.data, ...artefacts }
})
