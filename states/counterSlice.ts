// counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    value: boolean;
}

const initialState: CounterState = {
    value: false, // Initial value is false
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        toggleValue: (state) => {
            state.value = !state.value;
        },
    },
});

export const { toggleValue } = counterSlice.actions;
export default counterSlice.reducer;
