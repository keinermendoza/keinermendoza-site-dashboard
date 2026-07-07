import { defineStore } from 'pinia'
import useBaseStorageLogic from '@/composables/base'

export const useImageStore = defineStore('images', () => {
  const artefacts = useBaseStorageLogic('images')
  return { images: artefacts.data, ...artefacts }
})
