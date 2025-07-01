import { configureStore } from '@reduxjs/toolkit'
import plannerReducer from './slices/plannerSlice'

export const store = configureStore({
  reducer: {
    planner: plannerReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 