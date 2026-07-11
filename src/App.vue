<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LayoutApp from './components/LayoutApp.vue'
import SidebarItem from './components/SidebarItem.vue'
</script>

<template>
  <LayoutApp>
    <template #sidebar>
      <SidebarItem to="/"> Home </SidebarItem>

      <SidebarItem to="/users"> Usuarios </SidebarItem>

      <SidebarItem to="/image-gallery"> Galeria de Imagens </SidebarItem>

      <SidebarItem to="/projects"> Projetos </SidebarItem>

      <SidebarItem to="/tags"> Categorias </SidebarItem>

      <SidebarItem to="/documents"> Documentos </SidebarItem>

      <SidebarItem to="/skills"> Skills </SidebarItem>
    </template>

    <RouterView />
  </LayoutApp>
</template>
