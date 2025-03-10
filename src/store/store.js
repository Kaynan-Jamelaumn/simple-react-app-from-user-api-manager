// store/store.js
import { configureStore, combineReducers  } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './authSlice';
import loadingReducer from './loadingSlice';
// Configuration for redux-persist
const persistConfig = {
  key: 'root', // Key for the persisted state
  storage, // Storage engine (localStorage in this case)
  whitelist: ['auth'], // Only persist the 'auth' slice of the state
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedReducer,
  loading: loadingReducer,
});



// Configure the store with the persisted reducer
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore redux-persist actions
      },
    }),
});

// Create a persistor object
const persistor = persistStore(store);

export { store, persistor };