import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: { cartIsVisible: false},
    reducers: {     
        toggle(state) {      // DO NOT write any async code (e.g sending HTTP req) or side effect code inside of any reducer func. 
            state.cartIsVisible = !state.cartIsVisible;
        }
    }
})


export const uiActions = uiSlice.actions;

export default uiSlice;