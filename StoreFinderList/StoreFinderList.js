import Button from '@unilever-hair/nexxus-common-components/Button';
import StoreFinderInput from '../StoreFinderInput';
import { StoreFinderBus } from '../StoreFinderBus';

export default {
  name: 'StoreFinderList',
  components: {
    StoreFinderInput,
    Button,
  },
  computed: {
    stores: () => StoreFinderBus.stores,
    mapActive: () => StoreFinderBus.mapActive,
    toggleText: ({ mapActive }) => (mapActive ? 'View in list' : 'View on map'),
    activeStoreIndex: () => StoreFinderBus.activeStoreIndex,
    error: () => StoreFinderBus.error,
  },
  watch: {
    activeStoreIndex(newStoreIndex) {
      this.scrollToStore(newStoreIndex);
    },
  },
  methods: {
    scrollToStore(storeIndex) {
      const [store] = this.$refs[`store-${storeIndex}`];
      this.$refs.list.scrollTo({
        top: store.offsetTop,
        behavior: 'smooth',
      });
    },
    selectStore(storeIndex) {
      StoreFinderBus.$emit('active-store-index', storeIndex);
    },
    toggleView() {
      StoreFinderBus.$emit('map-active', !this.mapActive);
    },
  },
};
