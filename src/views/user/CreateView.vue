<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { postRequest } from '@/services/api'
import UserForm from '@/components/forms/UserForm.vue'
import { useRouter } from 'vue-router'
import LinkBack from '@/components/LinkBack.vue'
import { baseMessage } from '@/composables/utils'
import { useToast } from 'primevue'

const toast = useToast()
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
    toast.add({ ...baseMessage, detail: 'Usuario atualizado com sucesso' })
    router.push({ name: 'user-edit', params: { id: response.data.id } })
  }
}
</script>

<template>
  <LinkBack class="mb-4" />

  <div class="mb-4">
    <h1 class="text-2xl font-medium mb-4">Cadastrar novo Usuario</h1>
  </div>
  <UserForm :backendErrors="backendErrors" @onSubmit="handleSubmit" />
</template>
