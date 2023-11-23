import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  isScreenFinish: boolean;
  currentFloor: number;
  destination: any;
}

const initialState: State = {
  isScreenFinish: false,
  currentFloor: 0,
  destination: { category: -1, etage: -1, room: -1 },
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
    setDestination: (state, action: PayloadAction<any>) => {
      state.destination = action.payload;
      console.log(action.payload);
    },
  },
});

export const { setIsScreenFinish } = slice.actions;
export const { setCurrentFloor } = slice.actions;
export const { setDestination } = slice.actions;
export default slice.reducer;
