import { onMounted, ref } from 'vue'
import { getRequest } from '@/services/api'
/*
callable must use one of the services defined in services/api.js
*/
const useFetcher = (endpoint) => {
  const error = ref(null)
  const data = ref(null)

  onMounted(async () => {
    const response = await getRequest(endpoint)
    error.value = response.error
    data.value = response.data
  })

  return { error, data }
}

export { useFetcher }
