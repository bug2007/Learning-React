import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
    const [isFetching, setIsFetching] = useState(false)  // any state thats managed inside the custom hook automatically belongs to the component where the custom hook is being used. so these state updates will reexecute the App component as we're using this custom hook inside the App component. we can also update these states from inside the App component
    const [error, setError] = useState()
    const [fetchedData, setFetchedData] = useState(initialValue);


    useEffect(() => {                   
        async function fetchData() {
          setIsFetching(true)
          try {
            const data = await fetchFn()
            setFetchedData(data)
          } catch (error) {
            setError({message: error.message || 'Failed to fetch data.'})
          }
          setIsFetching(false)
        }
    
        fetchData()
      }, [fetchFn])
    
    return {
        isFetching,
        fetchedData,
        setFetchedData,
        error
    }
}