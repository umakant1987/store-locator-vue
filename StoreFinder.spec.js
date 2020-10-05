import { render, fireEvent, waitFor } from '@testing-library/vue';

import StoreFinder from '.';
import { StoreFinderBus } from './StoreFinderBus';

const product = {
  title: 'product title',
  productId: 605592005565,

  thumbnail: {
    dataUri: `data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQEAAwAAAAAAAAAAAAAAAAcBAgMI/8QAJRAAAQQBAwIHAAAAAAAAAAAAAQACAwQFBhESB3ETFCEiMUFh/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAEFAgT/xAAYEQEBAQEBAAAAAAAAAAAAAAAAAQIDMf/aAAwDAQACEQMRAD8A9B5Oc1sbZmYdnsic5vcBSzpJqjLZPUd+tlrJkhc0uja4fB3+lUMtV83jbELSQ58ZYD3U16X6Nu4bUN69c5FrQY2DluD+qFz1mYsqiqxHqiwlFy02tXXBG2PxOO/uduUROeBzREWQ/9k=`,
    srcset: [
      `https://cdn.sanity.io/images/cstxp841/production/4abd0d7dc3b5059d4ea5487cb0b97c5489883056-345x345.jpg?w=175&h=175&fit=crop 175w`,
      `https://cdn.sanity.io/images/cstxp841/production/4abd0d7dc3b5059d4ea5487cb0b97c5489883056-345x345.jpg?w=350&h=350&fit=crop 350w`,
      `https://cdn.sanity.io/images/cstxp841/production/4abd0d7dc3b5059d4ea5487cb0b97c5489883056-345x345.jpg?w=400&h=400&fit=crop 400w`,
    ],
    src: `https://cdn.sanity.io/images/cstxp841/production/4abd0d7dc3b5059d4ea5487cb0b97c5489883056-345x345.jpg?w=700&h=700&fit=crop`,
    sizes: `(max-width: 768px) 90vw`,
    size: { width: `100%` },
  },
};

const mockEmit = jest.spyOn(StoreFinderBus, '$emit');
afterEach(() => {
  mockEmit.mockClear();
});

function renderStoreFinder() {
  return render(StoreFinder, {
    props: {
      product,
    },
    hydrate: true,
  });
}

test(`sets zipcode value`, () => {
  const { getByTestId } = renderStoreFinder();
  const zipInput = getByTestId(`store-finder-zipcode`);
  zipInput.value = 10001;
  expect(getByTestId(`store-finder-zipcode`)).toBeTruthy();
});

test(`should show stores  if button action is clicked`, async () => {
  const { getByTestId } = renderStoreFinder();
  const zipInput = getByTestId(`store-finder-zipcode`);
  zipInput.value = 10001;
  expect(getByTestId(`store-finder-zipcode`)).toBeTruthy();
  await fireEvent.click(getByTestId(`store-finder-search`));
  await waitFor(
    () => {
      expect(getByTestId(`store-finder`)).not.toBeVisible();
      expect(getByTestId(`store-finder-locations`)).toBeVisible();
    },
    { timeout: 4000 }
  );
});
