import { useSelector } from 'react-redux'; // allows us to access a part of state. when u use useSelector(), react redux will automatically set up a subscription to the redux store for this component. so component will be updated & receive the latest state (counter, here) automatically when the data changes in redux store  
import classes from './Counter.module.css';

const Counter = () => {
  const counter = useSelector(state => state.counter);
  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
