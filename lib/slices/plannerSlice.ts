import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlannerItemType, ItineraryType } from '@/components/planner/types'

interface StickyNote {
  id: string
  text: string
  position?: { x: number; y: number }
  zIndex?: number
  color?: string
}

// Available colors for sticky notes
const stickyNoteColors = [
  'yellow',
  'pink',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'teal'
]

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
    { id: '1', text: 'Remember to pack your jellyfishing net!', position: { x: 50, y: 50 }, zIndex: 1, color: 'yellow' },
    { id: '2', text: 'Book Krusty Krab reservation in advance', position: { x: 200, y: 100 }, zIndex: 2, color: 'pink' },
    { id: '3', text: 'Don\'t forget to bring extra change for the bus', position: { x: 350, y: 150 }, zIndex: 3, color: 'blue' },
    { id: '4', text: 'Check weather forecast for jellyfishing day', position: { x: 500, y: 200 }, zIndex: 4, color: 'green' }
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
      const randomColor = stickyNoteColors[Math.floor(Math.random() * stickyNoteColors.length)]
      const newNote = {
        ...action.payload,
        position: action.payload.position || { x: Math.random() * 300, y: Math.random() * 200 },
        zIndex: action.payload.zIndex || Math.max(...state.stickyNotes.map(note => note.zIndex || 0), 0) + 1,
        color: action.payload.color || randomColor,
        text: action.payload.text || ""
      }
      state.stickyNotes.push(newNote)
    },
    updateStickyNote: (state, action: PayloadAction<StickyNote>) => {
      const index = state.stickyNotes.findIndex(note => note.id === action.payload.id)
      if (index !== -1) {
        state.stickyNotes[index] = action.payload
      }
    },
    updateStickyNotePosition: (state, action: PayloadAction<{ id: string; position: { x: number; y: number }; zIndex: number }>) => {
      const index = state.stickyNotes.findIndex(note => note.id === action.payload.id)
      if (index !== -1) {
        state.stickyNotes[index].position = action.payload.position
        state.stickyNotes[index].zIndex = action.payload.zIndex
      }
    },
    updateStickyNoteColor: (state, action: PayloadAction<{ id: string; color: string }>) => {
      const index = state.stickyNotes.findIndex(note => note.id === action.payload.id)
      if (index !== -1) {
        state.stickyNotes[index].color = action.payload.color
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
  updateStickyNotePosition,
  updateStickyNoteColor,
  deleteStickyNote,
  setStickyNotes,
  setItineraries,
  addItinerary,
  updateItinerary,
  deleteItinerary,
} = plannerSlice.actions

export default plannerSlice.reducer 