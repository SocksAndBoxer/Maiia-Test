import { Practitioner } from '@prisma/client';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { parseIds } from 'store/utils';
import { SERVER_API_ENDPOINT } from './constants';

export const getPractitioners = createAsyncThunk(
  'getPractitioners',
  async () => {
    const response = await fetch(`${SERVER_API_ENDPOINT}/practitioners`);
    const parsedResponse = await response.json();
    return parseIds(parsedResponse) as Practitioner[];
  },
);

const practitionersAdapter = createEntityAdapter<Practitioner>({
  sortComparer: (a, b) => a.lastName.localeCompare(b.lastName),
});

export const practitionersSelectors = practitionersAdapter.getSelectors();

const practitionersSlice = createSlice({
  name: 'practitioners',
  initialState: practitionersAdapter.getInitialState<{
    loading: boolean;
    error: null | SerializedError;
  }>({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPractitioners.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPractitioners.fulfilled, (state, action) => {
      practitionersAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getPractitioners.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default practitionersSlice;
