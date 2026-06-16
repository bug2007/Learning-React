import { redirect, useRouteLoaderData } from 'react-router-dom'; // similar to useLoaderData but takes an id as an argument to access a higher level loader from a route that doesnt have a loader
import EventItem from '../components/EventItem';

function EventDetailPage() {
    const data = useRouteLoaderData('event-detail');

    return (
        <>
            <EventItem event = {data.event} />
        </>
    )
}

export default EventDetailPage;

export async function loader({request, params}) {
    const id = params.eventId;

    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {
        throw new Response(JSON.stringify({message: 'Could not fetch details for selected event.'}), {status: 500});
    } else {
        return response;
    }
}

export async function action({params, request}) {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method,
        
    });

    if (!response.ok) {
        throw new Response(JSON.stringify({message: 'Could not delete event.'}), {status: 500});
    } 
    return redirect('/events');
}