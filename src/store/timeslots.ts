import { Timeslot } from '@prisma/client';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { parseIds } from 'store/utils';
import { SERVER_API_ENDPOINT } from './constants';

export const getTimeSlots = createAsyncThunk('getTimeSlots', async () => {
  const response = await fetch(`${SERVER_API_ENDPOINT}/timeslots`);
  const parsedResponse = await response.json();
  return parseIds(parsedResponse) as Timeslot[];
});

const timeslotsAdapter = createEntityAdapter<Timeslot>({
  sortComparer: (a, b) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
});

export const timeslotsSelectors = timeslotsAdapter.getSelectors();

const timeslotsSlice = createSlice({
  name: 'timeslots',
  initialState: timeslotsAdapter.getInitialState<{
    loading: boolean;
    error: null | SerializedError;
  }>({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTimeSlots.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTimeSlots.fulfilled, (state, action) => {
      timeslotsAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getTimeSlots.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default timeslotsSlice;
