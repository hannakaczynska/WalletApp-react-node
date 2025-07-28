import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './slices/currencySlice';
import transactionReducer from './transactions/transactionSlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    transaction: transactionReducer,
  }, 
});