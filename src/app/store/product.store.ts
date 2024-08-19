import {configureStore} from '@reduxjs/toolkit';
import productsSlice from './products-slice.store.ts';

const loadProductsFromLocalStorage = () => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
};

const store = configureStore({
    reducer: {
        products: productsSlice,
    },
    preloadedState: {
        products: {
            products: loadProductsFromLocalStorage(),
        }
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
