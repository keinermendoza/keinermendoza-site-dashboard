import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = 'http://localhost:8000/api/v1/'

const BACKEND_URL = 'http://localhost:8000'

// 🌟 INTERCEPTOR GLOBAL
axios.interceptors.response.use(
  (response) => response, // Si la petición es exitosa, pasa sin cambios
  (error) => {
    // Si Laravel responde con 401 (Unauthenticated), la sesión expiró
    if (error.response && error.response.status === 401) {
      // Limpiamos cualquier estado local si fuera necesario (ej. Pinia o localStorage)
      // ...

      // Redirigimos forzosamente el navegador al login de Laravel Breeze
      window.location.href = `${BACKEND_URL}/login`

      return new Promise(() => {}) // Corta la cadena de promesas para que no devuelva error al componente
    }

    return Promise.reject(error)
  },
)

const getUser = async () => {
  try {
    const response = await axios.get('user')
    return handleDataResponse(response)
  } catch (err) {
    return handleErrorResponse(err)
  }
}

const getRequest = async (endpoint) => {
  try {
    const response = await axios.get(endpoint)
    return handleDataResponse(response)
  } catch (err) {
    return handleErrorResponse(err)
  }
}

const postRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(endpoint, data)
    return handleDataResponse(response)
  } catch (err) {
    return handleErrorResponse(err)
  }
}

const patchRequest = async (endpoint, data) => {
  try {
    const response = await axios.patch(endpoint, data)
    return handleDataResponse(response)
  } catch (err) {
    return handleErrorResponse(err)
  }
}

const deleteRequest = async (endpoint) => {
  try {
    await axios.delete(endpoint)
    return { error: null }
  } catch (err) {
    return { error: err.response?.dara?.message || err.message }
  }
}

function handleDataResponse(response) {
  return { data: response.data, error: null }
}

function handleErrorResponse(err) {
  return { data: null, error: err.response?.data?.message || err.message }
}
export { getUser, getRequest, postRequest, patchRequest, deleteRequest }
