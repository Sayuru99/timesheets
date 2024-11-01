import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format } from "date-fns";
import "../index.css";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ tasks, onDateSelect, onDateDoubleClick }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const formattedEvents = tasks.map((task) => ({
    title: task.taskDescription,
    start: new Date(task.date),
    end: new Date(task.date),
    id: task.id,
  }));

  const handleSelectSlot = (slotInfo) => {
    const selected = format(slotInfo.start, "yyyy-MM-dd");
    setSelectedSlot(selected);
    onDateSelect(selected);
  };

  return (
    <div style={{ height: "500px", margin: "20px" }}>
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onDoubleClickEvent={(event) => onDateDoubleClick(event.start)}
        views={["month", "week", "day", "agenda"]}
        defaultView="month"
        dayPropGetter={(date) => {
          const dateString = format(date, "yyyy-MM-dd");
          const isSelected = selectedSlot === dateString;
          return {
            className: isSelected ? "selected-date" : "",
          };
        }}
      />
    </div>
  );
};

export default MyCalendar;
