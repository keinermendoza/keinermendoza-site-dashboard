<script setup>
// Add the @tinymce/tinymce-vue wrapper to the bundle
import Editor from '@tinymce/tinymce-vue'

// Ensure TinyMCE is imported to register the global variable required by other components
import 'tinymce/tinymce'
// DOM model
import 'tinymce/models/dom/model'
// Theme
import 'tinymce/themes/silver'
// Toolbar icons
import 'tinymce/icons/default'
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css'

// Import plugins
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/link'
// import 'tinymce/plugins/image'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/table'
import 'tinymce/plugins/code'
import 'tinymce/plugins/help'
import 'tinymce/plugins/media'
// Include resources that a plugin lazy-loads at the run-time
import 'tinymce/plugins/help/js/i18n/keynav/en.js'
import 'tinymce/plugins/wordcount'

// Content styles, including inline UI like fake cursors
import 'tinymce/skins/content/default/content.js'
import 'tinymce/skins/ui/oxide/content.js'
import { defineModel, ref } from 'vue'

const editor = ref(null)
function onInit(evt, editorInstance) {
  editor.value = editorInstance
}

const editorConfig = {
  height: 500,
  plugins: 'advlist media autolink lists link table code help wordcount',
  extended_valid_elements: 'iframe[src|title|width|height|allowfullscreen|frameborder|class|id]',

  toolbar:
    'undo redo | media | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | help',
}

const content = defineModel({
  type: String,
  default: '',
})
</script>

<template>
  <p>Editor</p>
  <Editor v-model="content" :init="editorConfig" @init="onInit" licenseKey="gpl" />
</template>
