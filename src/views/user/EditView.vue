<script setup>
import { onMounted, ref } from 'vue'
import { patchRequest } from '@/services/api'
import UserForm from '@/components/forms/UserForm.vue'
import { useUserStore } from '@/stores/user'
import LinkBack from '@/components/LinkBack.vue'

import { useToast } from 'primevue/usetoast'
import { baseMessage } from '@/composables/utils'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()
const route = useRoute()
const store = useUserStore()
const instance = ref(null)
const backendErrors = ref(null)

onMounted(async () => {
  await store.init()
  instance.value = store.get(route.params.id)
})

async function handleSubmit(payload) {
  const response = await patchRequest('users/' + instance.value.id, payload)
  backendErrors.value = response.error
  if (response.success) {
    store.update(response.data)
    toast.add({ ...baseMessage, detail: 'Usuario atualizado com sucesso' })
    router.push({ name: 'user-list' })
  }
}
</script>

<template>
  <LinkBack class="mb-4" />

  <div class="mb-4" v-if="instance">
    <h1 class="text-2xl font-medium">Editando {{ instance.name }}</h1>
  </div>
  <UserForm
    v-if="instance"
    :initialValues="instance"
    :backendErrors="backendErrors"
    @onSubmit="handleSubmit"
  />
</template>
