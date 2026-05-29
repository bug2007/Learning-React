const { act } = require('react');
const redux = require('redux'); // this is what importing in node js looks like

const counterReducer = (state = {counter: 0}, action) => {      // a reducer that will be responsible for changing the store & will be called by redux shud take 2 inputs - existing state & dispatch action - and output a new state. reducer shud really be just a func with no side effects inside. the first time the store is created, the counterReducer will execute by default
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1 
        }
    }

    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1
        }
    }
    return state;
};  

const store = redux.createStore(counterReducer);

// console.log(store.getState())

const counterSubscriber = () => {  // this subscriber func will be triggered whenever the state (in store) changes (but not without an action). then after it was changed, we can get the latest state with getState()
    const latestState = store.getState()
    console.log(latestState)
}

store.subscribe(counterSubscriber); // telling redux to execute counterSubscriber whenever the data in the store changes

store.dispatch({type: 'increment'});  // an action is js obj with a type property. dispatching runs the reducer func
store.dispatch({type: 'decrement'})