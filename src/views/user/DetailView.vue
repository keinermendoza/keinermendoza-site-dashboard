<script setup>
import { useFetcher } from '@/composables/fetcher'
import WrapperComponent from '@/components/WrapperComponent.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { error, data: currentUser } = useFetcher('users/' + route.params.id)
</script>

<template>
  <WrapperComponent :error="error">
    <h1>Hola, me alegra verte por aqui!</h1>
    <p>mira mis codigos</p>
    <code>
      {{ currentUser }}
    </code>
  </WrapperComponent>
</template>
