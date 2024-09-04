<template>
  <select 
    v-model="localCurrency" 
    @change="emitCurrencyChange" 
    class="w-full sm:w-auto p-2 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 ease-in-out hover:border-gray-500"
  >
    <option value="usd">USD</option>
    <option value="eur">EUR</option>
    <option value="rub">RUB</option>
  </select>
</template>


<script setup>
import { ref, watch } from 'vue';
import { useCurrencyStore } from '../stores/currencyStore';

const props = defineProps({
  currency: {
    type: String,
    default: 'usd', 
  },
});

const emit = defineEmits(['update:currency']);
const currencyStore = useCurrencyStore();
const localCurrency = ref(props.currency || 'usd'); 


watch(localCurrency, (newCurrency) => {
  emit('update:currency', newCurrency);
  currencyStore.setBaseCurrency(newCurrency); 
});

const emitCurrencyChange = () => {
  emit('update:currency', localCurrency.value);
};
</script>
