import React, { useState } from 'react';
import axiosInstance from '../../axios-instance';
import { useNavigate } from 'react-router-dom';

const OtpModal = ({ isVisible, onClose, onSubmit, otpEmail }) => {
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  if (!isVisible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/api/otp/verify/', { email: otpEmail, otp });
      if (res.status === 200) {
        onSubmit(); // Call the onSubmit prop to handle successful OTP verification
        navigate('/dept-admin/dashboard'); // Redirect to department admin dashboard
      } else {
        setErrorMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage('OTP verification failed. Please try again.');
    }
  };

  const handleResend = async () => {
    try {
      const res = await axiosInstance.post('/api/resend-otp-department/', { email: otpEmail });
      if (res.status === 200) {
        alert("OTP resent successfully.");
      } else {
        setErrorMessage("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      setErrorMessage("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-second p-6 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-lg font-bold text-main mb-4">Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-3 rounded-md w-full mb-4 bg-[#f6edff] text-xs font-semibold text-main placeholder:text-main"
            placeholder="Enter OTP"
            autoFocus
          />
          {errorMessage && (
            <div className="text-red-500 text-xs mb-4">{errorMessage}</div>
          )}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleResend}
              className="py-2 px-4 bg-[#f6edff] rounded-md text-main font-semibold"
            >
              Resend OTP
            </button>
            <div className="flex">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 py-2 px-4 bg-[#f6edff] text-main rounded-md font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-main text-white rounded-md font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpModal;