import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import currencyReducer from './slices/currencySlice';
import transactionReducer from './transactions/transactionSlice';
import sessionReducer from './user/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session', 'transaction'], 
  blacklist: ['currency'], 
};

const rootReducer = combineReducers({
  currency: currencyReducer, 
  transaction: transactionReducer,
  session: sessionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], 
      },
    }),
});

export const persistor = persistStore(store);