import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className=" bg-gray-100 flex min-h-screen flex-col items-center justify-center">
      <div className=" mx-auto  max-w-md">
        <h1 className=" text-gray-800 text-4xl font-bold">404</h1>
        <p className="text-gray-600 mb-10">
          Oops! The page you're looking for does not exist.
        </p>
        <a
          href="/"
          className=" mt-20 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-primary"
        >
          Go back to home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
