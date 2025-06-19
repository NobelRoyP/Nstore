import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../Firebase';
import './Css/Login.css';

function Login() {
  const { user, login, signup } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLoginMode) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (user) {
    navigate('/');
    return null;
  }

  return (
    <div className="login-container">
      <h2>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          {isLoginMode ? 'Login' : 'Sign Up'}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsLoginMode(!isLoginMode);
            setError(null);
          }}
          className="auth-toggle-button"
        >
          {isLoginMode ? 'Switch to Sign Up' : 'Switch to Login'}
        </button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="google-signin-button"
        ><i className='fab fa-google fa-2x'></i>
          Sign in with Google
        </button>
        {error && <div className="auth-error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
