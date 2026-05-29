import { createStore } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {counter: 0, showCounter: true};

createSlice({
    name: 'counter',  // always needs a name
    initialState, // same as initialState: initialState
    reducers: {
        increment(state) { // receives latest state
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {  // can receive action if we want it to
            state.counter = state.counter + action.amount;
        }, 
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
})

const counterReducer = (state = initialState, action) => {  // will be called when action is dispatched or when the store is created the 1st time
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1,
            showCounter: state.showCounter  // gotta return everything even if showCounter value doesnt change
        }
    }

    if (action.type === 'increase') {
        return {
            counter: state.counter + action.amount,
            showCounter: state.showCounter
        }
    }

    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1,
            showCounter: state.showCounter
        }
    }

    if (action.type === 'toggle') {
        return {
            counter: state.counter,
            showCounter: !state.showCounter
        }
    }

    return state;
}

const store = createStore(counterReducer);

export default store;