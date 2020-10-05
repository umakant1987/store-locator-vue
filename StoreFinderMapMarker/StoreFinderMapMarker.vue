<template>
  <article class="us-c-store-finder-map-marker">
    <div class="us-c-store-finder-map-marker__header">
      <h4 class="us-c-store-finder-map-marker__title o-heading-xs">
        <span itemprop="name">{{ store.NAME }}</span>
      </h4>
      <div class="us-c-store-finder-map-marker__distance o-text-d">{{ store.DISTANCE }} miles</div>
    </div>
    <div class="us-c-store-finder-map-marker__details o-text-d">
      <address
        class="us-c-store-finder-map-marker__address"
        itemprop="address"
        itemscope
        itemtype="http://schema.org/PostalAddress"
      >
        <span itemprop="streetAddress">{{ store.ADDRESS }}</span>
        <span itemprop="addressLocality">{{ store.CITY }}</span>
        <span itemprop="addressRegion">{{ store.STATE }}</span>
        <span itemprop="postalCode">{{ store.ZIP }}</span>
      </address>
      <div class="us-c-store-finder-map-marker__phone">
        Tel: <span itemprop="telephone">{{ store.PHONE }}</span>
      </div>
      <div class="us-c-store-finder-map-marker__directions">
        <a
          class="us-c-store-finder-map-marker__directions__link"
          target="_blank"
          rel="noopener"
          :href="`http://maps.google.com/?daddr=${store.ADDRESS}`"
        >
          Get Directions
          <img
            src="@unilever-hair/nexxus-common-assets/icons/launch.svg"
            class="us-c-store-finder-map-marker__directions__icon"
            svg-inline
          />
        </a>
      </div>
    </div>
  </article>
</template>

<script src="./StoreFinderMapMarker.js"></script>
<style src="./StoreFinderMapMarker.css"></style>
