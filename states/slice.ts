import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  isScreenFinish: boolean;
  currentFloor: number;
}

const initialState: State = {
  isScreenFinish: false,
  currentFloor: 0,
};

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setIsScreenFinish: (state, action: PayloadAction<boolean>) => {
      state.isScreenFinish = action.payload;
    },
    setCurrentFloor: (state, action: PayloadAction<number>) => {
      state.currentFloor = action.payload;
},
  },
});

export const { setIsScreenFinish } = slice.actions;
export const { setCurrentFloor } = slice.actions;
export default slice.reducer;
