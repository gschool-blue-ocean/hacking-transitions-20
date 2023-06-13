import React, { useState, useContext } from "react";
import "./Appointments.css";
import AppointmentContext from "../../context/AppointmentContext";

export default function AddReminder({ setShowAddModal }){
    const { students, setUpdate } = useContext(AppointmentContext);
    const[ note, setNote ] = useState("");
    const [ selectedStudent, setSelectedStudent ] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        const appointmentNote = {
            note: `${note}`,
            student_id: `${selectedStudent}`
        }
        fetch(`/api/appointments`, {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(appointmentNote)
        }).then(() =>{
            console.log('Note has been added');
            setShowAddModal(false);
            setUpdate(true);
        })
        
    }
    
    return(
        <span className="Form">
            <form onSubmit={ handleSubmit }>
                <div>
                <label >Add note</label>
                </div>
                <textarea 
                    required
                    value={ note }
                    onChange={(e) => setNote(e.target.value)}
                    rows="5" cols="40"
                    ></textarea>
                <div>
                <select
                    value={ selectedStudent }
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    required
                >
                    <option value="" > Please select a student</option>
                    {students.map((student, x) => {
                        return (
                            <option 
                                key={x} 
                                value={student.id}
                            >
                                {student.firstname} {student.lastname}
                            </option>
                        )
                    })}
                </select>
                </div>
                <div>
                    <span>
                <button className="addSubmit">Submit</button>
                    </span>
                    <span>
                <button className="addCancel" onClick={() => setShowAddModal(false)}>
                    Cancel
                </button>
                    </span>
                </div>
            </form>
        </span>
    )
}