import { Link } from 'react-router-dom'; // wont send a new HTTP req and load all the js code again from scratch. this way, state is also preserved.

function HomePage() {
    return (
        <>
        <h1>My Home Page</h1>
        {/* <p>Go to <a href="/products">the list of products</a>.</p> */}
        <p>Go to <Link to="/products">the list of products</Link>.</p>
        </>
    ) 
}

export default HomePage;