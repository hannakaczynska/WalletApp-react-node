import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './slices/currencySlice';
import transactionReducer from './transactions/transactionSlice';
import sessionReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    transaction: transactionReducer,
    session: sessionReducer,
  }, 
});