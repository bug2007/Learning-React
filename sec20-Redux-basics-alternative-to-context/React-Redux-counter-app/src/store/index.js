import { createStore } from 'redux';

const initialState = {counter: 0, showCounter: true};

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