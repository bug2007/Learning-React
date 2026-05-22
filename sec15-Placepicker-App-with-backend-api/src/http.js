export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places')  // this cud fail too so an error wud be thrown
    const resData = await response.json()

    // handling HTTP errors
    if (!response.ok) {  // or backend cud be sending an error response back if something goes wrong there
        throw new Error('Failed to fetch places')
    }
    
    return resData.places;
}