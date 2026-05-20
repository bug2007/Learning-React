import { useEffect } from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  
  useEffect(() => {  // modal opens. if we didnt close the delete confirmation modal even after 3s, the place shud be automatically deleted
    const timer = setTimeout(() => {
      onConfirm()}, 3000);

      return () => { clearTimeout(timer) }   // cleanup func that will be executed right before the effect func runs again or right before this component dismounts. but it does not execute right before the effect func runs for the first time
  }, [])
  

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
    </div>
  );
}
