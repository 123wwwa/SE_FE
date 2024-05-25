import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password1 !== password2) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:8080/auth/signup', {
        userId,
        password1,
        password2,
      });

      // 회원가입 성공 메시지
      setSuccess('Signup successful! Redirecting to login...');
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err: any) {
      setError('Signup failed. Please try again.');
      setSuccess('');
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-semibold mb-4 text-center">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="userId" className="mb-2 text-gray-600">User ID</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password1" className="mb-2 text-gray-600">Password</label>
            <input
              type="password"
              id="password1"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
              className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password2" className="mb-2 text-gray-600">Confirm Password</label>
            <input
              type="password"
              id="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
