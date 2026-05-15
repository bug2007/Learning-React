// export default function  TabButton(props) {
//     return <li><button>{props.children}</button></li>  // props.children is whatever u put between the <TabButton> and </TabButton>
// }

// OR
export default function  TabButton({ children, onSelect, isSelected }) {
    return <li><button className={isSelected ? 'active' : ''} onClick={onSelect}>{children}</button></li>  // props.children is whatever u put between the <TabButton> and </TabButton>
}