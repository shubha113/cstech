import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Upload and distribute file
export const uploadFile = createAsyncThunk(
  'list/upload',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/v1/lists/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      
      const data = await response.json()
      
      if (!data.success) {
        return rejectWithValue(data.message)
      }
      
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Get distributed lists
export const getDistributedLists = createAsyncThunk(
  'list/getDistributed',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/v1/lists/distributed', {
        method: 'GET',
        credentials: 'include',
      })
      
      const data = await response.json()
      
      if (!data.success) {
        return rejectWithValue(data.message)
      }
      
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const listSlice = createSlice({
  name: 'list',
  initialState: {
    distributedLists: [],
    loading: false,
    error: null,
    message: null,
    uploadStats: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearMessage: (state) => {
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload file cases
      .addCase(uploadFile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.uploadStats = {
          totalItems: action.payload.totalItems,
          distributedLists: action.payload.distributedLists
        }
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Get distributed lists cases
      .addCase(getDistributedLists.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getDistributedLists.fulfilled, (state, action) => {
        state.loading = false
        state.distributedLists = action.payload.lists
      })
      .addCase(getDistributedLists.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearMessage } = listSlice.actions
export default listSlice.reducer