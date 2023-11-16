// slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  isScreenFinish: boolean;
}

const initialState: State = {
  isScreenFinish: false,
};

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setIsScreenFinish: (state, action: PayloadAction<boolean>) => {
      state.isScreenFinish = action.payload;
    },
  },
});

export const { setIsScreenFinish } = slice.actions;
export default slice.reducer;
