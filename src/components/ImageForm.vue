<script setup>
import FileUpload from 'primevue/fileupload'
import { reactive, ref } from 'vue'
import { Form } from '@primevue/forms'
import { InputText, Button } from 'primevue'
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
    class="flex flex-col gap-4 w-full sm:w-56"
  >
    <div class="flex flex-col gap-2">
      <label>Upload Profile Picture</label>
      <FileUpload
        mode="basic"
        name="file"
        accept="image/*"
        :maxFileSize="1000000"
        @select="handleFileChange"
        customUpload
      />
      <MessageError :form="$form" :backendErrors="props?.backendErrors" fieldName="file" />
      <small v-if="imageFile" class="text-green-500"> Selected: {{ imageFile.name }} </small>
    </div>

    <div class="flex flex-col gap-1">
      <InputText name="description" type="text" placeholder="description" fluid />
      <MessageError :form="$form" :backendErrors="props?.backendErrors" fieldName="description" />
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
  </Form>
</template>
