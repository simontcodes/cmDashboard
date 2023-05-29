import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import ClientInfo from '../components/ClientInfo';
import Appointments from '../components/Appointments';
import axios from 'axios';

interface Client {
  number?: number;
  role: 'admin' | 'client';
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  payments: string;
  appointments: string;
  clientInfo: {
    educationLevel?: string;
    isMarried?: boolean;
    hasBeenInCanada?: boolean;
    hasEnglishTest?: boolean;
    englishTest?: 'ILTS' | 'TOEFL';
    englishTestScore?: {
      readingScore?: number;
      writingScore?: number;
      listeningScore?: number;
      speakingScore?: number;
    };
    jobExperience?: {
      workExp: {
        jobTitle?: string;
        yearsOfExp?: number;
      };
    }[];
  };
}

export default function ClientPage() {
  const [show, setShow] = useState('client-info');
  const [client, setClient] = useState<Client>({} as Client);
  const { userId } = useParams();

  const handleClick = (value: string) => {
    setShow(value);
  };

  useEffect(() => {
    console.log(userId);
    axios
      .get(`http://localhost:8080/users/client/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setClient(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`${client.firstName} ${client.lastName}`} />
      <div className="mb-10 flex justify-center">
        <button
          className={`rounded-l px-4 py-2 ${
            show === 'client-info'
              ? 'bg-primary text-white'
              : ' bg-body text-white'
          }`}
          onClick={() => handleClick('client-info')}
        >
          Client Info
        </button>
        <button
          className={`px-4 py-2 ${
            show === 'appointments'
              ? 'bg-primary text-white'
              : ' bg-body text-white'
          }`}
          onClick={() => handleClick('appointments')}
        >
          Appointments
        </button>
        <button
          className={`rounded-r px-4 py-2 ${
            show === 'payments'
              ? 'bg-primary text-white'
              : ' bg-body text-white'
          }`}
          onClick={() => handleClick('payments')}
        >
          Payments
        </button>
      </div>
      {show === 'client-info' && <ClientInfo client={client} />}
      {show === 'appointments' && <Appointments />}
      {show === 'payments' && <Appointments />}
    </DefaultLayout>
  );
}
