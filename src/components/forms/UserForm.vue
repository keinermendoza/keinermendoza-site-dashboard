<script setup>
import { reactive } from 'vue'
import { Form } from '@primevue/forms'
import { Message, InputText, Button, ToggleSwitch } from 'primevue'
import MessageError from '@/components/MessageError.vue'

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({
      name: '',
      email: '',
      is_admin: false,
    }),
  },
  backendErrors: {
    type: Object,
  },
})

const formValues = reactive({ ...props.initialValues })
const emit = defineEmits(['onSubmit'])

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
    emit('onSubmit', values)
  }
}
</script>

<template>
  <Form
    v-slot="$form"
    :resolver
    :initialValues="formValues"
    @submit="onFormSubmit"
    class="flex flex-col gap-4 w-full sm:w-56"
  >
    <Message
      v-if="props?.backendErrors && props.backendErrors.generalMessage"
      severity="error"
      size="small"
      variant="simple"
    >
      <p>{{ props?.backendErrors.generalMessage }}</p>
    </Message>
    <div class="flex flex-col gap-1">
      <InputText name="name" type="text" placeholder="name" fluid />
      <MessageError :form="$form" :backendErrors="props?.backendErrors" fieldName="name" />
    </div>
    <div class="flex flex-col gap-1">
      <InputText name="email" type="text" placeholder="email" fluid />
      <MessageError :form="$form" :backendErrors="props?.backendErrors" fieldName="email" />
    </div>
    <div class="flex flex-col gap-1">
      <InputText name="password" type="text" placeholder="password" fluid />
      <MessageError :form="$form" :backendErrors="props?.backendErrors" fieldName="password" />
    </div>
    <!-- Vsibilidade -->
    <div class="flex flex-col gap-1">
      <label class="flex gap-2 items-center">
        <ToggleSwitch id="is_admin" name="is_admin" />
        <small>É administrador</small>
      </label>
      <MessageError :form="$form" :backendErrors="props?.backendErrors" fieldName="is_admin" />
    </div>
    <Button type="submit" severity="primary" label="Submit" />
  </Form>
</template>
