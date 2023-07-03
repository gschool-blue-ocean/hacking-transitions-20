import React, { useState, useEffect, useContext, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import AddEventForm from "./AddEventForm.jsx";
import Modal from "react-modal";
import "./Calendar.css";
import AppointmentContext from "../../context/AppointmentContext.jsx";
import CohortContext from "../../context/CohortContext.jsx";
import { Tooltip } from "react-tooltip";

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const { events } = useContext(AppointmentContext);
  const { 
    students,
    studentsLoaded,
    cohortClickedId,
    update,
    setUpdate,
    formatDateWithTime
  } = useContext(CohortContext);

  const handleModalClose = () => {
    setIsAddEventOpen(false);
  };

  const openAddEventModal = () => {
    setIsAddEventOpen(true);
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    console.log("Selected event: " + selectedEvent);
  };

  useEffect(() => {
    setUpdate(false);
    let formattedEvents = [];
    if (events.length > 0 && studentsLoaded) { //checks before mapping events
      formattedEvents = events.map((event) => {
        const eventOwner = students.find((student) => student.id === event.student_id);
        const eventOwnerName = eventOwner ? `${eventOwner.firstname} ${eventOwner.lastname}` : "null";
        const formattedStartDate = formatDateWithTime(event.startdate);
        const tooltipContent = `<span class="tooltip-student-name">${eventOwnerName}</span><br />Event: ${event.title}<br />${formattedStartDate}`;
        return {
          start: new Date(event.startdate),
          end: new Date(event.enddate),
          title: event.title + ": " + eventOwnerName,
          allDay: event.allday,
          extendedProps: {
            'data-tip': tooltipContent,
            'tooltip-id': event.id,
          },
        };
      });
    }
    setCalendarEvents(formattedEvents);
  }, [update, events, studentsLoaded, cohortClickedId]); //re-renders when either of these change; fix bug displaying 'null' events

  const headerToolbar = {
    left: `prev,next today addEventButton`,
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
  };

  const modalStyle = {
    overlay: {
      zIndex: 100,
    },
    content: {
      position: "absolute",
      top: "50%",
      bottom: "50%",
      left: "50%",
      right: "50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      height: "fit-content",
      minWidth: "275px",
      justifyContent: "center",
      border: '1px solid #000',
      background: '#E0EAF8',
      color: 'white',
      overflow: 'auto',
      borderRadius: '10px',
      outline: 'black',
      padding: '15px',
      boxShadow: "0px 10px 20px -10px rgba(0, 0, 0, 0.75)",
      zIndex: 101,
    },
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        initialDate="2023-05-01"
        events={calendarEvents}
        eventContent={({ event }) => {
          const tooltipId = event.extendedProps['tooltip-id'];
          return (
            <div 
            data-tooltip-id={tooltipId}
            data-tooltip-html={event.extendedProps['data-tip']}
            data-tooltip-place="top"
            >
              {event.title}
            </div>
          );
        }}
        eventClick={handleEventClick}
        headerToolbar={headerToolbar}
        customButtons={{
          addEventButton: {
            text: "Add Event",
            click: openAddEventModal,
          },
        }}
        views={{
          month: {
            type: "dayGridMonth",
            titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
            dayMaxEvents: true,
            dayMaxEventRows: 0,
            showNonCurrentDates: true
          }
        }}
      />
      <Modal
        isOpen={isAddEventOpen}
        onRequestClose={handleModalClose}
        contentLabel="Add Event"
        style={modalStyle}
      >
        <AddEventForm handleModalClose={handleModalClose} />
      </Modal>
      {calendarEvents.map((event) => (
        <Tooltip
        className="calendar-tooltip"
        key={event.extendedProps['tooltip-id']}
        id={event.extendedProps['tooltip-id']}
        />
    ))}
    </div>
  );
};

export default Calendar;
