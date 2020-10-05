<template>
  <div class="us-c-store-finder-input">
    <div :class="['us-c-store-finder-input__locate', { 'is-loading': gettingLocation }]">
      <button
        ref="locate-action"
        type="button"
        class="us-c-store-finder-input__locate__action"
        @click="getLocation"
      >
        <span class="u-sr-only"> Use your current location </span>
        <img
          src="@unilever-hair/nexxus-common-assets/icons/aim.svg"
          class="us-c-store-finder-input__locate__icon"
          svg-inline
        />
      </button>
    </div>
    <form
      class="us-c-store-finder-input__form"
      name="store-finder-form"
      method="post"
      @submit.prevent="onSubmit"
    >
      <label for="store-finder-zipcode" class="u-sr-only"> ZIP Code </label>
      <FormInput
        id="store-finder-zipcode"
        ref="input"
        v-model="inputValue"
        class="us-c-store-finder-input__input"
        type="text"
        placeholder="Enter your zip code"
        :modifiers="['small']"
        name="zip"
        maxlength="5"
        :readonly="gettingLocation"
        autocomplete="off"
        pattern="[0-9]*"
        inputmode="numeric"
        required
        data-testid="store-finder-zipcode"
      />
      <Button
        ref="search-action"
        type="submit"
        class="us-c-store-finder-input__search-action"
        :modifiers="['icon-only']"
        sr-text="Find stores"
        data-testid="store-finder-search"
      >
        <img slot="icon" src="@unilever-hair/nexxus-common-assets/icons/magnifier.svg" svg-inline />
      </Button>
    </form>
  </div>
</template>

<script src="./StoreFinderInput.js"></script>
<style src="./StoreFinderInput.css" scoped></style>
