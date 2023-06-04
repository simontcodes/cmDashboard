import { useEffect, useState } from 'react';
import ClientsTable from '../components/ClientsTable';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';

interface Client {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  // Add more properties as needed
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(response.data);
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
      {clients.length > 0 && <ClientsTable clients={clients} />}
    </DefaultLayout>
  );
}
