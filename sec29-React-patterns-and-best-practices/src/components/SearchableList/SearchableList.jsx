import { useState, useRef } from "react"

export default function SearchableList({items, itemKeyFn, children}) {
    const lastChange = useRef();
    const [searchTerm, setSearchTerm] = useState('');

    const searchResults = items.filter((item) => 
        JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
    )

    function handleChange(event) {
        if (lastChange.current) {
            clearTimeout(lastChange.current)
        }

        lastChange.current = setTimeout(() => {  // debouncing - so that state is updated only when the user stops typing for a while in the input field and then the search results are filtered. otherwise, if we update state and filter search results on every keystroke, that's inefficient
            lastChange.current = null
            setSearchTerm(event.target.value)
        }, 500)
    }

    return (
        <div className="searchable-list">
            <input type='search' placeholder="Search" onChange={handleChange} />
            <ul>
                {searchResults.map((item) => (  // itemKeyFn dynamically generates a specific key for specific items. using index as key aint a good idea
                    <li key={itemKeyFn(item)}>{children(item)}</li>  // calling the children func
                ))}
            </ul>
        </div>
    )
}