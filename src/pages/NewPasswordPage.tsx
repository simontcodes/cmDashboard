import React from 'react';
import SetNewPassword from '../components/SetNewPassword';
import Breadcrumb from '../components/Breadcrumb';

const NewPasswordPage: React.FC = () => {
  return (
    <div className=" h-screen w-full bg-body">
      <Breadcrumb pageName="" />

      <SetNewPassword />
    </div>
  );
};

export default NewPasswordPage;
