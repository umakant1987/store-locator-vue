import StoreFinderInput from './StoreFinderInput';
import StoreFinderProduct from './StoreFinderProduct';
import StoreFinderMap from './StoreFinderMap';
import StoreFinderList from './StoreFinderList';
import { StoreFinderBus } from './StoreFinderBus';

export default {
  name: 'StoreFinder',
  components: {
    StoreFinderInput,
    StoreFinderProduct,
    StoreFinderMap,
    StoreFinderList,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    labels: {
      type: Object,
      default: () => ({
        startTitle: 'Find stores selling this product',
        startContent:
          'Use the search tool to find stores selling Nexxus products in and around local area.',
        startSearchingTitle: 'Searching for',
      }),
    },
  },
  computed: {
    finderActive: () => StoreFinderBus.finderActive,
    mapActive: () => StoreFinderBus.mapActive,
    stores: () => StoreFinderBus.stores,
  },
};
