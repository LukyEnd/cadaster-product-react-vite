import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductVariationModel} from '../models/product-variation.model.ts';
import {ProductVariationsState} from "../models/product-variation-state.model.ts";

const initialState: ProductVariationsState = {
    variations: [],
};

const productVariationsSlice = createSlice({
    name: 'variations',
    initialState,
    reducers: {
        addVariation: (state, action: PayloadAction<ProductVariationModel>): void => {
            state.variations.push(action.payload);
        },
        updateVariation: (state, action: PayloadAction<ProductVariationModel>): void => {
            const index = state.variations.findIndex(v => v.id === action.payload.productId);
            if (index !== -1) {
                state.variations[index] = action.payload;
            }
        },
        removeVariation: (state, action: PayloadAction<number>): void => {
            state.variations = state.variations.filter(v => v.id !== action.payload);
        },
    },
});

export const {
    addVariation,
    updateVariation,
    removeVariation
} = productVariationsSlice.actions;

export default productVariationsSlice.reducer;
