<script setup>
import { onMounted, ref } from 'vue'
import { Form } from '@primevue/forms'
import { Message, InputText, Button } from 'primevue'
import { useTagStore } from '@/stores/tag'
import ToggleSwitch from 'primevue/toggleswitch'
import MessageError from '@/components/MessageError.vue'
import { useRoute } from 'vue-router'
import { patchRequest, postRequest } from '@/services/api'

const formKey = ref(0)
const props = defineProps({
  isEditMode: {
    type: Boolean,
    default: false,
  },
})

const initialValues = ref({
  title: '',
  description: '',
  is_public: true,
})

const backendErrors = ref(null)
const route = useRoute()
const store = useTagStore()
const tag = ref(null)

onMounted(async () => {
  await store.init()
  if (props.isEditMode) {
    const currentTag = store.get(route.params.id)
    tag.value = currentTag
    initialValues.value = currentTag
    formKey.value++
  }
})

const resolver = ({ values }) => {
  return {
    values,
  }
}

const onFormSubmit = async ({ valid, values }) => {
  if (valid) {
    if (props.isEditMode) {
      const response = await patchRequest('tags/' + tag.value.id, values)
      backendErrors.value = response.error
      if (response.success) store.update(response.data)
    } else {
      const response = await postRequest('tags', values)
      backendErrors.value = response.error
      if (response.success) store.add(response.data)
    }
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <div>
      <template v-if="isEditMode">
        <h1 v-if="tag">Editando projeto de {{ tag.title }}</h1>
      </template>
      <template v-else>
        <h1>Nova Categoria</h1>
      </template>
    </div>
    <Form
      :key="formKey"
      v-slot="$form"
      :resolver
      :initialValues="initialValues"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-56"
    >
      <Message
        v-if="backendErrors && backendErrors.generalMessage"
        severity="error"
        size="small"
        variant="simple"
      >
        <p>{{ backendErrors.generalMessage }}</p>
      </Message>
      <!-- Titulo -->
      <div class="flex flex-col gap-1">
        <InputText name="title" type="text" placeholder="title" fluid />
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="title" />
      </div>

      <!-- Descrição -->
      <div class="flex flex-col gap-1">
        <InputText name="description" type="text" placeholder="descrição" fluid />
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="description" />
      </div>

      <!-- Vsibilidade -->
      <div class="flex flex-col gap-1">
        <label class="flex gap-2 items-center">
          <ToggleSwitch id="is_public" name="is_public" />
          <small>É público</small>
        </label>
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="is_public" />
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>
