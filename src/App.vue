<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/users">Usuarios</RouterLink>
        <RouterLink to="/image-gallery">Galeria de Imagens</RouterLink>
        <RouterLink to="/projects">Projetos</RouterLink>
        <RouterLink to="/tags">Categorias</RouterLink>
        <RouterLink to="/documents">Documentos</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
