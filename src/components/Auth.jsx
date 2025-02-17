import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
        else {
          // Show success message for signup
          alert('Please check your email to confirm your account');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg'>
      <h2 className='text-2xl font-bold mb-6'>
        {isLogin ? 'Sign In' : 'Create Account'}
      </h2>
      {error && (
        <div className='mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg'>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full px-4 py-2 border rounded-lg'
          disabled={loading}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full px-4 py-2 border rounded-lg'
          disabled={loading}
          required
          minLength={6}
        />
        <button
          type='submit'
          className={`w-full px-4 py-2 bg-rose-600 text-white rounded-lg ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-rose-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <button
        onClick={() => {
          setIsLogin(!isLogin);
          setError(null);
        }}
        className='mt-4 text-rose-600'
        disabled={loading}
      >
        {isLogin ? 'Need an account? Sign up' : 'Have an account? Sign in'}
      </button>
    </div>
  );
}
