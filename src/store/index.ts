import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './modules/users'
import signsReducer from './modules/signs'
import checksReducer from './modules/checks'
import newsReducer from './modules/news'
import type { Reducer, AnyAction } from '@reduxjs/toolkit'
import { UsersState } from './modules/users'
import type { PersistPartial } from 'redux-persist/es/persistReducer'
// 持久化
import {
  persistStore,
  persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { useDispatch } from 'react-redux'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['token']
}

const store = configureStore({
  reducer: {
    users: persistReducer(persistConfig, usersReducer) as Reducer<UsersState & PersistPartial, AnyAction> ,// 持久化users下的token
    signs: signsReducer,
    checks: checksReducer,
    news: newsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false
    }),
})

persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
