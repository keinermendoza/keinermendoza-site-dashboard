<script setup>
import { reactive } from 'vue'
import { Form } from '@primevue/forms'
import { InputText, Button } from 'primevue'
import Textarea from 'primevue/textarea'
import ToggleSwitch from 'primevue/toggleswitch'

import MessageError from '@/components/MessageError.vue'

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({
      title: '',
      svg: '',
      description: '',
      is_public: true,
    }),
  },
  backendErrors: {
    type: Object,
  },
})
const emit = defineEmits(['onSubmit'])

const formValues = reactive({
  ...props.initialValues,
})

const onFormSubmit = async ({ values }) => {
  // const payload = new FormData()
  // payload.append('description', values.description)
  // payload.append('file', imageFile.value)
  emit('onSubmit', values)
}
</script>

<template>
  <Form
    v-slot="$form"
    :initialValues="formValues"
    @submit="onFormSubmit"
    class="flex flex-col gap-4 w-full sm:w-56"
  >
    <!-- erro geral -->
    <Message
      v-if="backendErrors && backendErrors.generalMessage"
      severity="error"
      size="small"
      variant="simple"
    >
      <p>{{ backendErrors.generalMessage }}</p>
    </Message>

    <!-- titulo -->
    <div class="flex flex-col gap-1">
      <label for="title">Titulo</label>
      <InputText id="title" name="title" type="text" placeholder="title" fluid />
      <MessageError :form="$form" :backendErrors="props?.backendErrors" fieldName="title" />
    </div>

    <!-- descrição -->
    <div class="flex flex-col gap-1">
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

    <!-- svg -->
    <div class="flex flex-col gap-1">
      <label for="svg">SVG em texto</label>
      <Textarea id="svg" name="svg" v-model="formValues.svg" rows="5" cols="30" />
      <MessageError :form="$form" :backendErrors="props?.backendErrors" fieldName="svg" />
    </div>

    <!-- Vsibilidade -->
    <div class="flex flex-col gap-1">
      <label class="flex gap-2 items-center">
        <ToggleSwitch id="is_public" name="is_public" />
        <small>É público</small>
      </label>
      <MessageError :form="$form" :backendErrors="backendErrors" fieldName="is_public" />
    </div>

    <Button type="submit" severity="primary" label="Submit" />
  </Form>
</template>
