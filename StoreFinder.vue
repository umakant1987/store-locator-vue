<template>
  <section :class="['us-c-store-finder', { 'is-active': finderActive }]">
    <div
      v-show="!finderActive"
      class="us-c-store-finder__start o-container"
      data-testid="store-finder"
    >
      <div class="us-c-store-finder__start__inner">
        <h2 class="us-c-store-finder__start__title o-heading-xl o-heading-strong">
          {{ labels.startTitle }}
        </h2>
        <p class="us-c-store-finder__start__description o-text-c">
          {{ labels.startContent }}
        </p>
        <div class="us-c-store-finder__start__input">
          <StoreFinderInput
            :product-id="product.productId"
            :unique-product-code="product.uniqueProductCode"
          />
        </div>
        <p class="us-c-store-finder__start__search-title o-text-c">
          {{ labels.startSearchingTitle }}
        </p>
        <StoreFinderProduct :product="product" />
      </div>
    </div>
    <div
      v-if="finderActive"
      class="us-c-store-finder__locations"
      data-testid="store-finder-locations"
    >
      <div class="us-c-store-finder__locations__inner o-container">
        <StoreFinderList>
          <StoreFinderProduct :product="product" />
          <StoreFinderInput
            :product-id="product.productId"
            :unique-product-code="product.uniqueProductCode"
          />
        </StoreFinderList>
      </div>
      <StoreFinderMap v-show="mapActive" />
    </div>
  </section>
</template>

<script src="./StoreFinder.js"></script>
<style src="./StoreFinder.css" scoped></style>
