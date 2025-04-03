import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface RecaptchaVerificationProps {
  onVerify: () => void;
}

const RecaptchaVerification: React.FC<RecaptchaVerificationProps> = ({ onVerify }) => {
  const [error, setError] = useState<string | null>(null);

  const handleRecaptchaChange = (token: string | null) => {
    if (token) {
      onVerify();
    } else {
      setError('reCAPTCHA verification failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-300 p-4">
      <div className="bg-dark-200 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-light-100 mb-4">Welcome to Cortix AI</h1>
        <p className="text-light-300 mb-6">Please complete the verification to continue</p>
        
        <div className="flex justify-center mb-4">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''}
            onChange={handleRecaptchaChange}
            theme="dark"
          />
        </div>
        
        {error && (
          <div className="text-red-500 mt-2">{error}</div>
        )}
      </div>
    </div>
  );
};

export default RecaptchaVerification;