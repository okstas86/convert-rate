<template>
  <div class="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
    <CurrencyDropdown 
      :currency="currency" 
      @update:currency="updateCurrency"
      class="w-full sm:w-24 p-2 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out hover:border-gray-400"
    />
    <input
      type="number"
      :value="formattedValue"
      @input="updateValue"
      class="w-full sm:w-auto p-3 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out hover:border-gray-400"
      min="0"
    />
  </div>
</template>


<script setup>
import { ref, computed, watch } from 'vue';
import CurrencyDropdown from './CurrencyDropdown.vue';

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    required: true, 
  },
});
const emit = defineEmits(['update:value', 'update:currency']);

const value = ref(props.value);
const currency = ref(props.currency);


const formattedValue = computed(() => {
  return value.value.toFixed(2);
});

const updateValue = (event) => {
  let newValue = Number(event.target.value);
  if (!isNaN(newValue)) {
    newValue = parseFloat(newValue.toFixed(2)); 
    emit('update:value', newValue);
  }
};

const updateCurrency = (newCurrency) => {
  emit('update:currency', newCurrency);
};

watch(() => props.value, (newValue) => {
  value.value = newValue;
});

watch(() => props.currency, (newCurrency) => {
  currency.value = newCurrency;
});
</script>
