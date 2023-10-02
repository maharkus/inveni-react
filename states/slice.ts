// slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    value: boolean;
}

const initialState: State = {
    value: false, // Initial value is false
};

const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        toggleValue: (state) => {
            state.value = !state.value;
        },
    },
});

export const { toggleValue } = slice.actions;
export default slice.reducer;
