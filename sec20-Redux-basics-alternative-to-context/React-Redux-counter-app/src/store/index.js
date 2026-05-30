import { createStore } from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

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

// const counterReducer = (state = initialState, action) => {  // will be called when action is dispatched or when the store is created the 1st time
//     if (action.type === 'increment') {
//         return {
//             counter: state.counter + 1,
//             showCounter: state.showCounter  // gotta return everything even if showCounter value doesnt change
//         }
//     }

//     if (action.type === 'increase') {
//         return {
//             counter: state.counter + action.amount,
//             showCounter: state.showCounter
//         }
//     }

//     if (action.type === 'decrement') {
//         return {
//             counter: state.counter - 1,
//             showCounter: state.showCounter
//         }
//     }

//     if (action.type === 'toggle') {
//         return {
//             counter: state.counter,
//             showCounter: !state.showCounter
//         }
//     }

//     return state;
// }

// const store = createStore(counterReducer);

const initialAuthState = {
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
})

const store = configureStore({
    reducer: {counter: counterSlice.reducer, auth: authSlice.reducer}
});

export const counterActions = counterSlice.actions;  // e.g counterSlice.actions.toggleCounter() will return an action obj of this shape- {type: 'some auto-generated unique identifier}
export const authActions = authSlice.actions;

export default store;