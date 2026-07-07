<script setup>
import FileUpload from 'primevue/fileupload'
import { onMounted, reactive, ref } from 'vue'
import { Form } from '@primevue/forms'
import { InputText, Button, ToggleSwitch } from 'primevue'
import MessageError from '@/components/MessageError.vue'

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({
      title: '',
      is_public: false,
      is_cv: false,
    }),
  },
  backendErrors: {
    type: Object,
  },
})
const file = ref(null)
const emit = defineEmits(['submit'])
const formValues = reactive({
  ...props.initialValues,
})

const handleFileChange = (event) => {
  file.value = event.files[0]
}

const onFormSubmit = async ({ values }) => {
  const payload = new FormData()
  console.log(values)
  payload.append('title', values.title)
  payload.append('is_public', values.is_public ? 1 : 0)
  payload.append('is_cv', values.is_cv ? 1 : 0)
  if (file.value) {
    payload.append('file', file.value)
  }
  emit('submit', payload)
}

onMounted(() => {
  console.log(formValues)
})
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
        accept="application/pdf"
        :maxFileSize="1000000"
        @select="handleFileChange"
        customUpload
      />
      <MessageError :form="$form" :backendErrors="props?.backendErrors" fieldName="file" />
      <small v-if="file" class="text-green-500"> Selected: {{ file.name }} </small>
    </div>

    <div class="flex flex-col gap-1">
      <InputText name="title" type="text" placeholder="title" fluid />
      <MessageError :form="$form" :backendErrors="props?.backendErrors" fieldName="title" />
    </div>

    <!-- e publico -->
    <div class="flex flex-col gap-1">
      <label class="flex gap-2 items-center">
        <ToggleSwitch id="is_public" name="is_public" />
        <small>É de accesso publico</small>
      </label>
      <MessageError :form="$form" :backendErrors="backendErrors" fieldName="is_public" />
    </div>

    <!-- e cv -->
    <div class="flex flex-col gap-1">
      <label class="flex gap-2 items-center">
        <ToggleSwitch id="is_cv" name="is_cv" />
        <small>É o curriculo</small>
      </label>
      <MessageError :form="$form" :backendErrors="backendErrors" fieldName="is_cv" />
    </div>

    <Button type="submit" severity="primary" label="Submit" />
  </Form>
</template>
