import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = "https://cstech-backend.onrender.com";

// Create agent
export const createAgent = createAsyncThunk(
  'agent/create',
  async (agentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/api/v1/agents/create`, agentData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// Get all agents
export const getAllAgents = createAsyncThunk(
  'agent/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/api/v1/agents/all`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const agentSlice = createSlice({
  name: 'user',
  initialState: {
    agents: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create agent cases
      .addCase(createAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.agents.push(action.payload.user);
      })
      .addCase(createAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get all agents cases
      .addCase(getAllAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload.agents;
      })
      .addCase(getAllAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearMessage } = agentSlice.actions;
export default agentSlice.reducer;
