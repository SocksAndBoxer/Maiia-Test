import { Patient } from '@prisma/client';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { parseIds } from 'store/utils';
import { SERVER_API_ENDPOINT } from './constants';

export const getPatients = createAsyncThunk('getPatients', async () => {
  const response = await fetch(`${SERVER_API_ENDPOINT}/patients`);
  const parsedResponse = await response.json();
  return parseIds(parsedResponse) as Patient[];
});

const patientsAdapter = createEntityAdapter<Patient>({
  sortComparer: (a, b) => a.lastName.localeCompare(b.lastName),
});

export const patientsSelectors = patientsAdapter.getSelectors();

const patientsSlice = createSlice({
  name: 'patients',
  initialState: patientsAdapter.getInitialState<{
    loading: boolean;
    error: null | SerializedError;
  }>({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPatients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPatients.fulfilled, (state, action) => {
      patientsAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getPatients.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default patientsSlice;
