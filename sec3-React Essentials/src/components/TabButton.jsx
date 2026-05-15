// export default function  TabButton(props) {
//     return <li><button>{props.children}</button></li>  // props.children is whatever u put between the <TabButton> and </TabButton>
// }

// OR
export default function  TabButton({ children, onSelect }) {
    return <li><button onClick={onSelect}>{children}</button></li>  // props.children is whatever u put between the <TabButton> and </TabButton>
}