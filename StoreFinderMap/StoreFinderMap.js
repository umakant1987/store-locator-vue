import Vue from 'vue';
import { ResizeBus } from '@unilever-hair/nexxus-common-utils/src/ResizeBus';
import { gmapsInit } from '@unilever-hair/nexxus-common-utils/src/gmaps-init';
import Button from '@unilever-hair/nexxus-common-components/Button';
import { StoreFinderBus } from '../StoreFinderBus';
import StoreFinderMapMarker from '../StoreFinderMapMarker';

const MapMarker = (store) => {
  return new Vue({
    ...StoreFinderMapMarker,
    parent: this,
    propsData: {
      store,
    },
  }).$mount();
};

export default {
  name: 'StoreFinderMap',
  components: {
    Button,
  },
  data: () => ({
    storeResults: {},
    google: {},
    map: null,
    mapOptions: {},
    markers: [],
    infoWindow: null,
    mapBounds: null,
  }),
  props: {
    defaultLocation: {
      type: Object,
      default: () => ({
        lat: 40.7475631,
        lng: -74.0042285,
      }),
    },
  },
  computed: {
    isMdScreenOrWider: () => ResizeBus.windowWidth >= ResizeBus.mdWidth,
    stores: () => StoreFinderBus.stores,
    activeStoreIndex: () => StoreFinderBus.activeStoreIndex,
    zipCode: () => StoreFinderBus.zipCode,
    mapActive: () => StoreFinderBus.mapActive,
    lat: () => StoreFinderBus.locationLatLng?.lat || 40.7590402,
    lng: () => StoreFinderBus.locationLatLng?.lng || -74.0394422,
    error: () => StoreFinderBus.error,
  },
  watch: {
    stores() {
      if (this.mapActive) {
        this.clearMarkers();
        this.placeMarkers();
      }
    },
    activeStoreIndex(newStoreIndex) {
      if (this.mapActive) {
        this.google.maps.event.trigger(this.markers[newStoreIndex], 'click');
      }
    },
    mapActive(newValue) {
      if (newValue === true) {
        this.$nextTick(() => {
          this.clearMarkers();
          this.placeMarkers();
          this.$refs.close.$el.focus();
        });
      }
    },
    error(newValue) {
      if (newValue === true) {
        this.clearMarkers();
      }
    },
  },
  async mounted() {
    try {
      this.google = await gmapsInit({
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      });
      this.initMap();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  },
  methods: {
    closeMap() {
      StoreFinderBus.$emit('map-active', false);
      document.getElementById('store-finder-view-toggle').focus();
    },
    initMap() {
      this.mapOptions = {
        zoom: 12,
        mapTypeId: this.google.maps.MapTypeId.ROADMAP,
        center: new this.google.maps.LatLng(this.lat, this.lng),
        disableDefaultUI: true,
      };
      this.mapBounds = new this.google.maps.LatLngBounds();
      this.infoWindow = new this.google.maps.InfoWindow();
      this.map = new this.google.maps.Map(this.$refs.map, this.mapOptions);
      this.placeMarkers();
    },
    resetBounds() {
      this.mapBounds = new this.google.maps.LatLngBounds();
    },
    createMarker(latlng, html, title, index) {
      const marker = new this.google.maps.Marker({
        map: this.map,
        position: latlng,
        title,
        animation: this.google.maps.Animation.DROP,
        index,
      });
      const vm = this;
      this.google.maps.event.addListener(marker, 'click', () => {
        vm.infoWindow.setContent(html);
        vm.infoWindow.open(this.map, marker);
        const storeIndex = this.markers.findIndex((obj) => obj.index === marker.index);
        StoreFinderBus.$emit('active-store-index', storeIndex);
      });
      this.mapBounds.extend(latlng);
      this.markers.push(marker);
    },
    async centerMapOnZipCode() {
      let position = {
        lat: this.lat,
        lng: this.lng,
      };
      await new this.google.maps.Geocoder().geocode(
        { address: this.zipCode },
        (results, status) => {
          if (status === 'OK') {
            position = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            };
            this.map.setCenter(position);
          }
        }
      );
    },
    async placeMarkers() {
      this.resetBounds();
      if (!this.stores || this.stores.length < 1) this.centerMapOnZipCode();
      this.stores.forEach((store, index) => {
        const latlng = new this.google.maps.LatLng(store.LATITUDE, store.LONGITUDE);
        const content = MapMarker(store).$el;
        this.createMarker(latlng, content, store.NAME, index);
      });
      this.map.fitBounds(this.mapBounds, {
        left: this.isMdScreenOrWider ? 400 : 0,
      });
      this.google.maps.event.trigger(this.map, 'resize');
    },
    clearMarkers() {
      for (let i = 0; i < this.markers.length; i += 1) {
        this.markers[i].setMap(null);
      }
      this.markers.length = 0;
    },
  },
};
