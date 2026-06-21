import { createContext, useContext, useState } from "react";

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

    function openItem(id) {
        setOpenItemId(id)
    }

    function closeItem() {
        setOpenItemId(null)
    }

    const contextValue = {
        openItemId: openItemId,
        openItem,
        closeItem
    }

    return (
        <AccordionContext value={contextValue}>
            <ul className={className}>
                {children}
            </ul>
        </AccordionContext>
    )
}