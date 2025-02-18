import React from 'react';
import { signOut } from '../lib/auth';
import { useAuth } from '../contexts/AuthContext.jsx';

const TestSignOut = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <button
      onClick={handleSignOut}
      className='bg-red-500 text-white p-2 rounded'
    >
      Test Sign Out
    </button>
  );
};

export default TestSignOut;
