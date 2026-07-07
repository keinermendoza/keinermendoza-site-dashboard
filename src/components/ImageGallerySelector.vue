<script setup>
import { ref, watchEffect } from 'vue'
import { Button } from 'primevue'
import Dialog from 'primevue/dialog'
import WrapperComponent from '@/components/WrapperComponent.vue'
import { useImageStore } from '@/stores/image'
import ImageForm from './ImageForm.vue'
import { postRequest } from '@/services/api.js'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  selectedImage: {
    type: Object,
  },
})
const emit = defineEmits(['update:isOpen', 'update:selectedImage'])
const store = useImageStore()

const createFormIsVisible = ref(false)

// Aguarda o modal abrir para fazer a requisição ao endpoint de imagens.
// A requisição só é feita se os dados não estiverem cacheados.
const stop = watchEffect(async () => {
  if (props.isOpen) {
    store.init()
    stop()
  }
})

// formulario e preview
const imagePreview = ref(null)
const backendErrors = ref(null)
function handleUpdatePreview(imageBlob) {
  imagePreview.value = imageBlob
}

async function handleSubmit(payload) {
  const response = await postRequest('images', payload)
  backendErrors.value = response.error
  if (response.success) {
    store.add(response.data)
    // selecionando imagem recem criada
    emit('update:selectedImage', response.data)
  }
}
</script>

<template>
  <WrapperComponent :error="store?.error">
    <Dialog
      :visible="props.isOpen"
      @update:visible="emit('update:isOpen', $event)"
      modal
      header="Seleciona Imagem"
      class="max-w-xl"
    >
      <!-- botão adicionar imagem -->
      <div class="flex items-center gap-2">
        <Button aria-roledescription="Adicionar nova imagem" @click="createFormIsVisible = true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>Adicionar nova imagem</span>
        </Button>
      </div>

      <!-- formulario para adicionar nova imagem -->
      <div v-if="createFormIsVisible">
        <img v-if="imagePreview" :src="imagePreview" alt="previzualisação de imagem" />
        <ImageForm
          :backendErrors="backendErrors"
          @submit="handleSubmit"
          @onUpdateImagePreview="handleUpdatePreview"
        />
      </div>

      <!-- galeria para seleccionar imagem -->
      <div v-if="store?.images" class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div
          @click="emit('update:selectedImage', image)"
          v-for="image in store.images"
          class="border border-solid cursor-pointer"
          :class="props.selectedImage?.id === image.id ? 'border-red-500' : 'border-transparent'"
          :key="image.id"
        >
          <img
            class="object-cover object-center w-full h-40 max-w-full rounded-lg"
            :src="image.image"
            :alt="image.description"
          />
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Fechar"
          severity="secondary"
          @click="emit('update:isOpen', false)"
        ></Button>
      </div>
    </Dialog>
  </WrapperComponent>
</template>
