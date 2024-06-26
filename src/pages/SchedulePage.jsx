import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSchedule } from "../services/FirestoreService";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Kanban from "../components/Kanban";

const SchedulePage = () => {
  const { documentId } = useParams();
  const [schedule, setSchedule] = useState({});
//   const [events, setEvents] = useState({})
  const [scheduleTitle, setScheduleTitle] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);

  //events will be events from events in schedule document
  //Question: does the schedule state look like this?
  const events = [
    { title: "Meeting", start: new Date() },
    { title: "another", start: new Date() }
];

  useEffect(() => {
    const fetchData = async () => {
      // fetch data from id
      try {
        const fetchedSchedule = await fetchSchedule(documentId);
        setSchedule(fetchedSchedule);
        setScheduleTitle(fetchedSchedule[0].scheduleTitle);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [documentId, fetchSchedule]);

    console.log(schedule[0]?.events);

  /* CHORES:
  1. Scrollable: make the fullcalender scrollable, it doesn't fit all the days in the div
  2. Events: Pass events to fullcalender and make sure it works
  3. Kanban: add kanban component to ui and pass events to layout then figure out how to use it
     for enabling users update their events status "doing" and "completed"
   */

  return (
    <>
      <SideNav />
      <TopNav scheduleTitle={scheduleTitle} />
      <div className="ml-72 mr-10 mt-8">
        <div className="w-full">
          <div className="main flex flex-grow flex-col transition-all duration-150 ease-in md:ml-0">
            <div className="p-3">
              <div className="bg-white mt-5 rounded-[30px]">
                <div className="p-3">
                  <TabGroup>
                    <TabList className="flex gap-4 bg-[#F8F9FC] w-fit px-3 py-3 rounded-full">
                      <Tab className="rounded-full py-1 px-3 text-sm/6 font-inter font-normal text-black focus:outline-none data-[selected]:bg-blue-500 data-[selected]:text-white">
                        Timeline
                      </Tab>
                      <Tab className="rounded-full py-1 px-3 text-sm/6 font-inter font-normal text-black focus:outline-none data-[selected]:bg-blue-500 data-[selected]:text-white">
                        Kanban
                      </Tab>
                      <Tab className="rounded-full py-1 px-3 text-sm/6 font-inter font-normal text-black focus:outline-none data-[selected]:bg-blue-500 data-[selected]:text-white">
                        List
                      </Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <div className="p-10">
                          <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            weekends={false}
                            events={schedule[0]?.events}
                            headerToolbar={{
                              left: "prev,next today",
                              center: "title",
                              right: "dayGridMonth,dayGridWeek,dayGridDay",
                            }}
                            eventContent={renderEventContent}
                          />
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <Kanban />
                      </TabPanel>
                      <TabPanel>To do list with radio buttons</TabPanel>
                    </TabPanels>
                  </TabGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default SchedulePage;
