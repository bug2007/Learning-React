import { createContext, useContext, useState } from "react";
import AccordionItem from "./AccordionItem";

const AccordionContext = createContext();

export function useAccordionContext() {
    const ctx = useContext(AccordionContext)

    if (!ctx) {  // in case some other component that isnt wrapped by AccordionContext tries to call useContext(AccordionContext)
        throw new Error('Accordion-related components must be wrapped by <Accordion>.')
    }
    return ctx;
}

export default function Accordion({children, className}) {
    const [openItemId, setOpenItemId] = useState();

    function toggleItem(id) {
        setOpenItemId(prevId => prevId === id ? null : id)
    }

    const contextValue = {
        openItemId,
        toggleItem
    } 

    return (
        <AccordionContext value={contextValue}>
            <ul className={className}>
                {children}
            </ul>
        </AccordionContext>
    )
}

// funcs are objects, so we can add properties to funcs. property names are upto us. this is to form compound components so that they know about each other and work together like the <select> and <option> elements. now if we try to use Accordion.Item outside of Accordion (without wrapping Accordion around it), it wud throw an error
Accordion.Item = AccordionItem