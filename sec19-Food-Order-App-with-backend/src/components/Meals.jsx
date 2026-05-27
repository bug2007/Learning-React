import useHttp from "../hooks/useHttp.js";

import MealItem from "./MealItem.jsx";
import ErrorPage from "./Error.jsx";

const requestConfig = {}; // creating the obj outside because if we just put an empty obj inside the component, it will be recreated with every component execution and will lead to infinite loop as we use the empty obj as a dependency in useEffect inside useHttp hook

export default function Meals() {
    const {data: loadedMeals, isLoading, error} = useHttp('http://localhost:3000/meals', requestConfig, [])

    if (isLoading) {
        return <p className="center">Fetching meals...</p>
    }
    
    if (error) {
        return <ErrorPage title="Failed to fetch meals" message={error} />
    }

    return (
    <ul id="meals">
        {loadedMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
    </ul>)
}