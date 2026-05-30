import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: { cartIsVisible: false, notification: null},
    reducers: {     
        toggle(state) {      // DO NOT write any async code (e.g sending HTTP req) or side effect code inside of any reducer func. 
            state.cartIsVisible = !state.cartIsVisible;
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
})


export const uiActions = uiSlice.actions;

export default uiSlice;