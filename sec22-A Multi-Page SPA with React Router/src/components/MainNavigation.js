// import { Link } from 'react-router-dom';  // wont send a new HTTP req and load all the js code again from scratch. this way, state is also preserved.

import { NavLink } from 'react-router-dom';  // just like Link but with it, we can use the isActive to check if the link is currently active and led to its route

import classes from './MainNavigation.module.css';

function MainNavigation() {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li><NavLink to='/' className={({isActive}) => isActive ? classes.active : undefined} end
                    // style={({isActive}) => ({textAlign: isActive ? 'center' : 'left'})}
                    >Home</NavLink></li>
                    <li><NavLink to='/products' className={({isActive}) => isActive ? classes.active : undefined}>Products</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;