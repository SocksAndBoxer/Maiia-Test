import { Availability } from '@prisma/client';
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  SerializedError,
} from '@reduxjs/toolkit';
import { SERVER_API_ENDPOINT } from './constants';
import { parseIds } from './utils';

export const getAvailabilities = createAsyncThunk(
  'getAvailabilities',
  async () => {
    const response = await fetch(`${SERVER_API_ENDPOINT}/availabilities`);
    const parsedResponse = await response.json();
    return parseIds(parsedResponse) as Availability[];
  },
);

const availabilitiesAdapter = createEntityAdapter<Availability>({
  sortComparer: (a, b) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
});

export const availabilitiesSelectors = availabilitiesAdapter.getSelectors();

const availabilitiesSlice = createSlice({
  name: 'availabilities',
  initialState: availabilitiesAdapter.getInitialState<{
    loading: boolean;
    error: null | SerializedError;
  }>({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAvailabilities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAvailabilities.fulfilled, (state, action) => {
      availabilitiesAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getAvailabilities.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default availabilitiesSlice;
