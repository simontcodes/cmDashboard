import React, { useState } from 'react';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SetNewPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFieldsFilled, setPasswordFieldsFilled] = useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setNewPassword(password);
    setPasswordMatch(password === confirmPassword);

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]).{8,}$/;
    setPasswordValid(passwordRegex.test(password));

    setPasswordFieldsFilled(password !== '' && confirmPassword !== '');
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const password = event.target.value;
    setConfirmPassword(password);
    setPasswordMatch(password === newPassword);

    setPasswordFieldsFilled(newPassword !== '' && password !== '');
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    // Reset the form after submission
    setNewPassword('');
    setConfirmPassword('');
    setPasswordMatch(true);
    setPasswordValid(true);
    setPasswordFieldsFilled(false);

    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    };

    try {
      // Make an API call to update the password
      const response = await axios.post(
        'http://localhost:8080/login/change-password',
        { newPassword },
        { headers }
      );

      // Handle the response from the backend
      console.log('Password update successful:', response.data);
      navigate('/');

      // Perform any necessary actions or show a success message to the user
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error('Password update failed:', error);
      // Display an error message to the user or perform error handling
    }
  };

  const buttonClass =
    'rounded bg-primary p-2 hover:bg-secondary hover:text-white hover:shadow-md hover:shadow-graydark dark:bg-primary dark:hover:bg-secondary';

  const inputClass = `w-full rounded border px-2 py-1 focus:outline-none focus:shadow-outline ${
    passwordMatch && passwordValid && passwordFieldsFilled
      ? 'border-success'
      : ''
  } ${!passwordMatch ? 'border-danger' : ''}`;

  const iconContainerClass =
    'absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer';

  return (
    <div className="mx-auto mt-40 flex h-100 w-115 max-w-md flex-col items-center justify-center rounded  bg-boxdark shadow-lg dark:bg-boxdark">
      <h2 className="mb-4 text-xl font-bold text-gray">Set New Password</h2>
      <form className="mx-auto w-[80%]" onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <label className="mb-1 block" htmlFor="newPassword">
            New Password:
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={handlePasswordChange}
              className={inputClass}
            />
            <span
              className={iconContainerClass}
              onClick={handlePasswordVisibility}
            >
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </span>
          </div>
        </div>
        <div className="relative mb-4">
          <label className="mb-1 block" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`${inputClass} ${
                passwordMatch ? '' : 'border-danger'
              }`}
            />
            <span
              className={iconContainerClass}
              onClick={handlePasswordVisibility}
            >
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </span>
          </div>
          {!passwordMatch && (
            <p className="mt-2 text-danger">Passwords do not match.</p>
          )}
          {!passwordValid && (
            <p className="mt-2 text-danger">
              Password must be at least 8 characters long and contain a capital
              letter and a special character.
            </p>
          )}
        </div>
        <button type="submit" className={buttonClass}>
          Set Password
        </button>
      </form>
    </div>
  );
};

export default SetNewPassword;
