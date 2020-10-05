import { render, fireEvent, waitFor } from '@testing-library/vue';

import StoreFinderInput from '.';
import { StoreFinderBus } from '../StoreFinderBus';

const mockEmit = jest.spyOn(StoreFinderBus, '$emit');
afterEach(() => {
  mockEmit.mockClear();
  StoreFinderBus.$emit('finder-active', false);
});

function renderStoreFinderInput() {
  return render(StoreFinderInput, {
    props: {
      productId: 605592005565,
    },
    hydrate: true,
  });
}

test(`sets zipcode value`, () => {
  const { getByTestId } = renderStoreFinderInput();
  const zipInput = getByTestId(`store-finder-zipcode`);
  zipInput.value = 10001;
  expect(getByTestId(`store-finder-zipcode`)).toBeTruthy();
});
test(`should show stores  if button action is clicked`, async () => {
  const { getByTestId } = renderStoreFinderInput();
  const zipInput = getByTestId(`store-finder-zipcode`);
  zipInput.value = 10001;
  expect(getByTestId(`store-finder-zipcode`)).toBeTruthy();
  await fireEvent.click(getByTestId(`store-finder-search`));
  await waitFor(
    () => {
      expect(mockEmit).toHaveBeenCalledWith('finder-active', true);
    },
    {
      timeout: 4000,
    }
  );
});
