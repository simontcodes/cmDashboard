import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import moment from 'moment';

interface Appointment {
  _id: string;
  time: string;
  date: Date;
  typeOfAppointment: number;
  client: {
    id: string;
    fullName: string;
  };
  createdAt: Date;
  status: string;
  // Add more properties as needed
}
interface CalendarWeekProps {
  appointments: Appointment[];
}

const CalendarWeek: React.FC<CalendarWeekProps> = ({ appointments }) => {
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [currentDate, setCurrentDate] = useState(moment()); // Store the current date as a state

  const [hoveredAppointment, setHoveredAppointment] = useState<string | null>(
    null
  );

  const startOfWeek = moment(currentDate).startOf('isoWeek').isoWeekday(1); // Set Monday as the start of the week
  const endOfWeek = moment(currentDate).isoWeekday(5); // Set Friday as the end of the week
  const weekRange = `${startOfWeek.format('MMM D')} - ${endOfWeek.format(
    'MMM D'
  )}`;

  // Create an array to store the dates of the week
  const datesOfWeek: number[] = [];
  let currentDateIterator = moment(startOfWeek);

  for (let i = 0; i < 5; i++) {
    // Loop only for 5 days (Monday to Friday)
    datesOfWeek.push(currentDateIterator.date());
    currentDateIterator.add(1, 'day');
  }

  // Rest of your code...

  // Create an array to store the hours of the day
  const hoursOfDay = [];
  for (let i = 9; i <= 18; i++) {
    const hour = `${i < 10 ? '0' + i : i}:00`;
    hoursOfDay.push(hour);
  }

  const handleNextWeek = () => {
    const nextWeek = moment(currentDate).add(1, 'week');
    setCurrentDate(nextWeek);
  };

  const handlePreviousWeek = () => {
    const previousWeek = moment(currentDate).subtract(1, 'week');
    setCurrentDate(previousWeek);
  };

  useEffect(() => {
    setFilteredAppointments(
      appointments.filter((appointment) => {
        const appointmentDate = moment(appointment.date);
        return (
          appointmentDate.isSameOrAfter(startOfWeek, 'day') &&
          appointmentDate.isSameOrBefore(endOfWeek, 'day')
        );
      })
    );
  }, [weekRange]);

  return (
    <>
      <div className="flex  justify-between">
        <Breadcrumb pageName={`Week of ${weekRange}`} />
        <div>
          <button
            className="rounded-full bg-primary p-2 text-white focus:outline-none"
            onClick={handlePreviousWeek}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M12.293 4.293a1 1 0 0 1 1.414 1.414L10.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            className="mx-2 rounded-full bg-primary p-2 text-white focus:outline-none"
            onClick={handleNextWeek}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M7.707 15.707a1 1 0 0 1-1.414-1.414L9.586 10l-3.293-3.293a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="h-fit w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              <th className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"></span>
                <span className="block lg:hidden"></span>
              </th>
              {datesOfWeek.map((date, index) => {
                return (
                  <th
                    key={index}
                    className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5"
                  >
                    <span className="hidden lg:block">
                      {weekDays[index]} {date}
                    </span>
                    <span className="block lg:hidden">
                      {weekDays[index].slice(0, 3)} {date}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {hoursOfDay.map((hour, index) => (
              <tr key={index} className="grid grid-cols-7">
                <td className="ease relative h-15.5 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-15.5">
                  <span className="font-medium text-black dark:text-white">
                    {hour}
                  </span>
                </td>
                {datesOfWeek.map((date, index) => {
                  const currentDateObj = moment(startOfWeek).add(index, 'day');
                  const isWeekend = currentDateObj.isoWeekday() > 5;
                  const appointment = filteredAppointments.find(
                    (apt) =>
                      moment(apt.date).isSame(currentDateObj, 'day') &&
                      apt.time === hour
                  );

                  return (
                    <td
                      key={index}
                      className={`ease relative h-15.5 cursor-pointer border border-stroke p-0 transition duration-500 ${
                        isWeekend
                          ? 'bg-gray dark:bg-meta-4'
                          : 'hover:bg-gray dark:hover:bg-meta-4'
                      } md:h-25 xl:h-15.5`}
                      onMouseEnter={() =>
                        setHoveredAppointment(appointment?._id || null)
                      }
                      onMouseLeave={() => setHoveredAppointment(null)}
                    >
                      {/* ... */}
                      {appointment && (
                        <div
                          className={`event invisible absolute left-2 z-99 mb-1 flex flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 ${
                            hoveredAppointment === appointment._id
                              ? 'visible'
                              : ''
                          } ${
                            hoveredAppointment === appointment._id
                              ? 'opacity-100'
                              : ''
                          } dark:bg-meta-4 md:visible md:opacity-100`}
                        >
                          {/* Original appointment card info */}
                          <div>
                            <span className="event-name text-sm font-semibold text-black dark:text-white">
                              {appointment.typeOfAppointment}
                            </span>
                            <span className="time text-sm font-medium text-black dark:text-white">
                              {appointment.client.fullName}
                            </span>
                          </div>
                          {/* Additional popover info */}
                          {hoveredAppointment === appointment._id && (
                            <div className="popover-card mt-2 bg-white p-4 shadow-lg">
                              <h3 className="text-lg font-semibold">
                                Additional Info
                              </h3>
                              <Link to="#"> See it on Google Calendar</Link>
                              <p className="text-gray-600">this is a popover</p>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CalendarWeek;
