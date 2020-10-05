/* eslint-disable no-restricted-syntax */
import Vue from 'vue';

const commonValues = [
  {
    name: 'finder-active',
    value: {
      finderActive: false,
    },
  },
  {
    name: 'map-active',
    value: {
      mapActive: false,
    },
  },
  {
    name: 'stores',
    value: {
      stores: false,
    },
  },
  {
    name: 'active-store-index',
    value: {
      activeStoreIndex: null,
    },
  },
  {
    name: 'zip-code',
    value: {
      zipCode: null,
    },
  },
  {
    name: 'location-lat-lng',
    value: {
      locationLatLng: null,
    },
  },
  {
    name: 'error',
    value: {
      error: null,
    },
  },
];

const data = (valueData) => valueData.reduce((agg, item) => ({ ...agg, ...item.value }), {});

export const StoreFinderBus = new Vue({
  data: {
    ...data(commonValues),
  },
  computed: {
    isClient: () => process.isClient,
  },
  created() {
    this.bindListeners(commonValues);
  },
  methods: {
    bindListeners(valueData) {
      const vm = this;
      valueData.forEach((item) => {
        const [key] = Object.keys(item.value);
        vm.$on(item.name, (newVal) => {
          vm[key] = newVal;
        });
      });
    },
  },
});
