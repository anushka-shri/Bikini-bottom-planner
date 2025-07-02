import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlannerItemType, ItineraryType } from '@/components/planner/types'

interface StickyNote {
  id: string
  text: string
}

interface PlannerState {
  items: PlannerItemType[]
  stickyNotes: StickyNote[]
  itineraries: ItineraryType[]
  loading: boolean
  error: string | null
}

const initialState: PlannerState = {
  items: [],
  stickyNotes: [
    { id: '1', text: 'Remember to pack your jellyfishing net!' },
    { id: '2', text: 'Book Krusty Krab reservation in advance' },
    { id: '3', text: 'Don\'t forget to bring extra change for the bus' },
    { id: '4', text: 'Check weather forecast for jellyfishing day' }
  ],
  itineraries: [],
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
    // Sticky Notes reducers
    addStickyNote: (state, action: PayloadAction<StickyNote>) => {
      state.stickyNotes.push(action.payload)
    },
    updateStickyNote: (state, action: PayloadAction<StickyNote>) => {
      const index = state.stickyNotes.findIndex(note => note.id === action.payload.id)
      if (index !== -1) {
        state.stickyNotes[index] = action.payload
      }
    },
    deleteStickyNote: (state, action: PayloadAction<string>) => {
      state.stickyNotes = state.stickyNotes.filter(note => note.id !== action.payload)
    },
    setStickyNotes: (state, action: PayloadAction<StickyNote[]>) => {
      state.stickyNotes = action.payload
    },
    // Itineraries reducers
    setItineraries: (state, action: PayloadAction<ItineraryType[]>) => {
      state.itineraries = action.payload
    },
    addItinerary: (state, action: PayloadAction<ItineraryType>) => {
      state.itineraries.push(action.payload)
    },
    updateItinerary: (state, action: PayloadAction<ItineraryType>) => {
      const index = state.itineraries.findIndex(itinerary => itinerary.id === action.payload.id)
      if (index !== -1) {
        state.itineraries[index] = action.payload
      }
    },
    deleteItinerary: (state, action: PayloadAction<string>) => {
      state.itineraries = state.itineraries.filter(itinerary => itinerary.id !== action.payload)
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
  addStickyNote,
  updateStickyNote,
  deleteStickyNote,
  setStickyNotes,
  setItineraries,
  addItinerary,
  updateItinerary,
  deleteItinerary,
} = plannerSlice.actions

export default plannerSlice.reducer 