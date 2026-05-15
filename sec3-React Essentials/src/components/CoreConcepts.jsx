import CoreConcept from "./CoreConcept.jsx";
import { CORE_CONCEPTS } from "../data.js";

export default function CoreConcepts() {
    return (
        <section id="core-concepts">
            <h2>Core Concepts</h2>
            <ul>
            {/* prop names are up to you */}
            {/* <CoreConcept 
                title={CORE_CONCEPTS[0].title} 
                description={CORE_CONCEPTS[0].description}
                image={CORE_CONCEPTS[0].image} /> */}
            {/* OR */}
            {/* <CoreConcept { ...CORE_CONCEPTS[0]} />
            <CoreConcept { ...CORE_CONCEPTS[1]} />
            <CoreConcept { ...CORE_CONCEPTS[2]} />
            <CoreConcept { ...CORE_CONCEPTS[3]} /> */}
            {/* OR */}
            {CORE_CONCEPTS.map((conceptItem) => <CoreConcept key={conceptItem.title} {...conceptItem} />)}  // key is a special prop that React uses to keep track of list items. it should be unique among siblings. here we can use title as key because its unique among the concepts.
            </ul>
        </section>
    );
}