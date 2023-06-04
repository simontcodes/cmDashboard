import { useEffect, useState } from 'react';
import AppointmentsTable from '../components/AppointmentsTable';
import DefaultLayout from '../layout/DefaultLayout';
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

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

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
        console.log(response.data);
      } catch (error) {
        console.error('Error retrieving users:', error);
        // Handle the error
      }
    };

    fetchData();
  }, []);
  return (
    <DefaultLayout>
      {appointments.length > 0 && (
        <AppointmentsTable appointments={appointments} />
      )}
    </DefaultLayout>
  );
}
