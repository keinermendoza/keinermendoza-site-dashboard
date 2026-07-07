<script setup>
import { onMounted, reactive, ref } from 'vue'
import { Form } from '@primevue/forms'
import { Message, InputText, Button, ToggleSwitch } from 'primevue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { patchRequest, postRequest } from '@/services/api'
import MessageError from '@/components/MessageError.vue'
const formKey = ref(0)

const props = defineProps({
  isEditMode: {
    type: Boolean,
    default: false,
  },
})

const initialValues = ref({
  name: '',
  email: '',
  is_admin: false,
})

const route = useRoute()
const userStore = useUserStore()
const selectedUser = ref(null)
const backendErrors = ref(null)

onMounted(async () => {
  await userStore.init()
  if (props.isEditMode) {
    selectedUser.value = userStore.get(route.params.id)
    initialValues.value = selectedUser.value
    formKey.value++
  }
})

const resolver = ({ values }) => {
  const errors = {}

  if (!values.name) {
    errors.name = [{ message: 'name is required.' }]
  }
  if (!values.email) {
    errors.email = [{ message: 'email is required.' }]
  }

  return {
    values,
    errors,
  }
}

const onFormSubmit = async ({ valid, values }) => {
  if (valid) {
    console.log(values)
    if (props.isEditMode) {
      const response = await patchRequest('users/' + selectedUser.value.id, values)
      backendErrors.value = response.error
      if (response.success) userStore.update(response.data)
      console.log(response.data)
    } else {
      const response = await postRequest('users', values)
      backendErrors.value = response.error
      if (response.success) userStore.add(response.data)
    }
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <div>
      <template v-if="isEditMode">
        <h1 v-if="selectedUser">Editando cadastro de {{ selectedUser.name }}</h1>
      </template>
      <template v-else>
        <h1>Cadastra novo usuario</h1>
      </template>
    </div>
    <Form
      :key="formKey"
      v-slot="$form"
      :initialValues
      :resolver
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
      <div class="flex flex-col gap-1">
        <InputText name="name" type="text" placeholder="name" fluid />
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="name" />
      </div>
      <div class="flex flex-col gap-1">
        <InputText name="email" type="text" placeholder="email" fluid />
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="email" />
      </div>
      <div class="flex flex-col gap-1">
        <InputText name="password" type="text" placeholder="password" fluid />
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="password" />
      </div>
      <!-- Vsibilidade -->
      <div class="flex flex-col gap-1">
        <label class="flex gap-2 items-center">
          <ToggleSwitch id="is_admin" name="is_admin" />
          <small>É administrador</small>
        </label>
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="is_admin" />
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>
