import React, { useContext } from "react";
import AppointmentContext from "../../context/AppointmentContext";
import "../../styles/StudentAppointments.css"
import Scroll from "./Scroll";

export default function StudentAppointments(){
    const { students, tasks, setNoteSelected, setTaskId } = useContext(AppointmentContext);
  
    return (
        <div>
          <Scroll>

          
          {students.map((student, indexed) => {
            const studentTasks = tasks.filter(task => task.student_id === student.id);
            return (
              <div key={indexed}>
                <div className="studentNames">
                  {student.firstname} {student.lastname}
                </div>
                <div className="appointments">
                  Reminder:
                  {studentTasks.map((task, i) => {
                    return (
                      <div key={i}>
                        <div className="reminder" onClick={()=> {setTaskId(task.id), setNoteSelected(task.note)}}>{task.note}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          </Scroll>
        </div>
      );
}