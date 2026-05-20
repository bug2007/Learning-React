import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children }) {  // open is either true or false
  const dialog = useRef();

  // the func inside useEffect will run (only once) after the Modal component has first executed. it's important as only after the execution of the component, the ref will be connected to the dialog element. 
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]); // effect dependencies are any value that causes the component to execute again. this effect func shud run whenever the component func executed if one of the dependencies changed

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
