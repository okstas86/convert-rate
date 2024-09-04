import { defineStore } from 'pinia';
import axios from 'axios';

export const useCurrencyStore = defineStore('currencyStore', {
  state: () => ({
    baseCurrency: 'usd',
    exchangeRates: {}, 
  }),
  actions: {
    async fetchExchangeRates() {
      try {
        const response = await axios.get('https://status.neuralgeneration.com/api/currency');
        this.exchangeRates = response.data;
        console.log('Ответ от API:', response.data);
      } catch (error) {
        console.error('Ошибка при получении курсов валют:', error);
      }
    },
    setBaseCurrency(currency) {
      console.log('Установка базовой валюты на:', currency);
      this.baseCurrency = currency;
      this.fetchExchangeRates();
    },
  },
  getters: {
    currentExchangeRate: (state) => (currencyPair) => {
      return state.exchangeRates[currencyPair.toLowerCase()] || 0;
    },
    allRates: (state) => {
      console.log('all',state.exchangeRates)
      return state.exchangeRates;
    },
  },
});
