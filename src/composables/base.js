import { ref } from 'vue'
import { getRequest } from '@/services/api'

export default function useBaseStorageLogic(endpoint) {
  const data = ref([])
  const initialized = ref(false)
  const error = ref(null)
  const isLoading = ref(true)

  async function init() {
    if (initialized.value) return
    const response = await getRequest(endpoint)
    isLoading.value = false
    error.value = response.error
    data.value = response.data
    initialized.value = true
  }

  function add(newObject) {
    data.value.push(newObject)
  }

  function update(updatedObject) {
    const newData = data.value.map((item) => {
      if (item.id != updatedObject.id) return item
      else return updatedObject
    })
    data.value = newData
  }

  function remove(objectId) {
    const remaindData = data.value.filter((item) => item.id != objectId)
    data.value = remaindData
  }

  function get(objectId) {
    return data.value.find((item) => objectId == item.id)
  }

  return { data, error, isLoading, init, add, update, remove, get }
}
