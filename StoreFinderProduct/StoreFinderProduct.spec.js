import { render } from '@testing-library/vue';
import GImage from 'gridsome/app/components/Image';
import ImageDirective from 'gridsome/app/directives/image';
import StoreFinderProduct from '.';

const product = {
  title: 'product title',

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

const config = (Vue) => {
  Vue.directive(`g-image`, ImageDirective);
  Vue.component(`g-image`, GImage);
};
test(`renders title`, () => {
  const { getByTestId } = render(
    StoreFinderProduct,
    {
      props: {
        product,
      },
    },
    config
  );
  expect(getByTestId(`store-finder-product-title`)).toBeVisible();
});
test(`renders image`, () => {
  const { getByTestId } = render(
    StoreFinderProduct,
    {
      props: {
        product,
      },
    },
    config
  );
  expect(getByTestId(`store-finder-product-media`)).toBeVisible();
});
