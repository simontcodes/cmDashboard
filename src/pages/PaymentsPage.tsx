import { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import PaymentsTable from "../components/PaymentsTable"
import axios from 'axios';

interface Payment {
  _id: number;
  fullName: string;
  client: {
    id: string;
    fullName: string;
  };
  amount: number;
  paymentSource: string;
  createdAt: Date;
  // Add more properties as needed
}



export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/payments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPayments(response.data);
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
      {payments.length > 0 && <PaymentsTable payments={payments} />}
    </DefaultLayout>
  );
}
