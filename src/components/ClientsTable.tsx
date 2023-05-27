import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserPicture from '../images/user/user-default.png';
import axios from 'axios';
import DeleteIcon from '../images/icon/icon-delete.svg';
import EditIcon from '../images/icon/icon-edit.svg';

interface Client {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  // Add more properties as needed
}

const TableOne = () => {
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
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Clients
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              First Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Last Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phone Number
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {clients.map((client, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <img src={UserPicture} className=" w-15 " alt="Brand" />
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  <Link to={`/client/${client._id}`}> {client.firstName}</Link>
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{client.lastName}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{client.phoneNumber}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{client.email}</p>
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

export default TableOne;
