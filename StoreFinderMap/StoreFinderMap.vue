<template>
  <div class="us-c-store-finder-map">
    <Button
      ref="close"
      class="us-c-store-finder-map__close"
      type="button"
      :modifiers="['icon-only']"
      sr-text="Close Map"
      @click="closeMap"
    >
      <img slot="icon" src="@unilever-hair/nexxus-common-assets/icons/cross.svg" svg-inline />
    </Button>
    <div ref="map" class="us-c-store-finder-map__canvas" />
  </div>
</template>

<script src="./StoreFinderMap.js"></script>
<style src="./StoreFinderMap.css"></style>
