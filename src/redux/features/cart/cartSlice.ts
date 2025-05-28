import { IProduct } from '@/types/product.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICartProduct extends IProduct {
    isChecked: boolean;
    quantity: number;
}
const initialState: { products: ICartProduct[] } = {
    products: []
};

const userSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProduct>) => {
            const exists = state.products.some(p => p._id === action.payload._id);
            if (!exists) {
                state.products.push({
                    ...action.payload,
                    quantity: 1,
                    isChecked: false
                });
            }
        },
        increseQuantity: (state, action: PayloadAction<string>) => {
            const product = state.products.find(p => p._id === action.payload);
            if (product) {
                product.quantity += 1;
            }
        },
        decreseQuantity: (state, action: PayloadAction<string>) => {
            const product = state.products.find(p => p._id === action.payload);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
            }
        },
        toggleCheckbox: (state, action: PayloadAction<string>) => {
            const product = state.products.find(p => p._id === action.payload);
            if (product) {
                product.isChecked = !product.isChecked;
            }
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(p => p._id !== action.payload);
        }
    },
});

export const { addProduct, removeProduct, increseQuantity, decreseQuantity, toggleCheckbox } = userSlice.actions;
export default userSlice.reducer;

