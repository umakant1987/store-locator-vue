import { ResizeBus } from '@unilever-hair/nexxus-common-utils/src/ResizeBus';
import { canUseGeoLocation } from '@unilever-hair/nexxus-common-utils/src/can-use';
import { gmapsInit } from '@unilever-hair/nexxus-common-utils/src/gmaps-init';
import FormInput from '@unilever-hair/nexxus-common-components/Forms/FormInput';
import Button from '@unilever-hair/nexxus-common-components/Button';
import axios from 'axios';
import { StoreFinderBus } from '../StoreFinderBus';

export default {
  name: 'StoreFinderInput',
  components: {
    FormInput,
    Button,
  },
  props: {
    productId: {
      type: Number,
      required: true,
    },
    uniqueProductCode: {
      type: String,
      required: true,
    },
    apiEndpoint: {
      type: String,
      default: '//productlocator.iriworldwide.com/productlocator/servlet/ProductLocatorEngine',
    },
    apiSettings: {
      type: Object,
      default: () => ({
        outputtype: 'json',
        clientid: 10,
        productfamilyid: 'UNIL',
        producttype: 'upc',
        searchradius: 20,
      }),
    },
  },
  data: () => ({
    gettingLocation: false,
    error: false,
    inputValue: null,
  }),
  computed: {
    isMdScreenOrWider: () => ResizeBus.windowWidth >= ResizeBus.mdWidth,
    zipCode: () => StoreFinderBus.zipCode,
  },
  watch: {
    zipCode(newValue) {
      if (this.inputValue !== newValue) {
        this.inputValue = newValue;
      }
    },
    inputValue(newValue) {
      if (this.zipCode !== newValue) {
        StoreFinderBus.$emit('zip-code', newValue);
      }
    },
  },
  mounted() {
    if (this.zipCode) this.inputValue = this.zipCode;
  },
  methods: {
    async onSubmit() {
      await this.getStores();
      StoreFinderBus.$emit('finder-active', true);
      if (this.isMdScreenOrWider) StoreFinderBus.$emit('map-active', true);
    },
    async getStores() {
      try {
        const params = {
          ...this.apiSettings,
          productid: this.uniqueProductCode,
          zip: this.zipCode,
        };
        const { data } = await axios.get(this.apiEndpoint, { params });
        if (data.RESULTS.STORES) {
          StoreFinderBus.$emit('error', null);
          StoreFinderBus.$emit('active-store-index', null);
          StoreFinderBus.$emit('stores', data.RESULTS.STORES.STORE);
        } else if (data.RESULTS.ERROR) {
          StoreFinderBus.$emit('error', data.RESULTS.ERROR);
        }
        return;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
    getLocation() {
      if (canUseGeoLocation()) {
        this.gettingLocation = true;
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          StoreFinderBus.$emit('location-lat-lng', { lat, lng });
          await this.geocodeLatLng(lat, lng);
          this.gettingLocation = false;
        });
      }
    },
    async geocodeLatLng(lat, lng) {
      const google = await gmapsInit({
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      });
      const point = new google.maps.LatLng(lat, lng);
      new google.maps.Geocoder().geocode({ latLng: point }, (results, status) => {
        if (status === 'OK') {
          const postalCode = results[0].address_components.find(
            (result) => result.types[0] === 'postal_code'
          );
          StoreFinderBus.$emit('zip-code', postalCode.long_name);
          this.onSubmit();
        } else {
          this.error = true;
        }
      });
    },
  },
};
