import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = {counter: 0, showCounter: true};

const counterSlice = createSlice({  // createSlice automatically creates unique action identifiers for the different reducers
    name: 'counter',  // always needs a name
    initialState: initialCounterState, 
    reducers: {
        increment(state) { // receives latest state
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {  // can receive action if we want it to
            state.counter = state.counter + action.payload;
        }, 
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
})

export default counterSlice.reducer;
export const counterActions = counterSlice.actions;  // e.g counterSlice.actions.toggleCounter() will return an action obj of this shape- {type: 'some auto-generated unique identifier}
