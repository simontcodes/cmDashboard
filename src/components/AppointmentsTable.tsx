import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserPicture from '../images/user/user-default.png';
import axios from 'axios';
import moment from 'moment';
import DeleteIcon from '../images/icon/icon-delete.svg';
import EditIcon from '../images/icon/icon-edit.svg';
// import SearchIcon from '../images/icon/icon-search.svg';

interface Appointment {
  _id: string;
  time: string;
  date: Date;
  typeOfAppointment: number;
  client: string;
  createdAt: Date,
  status: string,
  // Add more properties as needed
}

const AppointmentsTable = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  // const [appointments, setAppointments] = useState<Appointment[]>([]);
  // let appointments: Appointment[] = [];
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/appointments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFilteredAppointments(response.data) ;
        console.log(response.data);
      } catch (error) {
        console.error('Error retrieving users:', error);
        // Handle the error
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = filteredAppointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= new Date(startDate) && appointmentDate <= new Date(endDate);
    });
    setFilteredAppointments(filtered);
    console.log(filteredAppointments)
  };
 
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Appointments
      </h4>

      {/* <div className="relative mt-4 mb-6 w-60">
        <input
          type="text"
          placeholder="Search by first name"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full rounded-sm border border-stroke px-3 py-2 pl-10"
        />
        <img
          className="text-gray-400 absolute left-3 top-2.5 h-5 w-5"
          src={SearchIcon}
          alt="search icon"
        />
      </div> */}
      <div className="flex items-center mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 px-4 py-2 mr-2 rounded-md focus:outline-none"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 px-4 py-2 mr-2 rounded-md focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
        >
          Search
        </button>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
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

        {filteredAppointments.map((appointment) => {
          return (
            <div
              key={appointment._id}
              className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <img src={UserPicture} className=" w-15 " alt="Brand" />
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  <Link to={`/appointment/${appointment._id}`}> {moment(appointment.date).format('MMMM Do, YYYY')} {appointment.time}</Link>
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{appointment.client}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
              {appointment.status === 'upcoming' && (
    <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
      {appointment.status}
    </p>
  )}
  {appointment.status === 'completed' && (
    <p className="inline-flex rounded-full bg-primary bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
      {appointment.status}
    </p>
  )}
  {appointment.status === 'cancelled' && (
    <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
      {appointment.status}
    </p>
  )}
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {(() => {
    switch (appointment.typeOfAppointment) {
      case 1:
        return <p className="text-black dark:text-white">30 min consultation</p>;
      case 2:
        return <p className="text-black dark:text-white">60 min consultation</p>;
      case 3:
        return <p className="text-black dark:text-white">Visa/PR</p>;
      default:
        return null;
    }
  })()}
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <img className="ml-5" src={EditIcon} alt="delete icon" />
                <img className="ml-5" src={DeleteIcon} alt="delete icon" />

                {/* <p className="text-meta-5">Editar, eliminar</p> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentsTable;
