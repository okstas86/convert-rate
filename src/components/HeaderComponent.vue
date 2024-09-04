<template>
  <header class="flex justify-between items-center p-4 bg-gray-800 text-yellow-400 shadow-lg">
    <nav class="flex space-x-6 text-lg">
      <router-link 
        to="/" 
        class="hover:text-yellow-300 transition-colors duration-300 ease-in-out"
        >Главная</router-link>
      <router-link 
        to="/convert" 
        class="hover:text-yellow-300 transition-colors duration-300 ease-in-out"
        >Конвертация</router-link>
    </nav>
    <div class="flex items-center space-x-4">
      <CurrencyDropdown v-model:currency="fromCurrency" />
    </div>
  </header>
</template>



<script setup>
import { ref,watch } from 'vue';
import CurrencyDropdown from './CurrencyDropdown.vue';
import { useCurrencyStore } from '../stores/currencyStore';

const currencyStore = useCurrencyStore();
const fromCurrency = ref(currencyStore.fromCurrency);

watch(fromCurrency, (newCurrency) => {
  currencyStore.setBaseCurrency(newCurrency);
});
</script>

