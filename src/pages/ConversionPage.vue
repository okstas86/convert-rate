<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-full sm:max-w-lg lg:max-w-2xl mx-auto bg-gradient-to-r from-gray-50 to-gray-200 rounded-2xl shadow-xl">
    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center">
      Конвертация валют
    </h1>
    <div class="space-y-6 sm:space-y-8">
      <CurrencyInput 
        v-model:value="fromValue" 
        v-model:currency="fromCurrency" 
        class="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-300 shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-100 focus:ring-4 focus:ring-yellow-300"
      />
      <CurrencyInput 
        v-model:value="toValue" 
        v-model:currency="toCurrency" 
        class="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-300 shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-100 focus:ring-4 focus:ring-yellow-300"
      />
    </div>
  </div>
</template>


<script setup>
import { ref, watch, computed } from 'vue';
import CurrencyInput from '../components/CurrencyInput.vue';
import { useCurrencyStore } from '../stores/currencyStore';

const currencyStore = useCurrencyStore();
const fromCurrency = ref(currencyStore.baseCurrency);
const toCurrency = ref(currencyStore.baseCurrency);
const fromValue = ref(1);
const toValue = ref(1);


const currencyPair = computed(() => {
  return `${fromCurrency.value.toLowerCase()}-${toCurrency.value.toLowerCase()}`;
});


const currentExchangeRate = computed(() => {
  if (fromCurrency.value.toLowerCase() === toCurrency.value.toLowerCase()) {
    return 1;  
  }

  return currencyStore.exchangeRates[currencyPair.value] || 0;
});


watch([fromValue, currentExchangeRate], ([newFromValue, newCurrentExchangeRate]) => {
  if (newCurrentExchangeRate) {
    toValue.value = newFromValue * newCurrentExchangeRate;
  }
});

watch([toValue, currentExchangeRate], ([newToValue, newCurrentExchangeRate]) => {
  if (newCurrentExchangeRate) {
    fromValue.value = newToValue / newCurrentExchangeRate;
  }
});


currencyStore.fetchExchangeRates();
</script>
