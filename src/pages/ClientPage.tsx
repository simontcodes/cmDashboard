import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import ClientInfo from '../components/ClientInfo';
import Appointments from '../components/Appointments';

export default function ClientPage() {
  const [show, setShow] = useState('client-info');

  const handleClick = (value: string) => {
    setShow(value);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Simon Tang" />
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
      {show === 'client-info' && <ClientInfo />}
      {show === 'appointments' && <Appointments />}
      {show === 'payments' && <Appointments />}
    </DefaultLayout>
  );
}
