import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import Modal from './Modal';
import SuccessAlert from './Alerts';
import moment from 'moment';
import axios from 'axios';

interface Appointment {
  _id: string;
  time: string;
  date: Date;
  typeOfAppointment: number;
  client: {
    id: string;
    fullName: string;
  };
  googleCalendar: {
    link: string;
    eventId: string;
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
  const [showModal, setShowModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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

  const closeCancelModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleCancelAppointment = () => {
    setShowModal(true);
  };
  const confirmCancelAppointment = (appointmentId: string) => {
    // Find the appointment with the given ID
    const canceledAppointment = appointments.find(
      (appointment) => appointment._id === appointmentId
    );

    // Check if the appointment was found and its status is "upcoming"
    if (canceledAppointment && canceledAppointment.status === 'UPCOMING') {
      // Update the appointment's status to "cancelled"
      canceledAppointment.status = 'CANCELLED';

      // sending a request to the server to update the appointment status
      const fetchData = async () => {
        try {
          const token = sessionStorage.getItem('token');
          const response = await axios.patch(
            `http://localhost:8080/appointments/cancel/${appointmentId}`,
            {}, // Empty request body
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          // Show success alert
          setShowSuccessAlert(true);

          // After 2 seconds, hide success alert
          setTimeout(() => {
            setShowSuccessAlert(false);
          }, 2000);
        } catch (error) {
          console.error('Error canceling appointment:', error);
          // Handle the error
        }
      };

      fetchData();

      // Force a re-render by updating the state
      setFilteredAppointments([...filteredAppointments]);
    }
    setShowModal(false); // Close the modal
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
  }, [appointments, weekRange]);

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
                  const appointment = filteredAppointments.find(
                    (apt) =>
                      moment(apt.date).isSame(currentDateObj, 'day') &&
                      apt.time === hour
                  );

                  const getStatusColor = () => {
                    if (appointment?.status === 'UPCOMING') {
                      return 'warning'; // Set the border color for pending status
                    } else if (appointment?.status === 'COMPLETED') {
                      return 'primary'; // Set the border color for confirmed status
                    } else if (appointment?.status === 'CANCELLED') {
                      return 'danger'; // Set the border color for cancelled status
                    } else {
                      return 'primary'; // Default border color
                    }
                  };

                  const statusColor = getStatusColor();
                  const appointmentCardClassName = `event invisible absolute left-2 z-99 mb-1 flex flex-col rounded-sm border-l-[3px] border-${getStatusColor()} bg-gray px-3 py-1 text-left opacity-0 ${
                    hoveredAppointment === appointment?._id ? 'visible' : ''
                  } ${
                    hoveredAppointment === appointment?._id ? 'opacity-100' : ''
                  } dark:bg-meta-4 md:visible md:opacity-100`;

                  return (
                    <td
                      key={index}
                      className={`ease relative h-15.5 cursor-pointer border border-stroke p-0 transition duration-500 hover:bg-gray dark:hover:bg-meta-4 `}
                      onMouseEnter={() =>
                        setHoveredAppointment(appointment?._id || null)
                      }
                      onMouseLeave={() => setHoveredAppointment(null)}
                    >
                      {/* ... */}
                      {appointment && (
                        <div className={appointmentCardClassName}>
                          {/* Original appointment card info */}
                          <div>
                            <span className="event-name text-sm font-semibold text-black dark:text-white">
                              {appointment.typeOfAppointment}
                            </span>{' '}
                            <span className="time text-sm font-medium text-black dark:text-white">
                              {appointment.client.fullName}
                            </span>
                          </div>
                          {/* Additional popover info */}
                          {hoveredAppointment === appointment._id && (
                            <div className="popover-card mt-2 bg-whiter p-4 shadow-lg">
                              {appointment.status === 'UPCOMING' && (
                                <Link
                                  className="block text-sm font-medium text-black hover:underline"
                                  to={`${appointment.googleCalendar.link}`}
                                  target="_blank"
                                >
                                  Google Calendar
                                </Link>
                              )}
                              <p
                                className={`text-${statusColor} mt-2 inline-flex rounded-full bg-primary bg-opacity-10 py-1 px-3 text-sm font-medium`}
                              >
                                {appointment.status}
                              </p>
                              {appointment.status === 'UPCOMING' && (
                                <>
                                  <button
                                    className="mt-4 rounded-sm bg-danger px-2 py-1 text-white transition-transform hover:scale-105"
                                    onClick={handleCancelAppointment}
                                  >
                                    Cancel
                                  </button>
                                  <Modal
                                    isOpen={showModal}
                                    onClose={closeCancelModal}
                                    onConfirm={() =>
                                      confirmCancelAppointment(appointment._id)
                                    }
                                    title="Cancel Appointment"
                                    message={`Are you sure you want to cancel the appointment with ${
                                      appointment.client.fullName
                                    } on ${moment(appointment.date).format(
                                      'MMM D, YYYY'
                                    )} at ${
                                      appointment.time
                                    }?\nThis will also delete it from Google Calendar`}
                                    confirmText="Yes, Cancel"
                                    cancelText="No, Keep"
                                  />
                                </>
                              )}
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
          {/* Success Alert */}
          {showSuccessAlert && (
            <SuccessAlert
              type="success"
              message="Appointment has been cancelled successfully"
            />
          )}
        </table>
      </div>
    </>
  );
};

export default CalendarWeek;
