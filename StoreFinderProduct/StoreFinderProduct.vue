<template>
  <div class="us-c-store-finder-product" data-testid="store-finder-product">
    <g-image
      v-if="product.thumbnail"
      :src="product.thumbnail"
      :alt="product.title"
      class="us-c-store-finder-product__image"
      data-testid="store-finder-product-media"
    />
    <p class="us-c-store-finder-product__title" data-testid="store-finder-product-title">
      {{ product.title }}
    </p>
  </div>
</template>

<script src="./StoreFinderProduct.js"></script>
<style src="./StoreFinderProduct.css"></style>
