import { useRouteLoaderData } from "react-router-dom"; // similar to useLoaderData but takes an id as an argument to access a higher level loader from a route that doesnt have a loader
import EventForm from "../components/EventForm";

function EditEventPage() {
    const data = useRouteLoaderData('event-detail');
    return (
        <>
            <EventForm method='patch' event={data.event} />
        </>
    )
}

export default EditEventPage;