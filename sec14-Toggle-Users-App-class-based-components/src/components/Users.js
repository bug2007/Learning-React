import { Component } from 'react';  // none of the react hooks can be used inside class-based component 
import User from './User';

import classes from './Users.module.css';


class Users extends Component {
  // initialize state inside constructor. and it always has to be an obj
  constructor () {
    super();  // call the constructor of the parent class either will show error
    this.state = {
      showUsers: true,
      // moreState: 'Test' 
    };
  }

  toggleUsersHandler() {
    // this.setState({showUsers: false});   // again always has to be an obj. moreState wud remain as moreState: 'Test' as react merges this update with the existing state. doesnt overwrite the state
    // OR
    this.setState((curState) => {
      return { showUsers: !curState.showUsers }
    })
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}


// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
