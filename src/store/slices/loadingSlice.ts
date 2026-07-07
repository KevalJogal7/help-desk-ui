import { createSlice } from "@reduxjs/toolkit";
import type { LoadingState } from "../../models/common";

const initialState: LoadingState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading(state, action: { payload: boolean }) {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
