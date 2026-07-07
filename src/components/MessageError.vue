<script setup>
import { Message } from 'primevue'
const props = defineProps({
  fieldName: {
    type: String,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
  backendErrors: {
    type: Object,
  },
})
</script>

<template>
  <Message
    v-if="props.form[props.fieldName]?.invalid"
    severity="error"
    size="small"
    variant="simple"
    >{{ props.form[props.fieldName]?.error?.message }}</Message
  >
  <Message
    v-if="props.backendErrors?.[props.fieldName]"
    severity="error"
    size="small"
    variant="simple"
  >
    <p :key="index" v-for="(error, index) in props.backendErrors[props.fieldName]">{{ error }}</p>
  </Message>
</template>
