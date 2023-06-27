import { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DeleteIcon from '../images/icon/icon-delete.svg';
import EditIcon from '../images/icon/icon-edit.svg';

interface Appointment {
  _id: string;
  time: string;
  date: Date;
  typeOfAppointment: string;
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

interface AppointmentsTableProps {
  appointments: Appointment[];
}

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  appointments,
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredAppointments, setFilteredAppointments] =
    useState<Appointment[]>(appointments);

  const handleSearch = () => {
    const filtered = filteredAppointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate >= new Date(startDate) &&
        appointmentDate <= new Date(endDate)
      );
    });
    setFilteredAppointments(filtered);
    console.log(filteredAppointments);
  };
  console.log(filteredAppointments);
  if (filteredAppointments.length < 0) {
    return <p>Loading</p>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Appointments
      </h4>

      <div className="mb-4 flex items-center">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border-gray-300 mr-2 rounded-md border px-4 py-2 focus:outline-none"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border-gray-300 mr-2 rounded-md border px-4 py-2 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 text-white focus:outline-none"
        >
          Search
        </button>
      </div>
      <div className="flex flex-col">
        <div className="bg-gray-2 grid grid-cols-3 rounded-sm dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date and time
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Client
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Service
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {filteredAppointments.map((appointment, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  <Link
                    to={`${appointment.googleCalendar.link}`}
                    target="blank"
                    title="See it on Google Calendar"
                  >
                    {' '}
                    {moment(appointment.date).format('MMMM Do, YYYY')} at{' '}
                    {appointment.time}
                  </Link>
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <Link to={`/client/${appointment.client.id}`}>
                  {' '}
                  <p className="text-black dark:text-white">
                    {appointment.client.fullName}
                  </p>
                </Link>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                {appointment.status === 'UPCOMING' && (
                  <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                    {appointment.status}
                  </p>
                )}
                {appointment.status === 'COMPLETED' && (
                  <p className="inline-flex rounded-full bg-primary bg-opacity-10 py-1 px-3 text-sm font-medium text-primary">
                    {appointment.status}
                  </p>
                )}
                {appointment.status === 'CANCELLED' && (
                  <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
                    {appointment.status}
                  </p>
                )}
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                {appointment.typeOfAppointment}
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <img className="ml-5" src={EditIcon} alt="delete icon" />
                <img className="ml-5" src={DeleteIcon} alt="delete icon" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentsTable;
