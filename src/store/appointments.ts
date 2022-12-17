import { Appointment } from '@prisma/client';
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  SerializedError,
} from '@reduxjs/toolkit';
import { SERVER_API_ENDPOINT } from './constants';
import { parseIds } from './utils';

export const getAppointments = createAsyncThunk('getAppointments', async () => {
  const response = await fetch(`${SERVER_API_ENDPOINT}/appointments`);
  const parsedResponse = await response.json();
  return parseIds(parsedResponse) as Appointment[];
});

export const postAppointment = createAsyncThunk(
  'postAppointment',
  async (data: Appointment) => {
    const response = await fetch(`${SERVER_API_ENDPOINT}/appointments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const parsedResponse = await response.json();
    return parseIds(parsedResponse) as Appointment[];
  },
);

const appointmentsAdapter = createEntityAdapter<Appointment>({
  sortComparer: (a, b) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
});

export const appointmentsSelectors = appointmentsAdapter.getSelectors();

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: appointmentsAdapter.getInitialState<{
    loading: boolean;
    error: null | SerializedError;
  }>({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    // GET
    builder.addCase(getAppointments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAppointments.fulfilled, (state, action) => {
      appointmentsAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getAppointments.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    // POST
    builder.addCase(postAppointment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postAppointment.fulfilled, (state, action) => {
      appointmentsAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(postAppointment.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default appointmentsSlice;
