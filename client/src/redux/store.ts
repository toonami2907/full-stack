import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';



const rootReducer = combineReducers({
    user: userReducer
});
export type RootState = ReturnType<typeof rootReducer>;
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer ,
    middleware: (getDefaultMidddleware) => getDefaultMidddleware({
        serializableCheck: false,
    }),
});


export const persistor = persistStore(store);