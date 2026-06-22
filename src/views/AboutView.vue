<script setup>
import { getUser } from '@/services/api'
import { onMounted, ref } from 'vue'

const currentUser = ref(null)
const errorMessage = ref(null)

onMounted(async () => {
  const { data, error } = await getUser()
  if (error) {
    errorMessage.value = error
    return
  }
  currentUser.value = data
})
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <code v-else>{{ currentUser }}</code>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
