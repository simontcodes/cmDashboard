
import { Link } from 'react-router-dom';
import moment from 'moment';
import DeleteIcon from '../images/icon/icon-delete.svg';
import EditIcon from '../images/icon/icon-edit.svg';
// import SearchIcon from '../images/icon/icon-search.svg';
import PaypalIcon from '../images/icon/icon-PayPal.svg'
import SquareIcon from '../images/icon/icon-Square.svg'

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
interface PaymentsTableProps {
    payments: Payment[];
  }

const PaymentsTable: React.FC<PaymentsTableProps> = ({ payments })=> {
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');

  

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredPayments = payments.filter((payment) =>
//     payment.firstName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

if(payments.length < 0 ) {
    return <p>loading</p>
}

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Payments
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
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Client
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Amount
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Source
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {payments.map((payment, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  <Link to={`/client/${payment.client.id}`}> {payment.client.fullName}</Link>
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{payment.amount}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
               {payment.paymentSource === "paypal" ? <img src={PaypalIcon} alt="paypal icon" /> : <img src={SquareIcon} alt="square icon" />} 
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{moment(payment.createdAt).format('MMMM Do, YYYY')}</p>
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

export default PaymentsTable;
