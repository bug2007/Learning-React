import { useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from './Button.jsx';

export default function Modal({children, buttonCaption, ref}) {
    const dialog = useRef();

    // exposing a function (can also expose properties) to other components that can be called from outside this component function by the other components
    useImperativeHandle(ref, () => {
        return {
            open() {   // it is now a func provided by the modal component to other components. the other components can call open() to actually open up the modal. 
                dialog.current.showModal(); // dialog.current holds the <dialog> html element
            }
        }
    })

    return createPortal(
        <dialog ref={dialog} className='backdrop:bg-stone-900/90 p-4 rounded-md m-auto shadow-md'>
            {children}
            <form method="dialog" className='mt-4 text-right'>
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    )
}