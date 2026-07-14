<script setup>
import FileUpload from 'primevue/fileupload'
import { reactive, ref } from 'vue'
import { Form } from '@primevue/forms'
import { Button } from 'primevue'
import Textarea from 'primevue/textarea'

import MessageError from '@/components/MessageError.vue'

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({
      description: '',
      is_public: true,
    }),
  },
  backendErrors: {
    type: Object,
  },
})
const imageFile = ref(null)
const emit = defineEmits(['onUpdateImagePreview', 'submit'])
const formValues = reactive({
  ...props.initialValues,
})

const handleFileChange = (event) => {
  imageFile.value = event.files[0]

  if (imageFile.value) {
    emit('onUpdateImagePreview', URL.createObjectURL(imageFile.value))
  }
}

const onFormSubmit = async ({ values }) => {
  const payload = new FormData()
  payload.append('description', values.description)
  payload.append('file', imageFile.value)
  emit('submit', payload)
}
</script>

<template>
  <Form
    v-slot="$form"
    :initialValues="formValues"
    @submit="onFormSubmit"
    class="flex flex-col gap-4 w-full sm:w-lg"
  >
    <div class="flex flex-col gap-2">
      <FileUpload
        mode="basic"
        name="file"
        accept="image/*"
        :maxFileSize="1000000"
        @select="handleFileChange"
        customUpload
        :chooseButtonProps="{ severity: 'info', variant: 'outlined', label: 'Imagem' }"
      />
      <MessageError :form="$form" :backendErrors="props?.backendErrors" fieldName="file" />
      <small v-if="imageFile" class="text-green-500"> Selected: {{ imageFile.name }} </small>
    </div>

    <div class="flex flex-col gap-1">
      <!-- <InputText name="description" type="text" placeholder="description" fluid /> -->
      <label for="description">Descrição</label>

      <Textarea
        id="description"
        name="description"
        v-model="formValues.description"
        rows="5"
        cols="30"
      />

      <MessageError :form="$form" :backendErrors="props?.backendErrors" fieldName="description" />
    </div>
    <Button type="submit" severity="primary" label="Salvar" />
  </Form>
</template>
