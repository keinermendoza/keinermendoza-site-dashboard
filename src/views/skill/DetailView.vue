<script setup>
import WrapperComponent from '@/components/WrapperComponent.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const userStore = useUserStore()
const user = ref(null)

onMounted(async () => {
  await userStore.init()
  user.value = userStore.get(route.params.id)
})
</script>

<template>
  <WrapperComponent :error="userStore.error">
    <h1>Hola, me alegra verte por aqui!</h1>
    <p>mira mis codigos</p>
    <p v-if="userStore.isLoading">carregando</p>
    <code v-else>
      {{ user }}
    </code>
  </WrapperComponent>
</template>
