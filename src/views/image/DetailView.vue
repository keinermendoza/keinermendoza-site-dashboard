<script setup>
import WrapperComponent from '@/components/WrapperComponent.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useImageStore } from '@/stores/image'

const route = useRoute()
const imageStore = useImageStore()
const image = ref(null)

onMounted(async () => {
  await imageStore.init()
  image.value = imageStore.get(route.params.id)
})
</script>

<template>
  <WrapperComponent :error="imageStore.error">
    <h1>Hola, me alegra verte por aqui!</h1>
    <p>mira mis codigos</p>
    <p v-if="imageStore.isLoading">carregando</p>
    <code v-else>
      {{ image }}
    </code>
  </WrapperComponent>
</template>
