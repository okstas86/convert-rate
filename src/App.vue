<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <HeaderComponent />
    <main class="flex-1 p-6 max-w-4xl mx-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
</script>


