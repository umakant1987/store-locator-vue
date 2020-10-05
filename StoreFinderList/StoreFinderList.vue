<template>
  <div class="us-c-store-finder-list">
    <div class="us-c-store-finder-list__header">
      <slot />
      <div class="us-c-store-finder-list__header__actions">
        <div class="us-c-store-finder-list__count">
          Showing <strong>{{ stores.length }}</strong> stores
        </div>
        <div class="us-c-store-finder-list__toggle">
          <Button
            id="store-finder-view-toggle"
            class="us-c-store-finder-list__toggle__action"
            type="button"
            :modifiers="['icon', 'icon-left', 'blank']"
            @click="toggleView"
          >
            <img
              slot="icon"
              src="@unilever-hair/nexxus-common-assets/icons/map2.svg"
              class="us-c-store-finder-input__locate__icon"
              svg-inline
            />
            {{ toggleText }}
          </Button>
        </div>
      </div>
    </div>
    <div
      v-if="!error && stores && stores.length > 0"
      ref="list"
      class="us-c-store-finder-list__stores"
    >
      <article
        v-for="(store, index) in stores"
        :id="`store-${index}`"
        :ref="`store-${index}`"
        :key="store.STORE_ID"
        class="us-c-store-finder-list__store"
        :class="[
          'us-c-store-finder-list__store',
          {
            'is-active': index === activeStoreIndex,
          },
        ]"
        itemscope
        itemtype="http://schema.org/LocalBusiness"
      >
        <button
          type="button"
          class="us-c-store-finder-list__store__action"
          @click="selectStore(index)"
        >
          <div class="us-c-store-finder-list__store__header">
            <h4 class="us-c-store-finder-list__store__title o-heading-xs">
              {{ index + 1 }}. <span itemprop="name">{{ store.NAME }}</span>
            </h4>
            <div class="us-c-store-finder-list__store__distance">{{ store.DISTANCE }} miles</div>
          </div>
          <div class="us-c-store-finder-list__store__details">
            <address
              class="us-c-store-finder-list__store__address"
              itemprop="address"
              itemscope
              itemtype="http://schema.org/PostalAddress"
            >
              <span itemprop="streetAddress">{{ store.ADDRESS }}</span>
              <span itemprop="addressLocality">{{ store.CITY }}</span>
              <span itemprop="addressRegion">{{ store.STATE }}</span>
              <span itemprop="postalCode">{{ store.ZIP }}</span>
            </address>
            <div class="us-c-store-finder-list__store__phone">
              Tel: <span itemprop="telephone">{{ store.PHONE }}</span>
            </div>
          </div>
        </button>
      </article>
    </div>
    <div v-else-if="error" class="us-c-store-finder-list__no-stores">
      {{ error }}
    </div>
    <div v-else class="us-c-store-finder-list__no-stores">Sorry, maybe try another ZIP?</div>
  </div>
</template>

<script src="./StoreFinderList.js"></script>
<style src="./StoreFinderList.css"></style>
