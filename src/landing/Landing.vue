<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header / Logo -->
    <header class="p-2">
      <picture class="flex justify-center lg:justify-start w-fit mx-auto lg:mx-0">
        <source media="(max-width: 600px)">
        <img
          src="/images/floriambra_logo.svg"
          alt="logo"
          class="max-w-[150px] max-h-[75px]"
        />
      </picture>
    </header>

    <!-- Main content -->
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="text-[#F3ECDE] py-6">
      <div class="container mx-auto flex flex-col items-center space-y-3">
        <p class="text-sm">&copy; 2025 Floriambra. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>
