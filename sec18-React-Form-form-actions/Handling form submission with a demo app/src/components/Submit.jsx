import { useFormStatus } from 'react-dom';  // cant be used in the component that contains the form and the form action. must be used in some nested component used inside of the form

export default function Submit() {
    const { pending } = useFormStatus();  // contains info about the current status of the form in which this component is being used
    return (
        <p className="actions">
          <button type="submit" disabled={pending}>{pending ? 'Submitting...' : 'Submit'}</button>
        </p>
    )
}