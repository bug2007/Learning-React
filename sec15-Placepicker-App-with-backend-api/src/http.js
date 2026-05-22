export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places')  // a get req by default. this cud fail too so an error wud be thrown
    const resData = await response.json()

    // handling HTTP errors
    if (!response.ok) {  // or backend cud be sending an error response back if something goes wrong there
        throw new Error('Failed to fetch places')
    }
    
    return resData.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places: places}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const resData = await response.json()

    if (!response.ok) {
        throw new Error('Failed to update user data.')
    }

    return resData.message;
}
