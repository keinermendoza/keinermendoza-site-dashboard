<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { patchRequest } from '@/services/api'
import UserForm from '@/components/UserForm.vue'
import { useUserStore } from '@/stores/user'
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
  if (response.success) store.update(response.data)
}
</script>

<template>
  <div class="card flex justify-center">
    <div v-if="instance">
      <h1>Editando {{ instance.name }}</h1>
    </div>
    <UserForm
      v-if="instance"
      :initialValues="instance"
      :backendErrors="backendErrors"
      @onSubmit="handleSubmit"
    />
  </div>
</template>
