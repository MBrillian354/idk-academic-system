import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';

export const fetchScores = createAsyncThunk(
  'scores/fetch',
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await API.get('/scores', { params: { page, limit } });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addScore = createAsyncThunk(
  'scores/add',
  async (scoreData, { rejectWithValue }) => {
    try {
      const res = await API.post('/scores', scoreData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateScore = createAsyncThunk(
  'scores/update',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/scores/${id}`, updates);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteScore = createAsyncThunk(
  'scores/delete',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/scores/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const scoreSlice = createSlice({
  name: 'scores',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchScores.pending, state => { state.loading = true; })
      .addCase(fetchScores.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchScores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(addScore.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateScore.fulfilled, (state, action) => {
        const idx = state.list.findIndex(s => s._id === action.payload._id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteScore.fulfilled, (state, action) => {
        state.list = state.list.filter(s => s._id !== action.payload);
      });
  }
});

export default scoreSlice.reducer;