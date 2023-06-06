import { useState, useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import CalendarMonth from '../components/CalendarMonth';
import CalendarWeek from '../components/CalendarWeek';
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
  createdAt: Date;
  status: string;
  // Add more properties as needed
}

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [view, setView] = useState('month');

  const handleToggle = () => {
    setView((prevView) => (prevView === 'month' ? 'week' : 'month'));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/appointments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error retrieving users:', error);
        // Handle the error
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <div>
        {view === 'month' ? (
          <CalendarMonth />
        ) : (
          <CalendarWeek appointments={appointments} />
        )}
        <div className="flex items-center">
          <span className="mr-2"> Month</span>
          <label className="relative inline-flex items-center">
            <input type="checkbox" className="hidden" onChange={handleToggle} />
            <span className="absolute left-0 h-4 w-10 rounded-full bg-graydark"></span>
            <span
              className={`absolute left-0 ${
                view === 'week' ? 'translate-x-6' : 'translate-x-0'
              } h-4 w-4 rounded-full bg-primary transition-transform duration-300 ease-in-out`}
            ></span>
            <span className="ml-12"> Week</span>
          </label>
        </div>
      </div>
    </DefaultLayout>
  );
}
