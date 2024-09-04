<template>
  <div class="p-6 max-w-2xl mx-auto bg-gradient-to-r from-gray-50 to-gray-200 rounded-lg shadow-lg">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-8 text-center">
      Курс по отношению к 
      <span class="text-yellow-500 block">{{ currentRates.toUpperCase() }}</span>
    </h1>
    <ul class="space-y-4">
      <li 
        v-for="(rate, pair) in filteredRates" 
        :key="pair" 
        class="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
      >
        <span class="text-xl font-semibold text-gray-800">
          1 {{ currentRates.toUpperCase() }} = 
        </span>
        <span class="text-xl font-bold text-yellow-500">
          {{ rate.toFixed(2) }} {{ getTargetCurrency(pair) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useCurrencyStore } from '../stores/currencyStore';

const currencyStore = useCurrencyStore();

const currentRates = computed(() => currencyStore.baseCurrency);

const filteredRates = computed(() => {
  if (!currencyStore.exchangeRates || Object.keys(currencyStore.exchangeRates).length === 0) {
    return {}; 
  }

  return Object.fromEntries(
    Object.entries(currencyStore.exchangeRates).filter(([pair]) =>
      pair.startsWith(currencyStore.baseCurrency.toLowerCase())
    )
  );
});

const getTargetCurrency = (pair) => {
  return pair.split('-')[1].toUpperCase();
};

onMounted(() => {
  currencyStore.fetchExchangeRates(); 
});
</script>
