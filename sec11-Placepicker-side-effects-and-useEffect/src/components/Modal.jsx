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
  }, []);

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
