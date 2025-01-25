import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

const Calendar = () => {
    const { t } = useTranslation("common");

    const [events, setEvents] = useState([
        {
            id: "1",
            title: "Doctor's Appointment",
            start: "2025-01-12T12:00:00",
            color: "#ff6b6b",
        },
        {
            id: "2",
            title: "Meeting With Client",
            start: "2025-01-13T14:00:00",
            color: "#339af0",
        },
        {
            id: "3",
            title: "Family Trip",
            start: "2025-01-22",
            end: "2025-01-23",
            color: "#51cf66",
        },
        {
            id: "4",
            title: "Monthly Meeting",
            start: "2025-01-31T10:00:00",
            color: "#845ef7",
        },
    ]);

    const [newEvent, setNewEvent] = useState({
        title: "",
        label: "Holiday",
        start: "",
        end: "",
        allDay: false,
        url: "",
        guests: [],
        location: "",
        description: "",
    });

    const [selectedEvent, setSelectedEvent] = useState(null);

    // Ensure Bootstrap's JS is loaded properly
    useEffect(() => {
        if (typeof window !== "undefined") {
            require("bootstrap/dist/js/bootstrap.bundle.min.js");
        }
    }, []);

    const handleAddEvent = () => {
        setEvents([
            ...events,
            {
                id: (events.length + 1).toString(),
                title: newEvent.title,
                start: newEvent.start,
                end: newEvent.allDay ? null : newEvent.end,
                color: "#f39c12",
            },
        ]);
        alert("Event Added!");
        closeSidebar("addEventSidebar");
    };

    const handleDateClick = (info) => {
        setNewEvent({ ...newEvent, start: info.dateStr, end: info.dateStr, allDay: true });
        openSidebar("addEventSidebar");
    };

    const handleDateRangeSelect = (info) => {
        setNewEvent({ ...newEvent, start: info.startStr, end: info.endStr, allDay: info.allDay });
        openSidebar("addEventSidebar");
    };

    const handleEventClick = (info) => {
        const event = events.find((e) => e.id === info.event.id);
        setSelectedEvent(event);
        openSidebar("editEventSidebar");
    };

    const handleUpdateEvent = () => {
        setEvents(
            events.map((e) =>
                e.id === selectedEvent.id
                    ? { ...selectedEvent }
                    : e
            )
        );
        alert("Event Updated!");
        closeSidebar("editEventSidebar");
    };

    const handleDeleteEvent = () => {
        setEvents(events.filter((e) => e.id !== selectedEvent.id));
        alert("Event Deleted!");
        closeSidebar("editEventSidebar");
    };

    const openSidebar = (id) => {
        const sidebar = document.getElementById(id);
        if (sidebar) {
            sidebar.classList.add("show");
            document.body.classList.add("offcanvas-backdrop");
        }
    };

    const closeSidebar = (id) => {
        const sidebar = document.getElementById(id);
        if (sidebar) {
            sidebar.classList.remove("show");
            document.body.classList.remove("offcanvas-backdrop");
        }
    };

    return (
        <>
            <LayoutMenu />
            <div className="layout-page">
                <Navbar />
                <div className="content-wrapper">
                    <div className="container py-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card shadow-sm p-4">
                                    <button
                                        className="btn btn-primary mb-4"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#addEventSidebar"
                                    >
                                        + Add Event
                                    </button>
                                    <FullCalendar
                                        plugins={[
                                            dayGridPlugin,
                                            timeGridPlugin,
                                            listPlugin,
                                            interactionPlugin,
                                            bootstrap5Plugin,
                                        ]}
                                        initialView="dayGridMonth"
                                        events={events}
                                        editable
                                        selectable
                                        themeSystem="bootstrap5"
                                        headerToolbar={{
                                            left: "prev,next today",
                                            center: "title",
                                            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                                        }}
                                        buttonText={{
                                            today: "Today",
                                            month: "Month",
                                            week: "Week",
                                            day: "Day",
                                            list: "List",
                                        }}
                                        height="auto"
                                        dateClick={handleDateClick}
                                        select={handleDateRangeSelect}
                                        eventClick={handleEventClick}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="offcanvas offcanvas-end"
                    id="addEventSidebar"
                    aria-labelledby="addEventSidebarLabel"
                >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="addEventSidebarLabel">
                            Add Event
                        </h5>
                        <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            onClick={() => closeSidebar("addEventSidebar")}
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        {/* Add Event Form */}
                        <div className="mb-3">
                            <label htmlFor="eventTitle" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="eventTitle"
                                placeholder="Event Title"
                                value={newEvent.title}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, title: e.target.value })
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="startDate" className="form-label">
                                Start Date
                            </label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="startDate"
                                value={newEvent.start}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, start: e.target.value })
                                }
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-primary me-2"
                                onClick={handleAddEvent}
                            >
                                Add
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => closeSidebar("addEventSidebar")}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className="offcanvas offcanvas-end"
                    id="editEventSidebar"
                    aria-labelledby="editEventSidebarLabel"
                >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="editEventSidebarLabel">
                            Edit Event
                        </h5>
                        <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            onClick={() => closeSidebar("editEventSidebar")}
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        {selectedEvent && (
                            <>
                                {/* Edit Event Form */}
                                <div className="mb-3">
                                    <label htmlFor="editEventTitle" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="editEventTitle"
                                        value={selectedEvent.title}
                                        onChange={(e) =>
                                            setSelectedEvent({ ...selectedEvent, title: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editStartDate" className="form-label">
                                        Start Date
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        id="editStartDate"
                                        value={selectedEvent.start}
                                        onChange={(e) =>
                                            setSelectedEvent({ ...selectedEvent, start: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleDeleteEvent}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleUpdateEvent}
                                    >
                                        Update
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calendar;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}
