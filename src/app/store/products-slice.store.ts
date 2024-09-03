import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InfoProductModel } from '../models/product-info.model.ts'
import { ProductsStateList } from '../models/product-state-list.model.ts'

const initialState: ProductsStateList = {
  products: [],
}

const productsSliceStore = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<InfoProductModel>): void => {
      state.products.push(action.payload)
      localStorage.setItem('products', JSON.stringify(state.products))
    },
    updateProduct(state, action: PayloadAction<InfoProductModel>): void {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      )
      if (index !== -1) {
        state.products[index] = action.payload
        localStorage.setItem('products', JSON.stringify(state.products))
      }
    },
    deleteProduct: (state, action: PayloadAction<string>): void => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      )
      localStorage.setItem('products', JSON.stringify(state.products))
    },
  },
})

export const { addProduct, updateProduct, deleteProduct } =
  productsSliceStore.actions

export default productsSliceStore.reducer
