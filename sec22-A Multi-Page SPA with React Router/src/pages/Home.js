import { Link, useNavigate } from 'react-router-dom'; // using Link wont send a new HTTP req and load all the js code again from scratch. this way, state is also preserved.

function HomePage() {
    const navigate = useNavigate(); // a navigate func to navigate programmatically

    function navigateHandler() {
        navigate('/products');
    }

    return (
        <>
        <h1>My Home Page</h1>
        {/* <p>Go to <a href="/products">the list of products</a>.</p> */}
        <p>Go to <Link to="/products">the list of products</Link>.</p>
        <p>
            <button onClick={navigateHandler}>Navigate</button>
        </p>
        </>
    ) 
}

export default HomePage;