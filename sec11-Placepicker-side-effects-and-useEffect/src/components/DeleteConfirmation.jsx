import { useEffect } from "react";
import ProgressBar from "./ProgressBar.jsx";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {

  useEffect(() => {  // modal opens. if we didnt close the delete confirmation modal even after 3s, the place shud be automatically deleted
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);

      return () => { clearTimeout(timer) };   // cleanup func that will be executed right before the effect func runs again or right before this component dismounts. but it does not execute right before the effect func runs for the first time
  }, [onConfirm]);  // adding funcs sometimes cud result infinite loop tho. because everytime the App component re-renders, the func in onConfirm is created and it is considered as a new, different func everytime. and that means the dependency (onConfirm here) changes, and when dependency changes, useEffect is executed again. A fix to infinite loop is useCallback hook which will always work. it will ensure the onConfirm func (handleRemovePlace()) will not be recreated all the time
  

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
