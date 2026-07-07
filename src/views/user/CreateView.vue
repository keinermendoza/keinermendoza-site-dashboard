<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { postRequest } from '@/services/api'
import DocumentForm from '@/components/DocumentForm.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useUserStore()
const backendErrors = ref(null)

onMounted(async () => {
  await store.init()
})

async function handleSubmit(payload) {
  const response = await postRequest('users', payload)
  backendErrors.value = response.error
  if (response.success) {
    store.add(response.data)
    router.push({ name: 'user-edit', params: { id: response.data.id } })
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <div>
      <h1>Subir Novo Documento</h1>
    </div>
    <DocumentForm :backendErrors="backendErrors" @onSubmit="handleSubmit" />
  </div>
</template>
