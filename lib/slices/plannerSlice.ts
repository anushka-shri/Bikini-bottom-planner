import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlannerItemType } from '@/components/planner/types'

interface PlannerState {
  items: PlannerItemType[]
  loading: boolean
  error: string | null
}

const initialState: PlannerState = {
  items: [],
  loading: false,
  error: null,
}

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PlannerItemType[]>) => {
      state.items = action.payload
    },
    addItem: (state, action: PayloadAction<PlannerItemType>) => {
      state.items.push(action.payload)
    },
    updateItem: (state, action: PayloadAction<PlannerItemType>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    reorderItems: (state, action: PayloadAction<PlannerItemType[]>) => {
      state.items = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setItems,
  addItem,
  updateItem,
  deleteItem,
  reorderItems,
  setLoading,
  setError,
} = plannerSlice.actions

export default plannerSlice.reducer 