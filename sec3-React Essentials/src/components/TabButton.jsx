// export default function  TabButton(props) {
//     return <li><button>{props.children}</button></li>  // props.children is whatever u put between the <TabButton> and </TabButton>
// }

// OR
export default function  TabButton({ children, isSelected, ...props }) {
    return <li><button className={isSelected ? 'active' : ''} {...props}>{children}</button></li>  // props.children is whatever u put between the <TabButton> and </TabButton>
}