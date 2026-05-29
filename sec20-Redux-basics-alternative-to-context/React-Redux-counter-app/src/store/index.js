import { createStore } from 'redux';

const counterReducer = (state = {counter: 0}, action) => {  // will be called when action is dispatched or when the store is created the 1st time
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1
        }
    }

    if (action.type === 'increase') {
        return {
            counter: state.counter + action.amount
        }
    }

    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1
        }
    }

    return state;
}

const store = createStore(counterReducer);

export default store;