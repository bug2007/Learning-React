import { useState } from 'react';

export default function Player({ initialName, symbol }) {
    const [ playerName, setPlayerName ] = useState(initialName);
    const [ isEditing, setIsEditing ] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);  // the input 'editing' is the current state 'isEditing"
    }

    function handleChange(e) {
        setPlayerName(e.target.value);  // target is the input element
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    // let btnCaption = "Edit";

    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
        // btnCaption = "Save";
    }

    return (
        <li>
            <span className="player">
              {editablePlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}