import React, { useContext } from "react";
import "./Appointments.css"
import AppointmentContext from "../../context/AppointmentContext";

export default function ChangeReminder({ setEditNote }){
    const { noteSelected, taskId , setUpdate, setNoteSelected } = useContext(AppointmentContext);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/api/appointments/${taskId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ note: noteSelected }) // Wrap noteSelected in an object with the key "note"
        }).then(response => {
                if (response.ok) {
                    console.log('Note has been updated');
                    setEditNote(false);
                    setUpdate(true);
                } else {
                    throw new Error('Failed to update note');
                }
            }).catch(error => {
                console.error(error);
            });
    };

    return(
        <span className="Form">
            <form onSubmit={ handleSubmit }>
                <div>
                <label> Click note you would like to edit </label>
                </div>
                <textarea 
                    required
                    value={ noteSelected }
                    onChange={(e) => setNoteSelected(e.target.value)}
                    rows="5" cols="40"
                    >{noteSelected}</textarea>      
                    <div>
                    <span>
                <button className="addSubmit" >Submit</button>
                    </span>
                    <span>
                <button className="addCancel" onClick={() => {setEditNote(false), setNoteSelected("")}}>
                    Cancel
                </button>
                    </span>
                    </div>       
            </form>
        </span>
    )
}