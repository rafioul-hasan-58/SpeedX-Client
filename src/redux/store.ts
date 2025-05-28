import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import searchReducer from './features/user/userSlice';
import productIdReducer from './features/cart/cartSlice';
import { baseApi } from './api/baseApi';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine all reducers
const rootReducer = combineReducers({
    auth: authReducer,
    searchTerm: searchReducer,
    products: productIdReducer, // <-- This is what you want to persist too
    [baseApi.reducerPath]: baseApi.reducer,
});

// Set up persist config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'products'], // <-- Persist both `auth` and `products`
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(baseApi.middleware),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export persistor
export const persistor = persistStore(store);
