import { defineStore } from 'pinia'
import useBaseStorageLogic from '@/composables/base'

export const useDocumentStore = defineStore('documents', () => {
  const artefacts = useBaseStorageLogic('documents')
  return { documents: artefacts.data, ...artefacts }
})
