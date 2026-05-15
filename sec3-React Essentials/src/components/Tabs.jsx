export default function Tabs({ children, buttons, buttonsContainer }) {
    const ButtonsContainer = buttonsContainer;  // ButtonsContainer is a custom component that is not a function that returns jsx code as we have defined custom components to be initially.
    return <>
        <ButtonsContainer>
            {buttons}
        </ButtonsContainer>
        {children}
    </>
}