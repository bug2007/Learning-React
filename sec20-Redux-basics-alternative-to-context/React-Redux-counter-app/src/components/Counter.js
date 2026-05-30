import { useSelector, useDispatch } from 'react-redux'; // useSelector allows us to access a part of state. when u use useSelector(), react redux will automatically set up a subscription to the redux store for this component. so component will be updated & receive the latest state (counter, here) automatically when the data changes in redux store  
import classes from './Counter.module.css';
import { counterActions } from '../store/counter';

const Counter = () => {
  const dispatch = useDispatch(); // dispatch here is a func which will dispatch an action against our redux store
  // const counter = useSelector(state => state.counter);
  const counter = useSelector(state => state.counter.counter);
  // const show = useSelector(state => state.showCounter)
  const show = useSelector(state => state.counter.showCounter)


  const incrementHandler = () => {
    // dispatch({type: 'increment'})
    dispatch(counterActions.increment())
  }

  const decrementHandler = () => {
    // dispatch({type: 'decrement'})
    dispatch(counterActions.decrement())
  }

  const increaseHandler = () => {
    // dispatch({type: 'increase', amount: 10})
    dispatch(counterActions.increase(10)) // {type: SOME_UNIQUE_IDENTIFIER, payload: 10}
  }

  const toggleCounterHandler = () => {
    // dispatch({type: 'toggle'})
    dispatch(counterActions.toggleCounter())
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
