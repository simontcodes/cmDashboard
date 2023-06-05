import { useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import CalendarMonth from '../components/CalendarMonth';
import CalendarWeek from '../components/CalendarWeek';

export default function CalendarPage() {
  const [view, setView] = useState('month');

  const handleToggle = () => {
    setView((prevView) => (prevView === 'month' ? 'week' : 'month'));
  };

  return (
    <DefaultLayout>
      <div>
        {view === 'month' ? <CalendarMonth /> : <CalendarWeek />}
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
